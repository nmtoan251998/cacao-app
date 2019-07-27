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
                error.accountExist = 'This accountname already exist';
                return res.status(409).json({
                    success: false,
                    error 
                });
            }

            // Store new user in DB.
            const newUser = new User({
                accountname: req.body.accountname,
                username: req.body.username,
                password: req.body.password,
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
        })
}

module.exports.loginUser = (req, res, next) => {
    const error = {};

    const loginUser = {
        accountname: req.body.accountname.toString().trim(),
        password: req.body.password.toString().trim()
    };           

    // Find user with accountname
    User.findOne({ accountname: loginUser.accountname.toString() })
        .then(user => {            
            if(!user) {
                error.wrongAccount = 'Wrong accountname or password';                
                return res.status(404).json({
                    success: false,
                    error 
                });
            };            

            isPassMatched = user.comparePassword(loginUser.password, (err, isMatch) => {                
                if(isMatch === false) {
                    error.wrongAccount = 'Wrong accountname or password';                                        
                    return res.status(404).json({
                        success: false,
                        error 
                    });                    
                }

                const token = jwt.sign({ userId: user._id }
                    , secretOrKey
                    , { expiresIn: '24h' } // expires in 24 hours
                )
    
                res.status(200).json({ 
                    success: true,                    
                    userId: user._id,
                    accountname: user.accountname,
                    username: user.username,
                    token: 'Bearer ' +token
                });    
            });            

        }).catch(err => {
            error.wrongAccount = 'Wrong accountname or password';
            res.status(404).json({
                success: false,
                error 
            });
        })  
}