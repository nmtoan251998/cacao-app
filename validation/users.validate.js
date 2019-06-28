const validator = require('validator');

module.exports.validateModifyInput = (data) => {
    const username = data.username.trim();
    const password = data.password.trim(); 
    const password2 = data.password2.trim();

    const error = {};

    // username cannot be empty
    if(validator.isEmpty(username)) {
        error.emptyUsername = 'User name field cannot be empty';
    }
    
    // username must be between min and max characters 
    if(!validator.isLength(username, { min: 2, max: 30 })) {
        error.usernameLength = 'User name must be at least 6 character and below 30 characters';
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

    return error;
}