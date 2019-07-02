const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretOrKey = process.env.privateKey || 'privateprivateprivate';

const User = require('../model/users.model');

module.exports.test = (req, res) => {
    res.send('Test auth route');
}

module.exports.registUser = (req, res) => {
    const error = {};

    User.findOne({ accountname: req.body.accountname.trim() })
        .then(user => {
            if(user) {
                error.accountExist = 'This account name already exist';
                return res.status(409).json({
                    success: false,
                    error 
                });
            }

            // Encode password with bcrypt before saving it to DB
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    // Store hash in DB.
                    const newUser = new User({
                        accountname: req.body.accountname,
                        username: req.body.username,
                        password: hash,
                    })
                    
                    newUser.save()
                        .then(newUser => {
                            res.status(200).json({ 
                                success: true, 
                                newUser
                            });
                        })
                        .catch(err => {
                            error.failToRegister = 'Fail to register new user';
                            res.status(400).json({
                                success: false,
                                error 
                            });
                        })
                });
            });
        })
}

module.exports.loginUser = (req, res, next) => {
    const error = {};

    const accountname = req.body.accountname.trim();
    const password = req.body.password.trim();

    // Find user with accountname
    User.findOne({ accountname })
        .then(user => {
            if(!user) {
                error.wrongAuth = 'Wrong accountnamne or password';
                return res.status(404).json({
                    success: false,
                    error 
                });
            }

            bcrypt.compare(password, user.password, (err, result) => {
                if(result === false) {
                    error.wrongAuth = 'Wrong accountnamne or password';
                    return res.status(404).json({
                        success: false,
                        error 
                    });
                }

                const token = jwt.sign({ userId: user._id }
                    , secretOrKey
                    , { expiresIn: '24h' } // expires in 24 hours
                );

                res.status(200).json({ 
                    success: true,                    
                    userId: user._id,
                    accountname: user.accountname,
                    username: user.username,
                    token: 'Bearer ' +token
                });

            })
        }) 
}