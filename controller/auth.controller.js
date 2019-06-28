const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretOrKey = process.env.privateKey || 'privateprivateprivate';

const User = require('../model/users.model');

const {
    validateRegisterInput,
    validateLoginInput,
} = require('../validation/auth.validate');

const {
    generateJWTToken
} = require('../middleware/auth.middleware');

module.exports.test = (req, res) => {
    res.send('Test auth route');
}

module.exports.registUser = (req, res) => {
    const error = validateRegisterInput(req.body);

    if(Object.keys(error).length > 0) {
        return res.status(400).json(error);
    }

    User.findOne({ accountname: req.body.accountname.trim() })
        .then(user => {
            if(user) {
                error.accountAxist = 'This account name already axist';
                return res.status(400).json(error);
            }

            // Encode password with bcrypt before saving it to DB
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password.trim(), salt, (err, hash) => {
                    // Store hash in DB.
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
                        })
                        .catch(err => {
                            error.failToRegister = 'Fail to register new user';
                            res.status(400).json(error);
                        })
                });
            });
        })
}

module.exports.loginUser = (req, res, next) => {
    const error = validateLoginInput(req.body);

    const accountname = req.body.accountname.trim();
    const password = req.body.password.trim();

    if(Object.keys(error).length > 0) {
        return res.status(400).json(error);
    }

    // Find user with accountname
    User.findOne({ accountname })
        .then(user => {
            if(!user) {
                error.userNotFound = 'Wrong accountnamne or password';
                return res.status(404).json(error);
            }

            bcrypt.compare(password, user.password, (err, result) => {
                if(result === false) {
                    error.userNotFound = 'Wrong accountnamne or password';
                    return res.status(404).json(error);
                }

                const token = jwt.sign({ userId: user._id }
                    , secretOrKey
                    , { expiresIn: '24h' } // expires in 24 hours
                );

                res.status(200).json({ 
                    userId: user._id,
                    accountname: user.accountname,
                    username: user.username,
                    token: 'Bearer ' +token
                });

            })
        }) 
}