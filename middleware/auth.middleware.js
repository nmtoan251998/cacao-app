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
                return res.status(403).json({
                    success: false,
                    error: 'Unvalid token',
                    msg: 'Token is not valid'
                });
            } else {
                User.findById(payload.userId)
                    .then(user => {                        
                        // sign payload information into req.user
                        req.user = user;                        
                        next();
                    })
            }                
        })
    } else {
        return res.status(403).json({
            success: false,
            error: 'Unauthenticated',
            msg: 'Auth token is not provided'
        })
    }     
}