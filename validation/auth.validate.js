const validator = require('validator');

module.exports.validateRegisterInput = (data) => {
    const username = data.username.trim();   
    const accountname = data.accountname.trim();
    const password = data.password.trim(); 
    const password2 = data.password2.trim();

    const error = {};

    if(validator.isEmpty(username)) {
        // username cannot be empty
        error.emptyUsername = 'User name field cannot be empty';
    } else if(!validator.isLength(username, { min: 2, max: 30 })) {
        // username must be between min and max characters 
        error.usernameLength = 'username must be at least 6 character and below 30 characters';
    }

    if(validator.isEmpty(accountname)) {
        // accountname cannot be empty
        error.emptyAccountname = 'Account name field cannot be empty';
    } else if(!validator.isLength(accountname, { min: 4, max: 10 })) {
        // accountname must be between min and max characters 
        error.accountnameLength = 'Accountname must be at least 4 character and below 10 characters';
    }

    if(validator.isEmpty(password)) {
        // password cannot be empty
        error.emptyPassword = 'Password field cannot be empty';
    } else if(!validator.isLength(password, { min: 4, max: 10 })) {
        // password must be between min and max characters 
        error.passwordLength = 'Password must be at least 4 character and below 10 characters';
    }

    // password2 cannot be empty
    if(validator.isEmpty(password2) || password2 !== password) {
        error.passwordNotMatch = 'Two passwords must match';
    }

    return error;
}