const jwt = require('jsonwebtoken');

const secretOrKey = process.env.privateKey;

const User = require('../model/users.model');

module.exports.checkToken = (req, res, next) => {    
    /* 
    \\  slice the Bearer token generate by JWT
    \\  token format: 
    \\  Bearer idfhoehfuihewfuwiehfuiewhfuiwehuiewhuiweh
    \\  'Bearer'.length + ' '.length === 7 
    */
    
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if(token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }    

    if(token) {
        jwt.verify(token, secretOrKey, (err, payload) => {
            if(err) {                
                return res.status(400).json({
                    success: false,
                    msg: 'Token is not valid'
                });
            } else {
                User.findById(payload.userId)
                    .then(user => {
                        console.log(user)
                        // sign payload information into req.user
                        req.user = user;
                        console.log(req.user);
                        next();
                    })
            }                
        })
    } else {
        return res.status(400).json({
            success: false,
            msg: 'Auth token is no provided'
        })
    }     
}

module.exports.protectRoute = (req, res, next) => {
    // if user does not exist, but  token was not sent with request
    // return 500 status code, send error to user
    if(!req.user) {
        return res.status(500).json({ msg: 'Unauthenticated'});
    }

    // if user exists the token was sent with the request, go to next middleware
    next();
}