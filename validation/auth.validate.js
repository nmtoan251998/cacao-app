const validator = require('validator');

module.exports.validateRegisterInput = (req, res, next) => {
    const username = (req.body.username) ? req.body.username.toString().trim() : '';   
    const accountname = (req.body.accountname) ? req.body.accountname.toString().trim() : '';
    const password = (req.body.password) ? req.body.password.toString().trim() : '' 
    const password2 = (req.body.password2) ? req.body.password2.toString().trim() : '';

    const error = {};

    // username cannot be empty
    if(validator.isEmpty(username)) {
        error.emptyUsername = 'User name field cannot be empty';
    }
    
    // username must be between min and max characters 
    if(!validator.isLength(username, { min: 2, max: 30 })) {
        error.usernameLength = 'User name must be at least 6 character and below 30 characters';
    }

    // accountname cannot be empty
    if(validator.isEmpty(accountname)) {
        error.emptyAccountname = 'Account name field cannot be empty';
    }
    
    // accountname must be between min and max characters 
    if(!validator.isLength(accountname, { min: 4, max: 20 })) {
        error.accountnameLength = 'Account name must be at least 4 character and below 20 characters';
    }

    // password cannot be empty
    if(validator.isEmpty(password)) {
        error.emptyPassword = 'Password field cannot be empty';
    } 

    // password must be between min and max characters 
    if(!validator.isLength(password, { min: 4, max: 20 })) {
        error.passwordLength = 'Password must be at least 4 character and below 20 characters';
    }

    // password2 cannot be empty
    if(validator.isEmpty(password2) || password2 !== password) {
        error.passwordNotMatch = 'Two passwords must match';
    }

    if(Object.keys(error).length > 0) {
        return res.status(400).json(error);
    }

    next();
}

module.exports.validateLoginInput = (req, res, next) => {
    const accountname = (req.body.accountname) ? req.body.accountname.toString().trim() : '';
    const password = (req.body.password) ? req.body.password.toString().trim() : '' 

    const error = {};

    // accountname cannot be empty
    if(validator.isEmpty(accountname)) {
        error.emptyAccountname = 'Account name field cannot be empty';
    }

    // password cannot be empty
    if(validator.isEmpty(password)) {
        error.emptyPassword = 'Password field cannot be empty';
    } 

    if(Object.keys(error).length > 0) {
        return res.status(400).json({ error });
    }

    next();
}