const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/users.model');

const {
    validateRegisterInput
} = require('../validation/auth.validate');

module.exports.test = (req, res) => {
    res.send('Test auth route');
}

module.exports.registUser = (req, res) => {
    const error = validateRegisterInput(req.body);        

    if(req.body.password.trim() !== req.body.password2.trim()) {
        error.passwordMustMatch = 'Two password must match';
        return res.status(400).json(error);
    }

    User.findOne({ accountname: req.body.accountname.trim() })
        .then(user => {
            if(user) {
                error.accountAxist = 'This account name already axist';
                return res.status(400).json(error);
            }

            // Encode password with bcrypt
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password.trim(), salt, (err, hash) => {
                    // Store hash in your password DB.
                    const newUser = new User({
                        accountname: req.body.accountname.trim(),
                        username: req.body.username.trim(),
                        password: hash,
                    })
                    
                    newUser.save()
                        .then(newUser => {
                            res
                                .status(200)
                                .json({ success: true, msg: `Create user ${newUser.username}`})
                            
                            console.log(newUser);
                        })
                        .catch(err => {
                            error.failToRegister = 'Fail to register new user';
                            res.status(400).json(error);
                        })
                });
            });
        })
}

module.exports.loginUser = (req, res) => {
    const userLogin = req.body;
}