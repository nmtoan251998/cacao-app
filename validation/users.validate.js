const validator = require('validator');

module.exports.validateModifyInput = (req, res, next) => {
    const username = (req.body.username) ? req.body.username.toString().trim() : '';   
    const password = (req.body.password) ? req.body.password.toString().trim() : '' 
    const password2 = (req.body.password2) ? req.body.password2.toString().trim() : '';

    const error = {};

    // username cannot be empty
    if(validator.isEmpty(username)) {
        error.emptyUsername = 'Username field cannot be empty';
    }
    
    // username must be between min and max characters 
    if(!validator.isLength(username, { min: 2 })) {
        error.usernameLength = 'Username field must be at least 2 character';
    }    

    // password cannot be empty
    if(validator.isEmpty(password)) {
        error.emptyPassword = 'Password field cannot be empty';
    } 

    // password must be between min and max characters 
    if(!validator.isLength(password, { min: 8, max: 20 })) {
        error.passwordLength = 'Password field must be at least 8 character and below 20 characters';
    }

    // password2 cannot be empty
    if(validator.isEmpty(password2) || password2 !== password) {
        error.passwordNotMatch = 'Two passwords field must match';
    }

    if(Object.keys(error).length > 0) {
        return res.status(400).json({
            success: false,
            error
        });
    }

    next();
}