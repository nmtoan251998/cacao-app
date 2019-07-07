const validator = require('validator');

module.exports.validateCreationInput = (req, res, next) => {
    const error = {};    

    const name = (req.body.name) ? req.body.name.toString().trim() : '';
    const type = (req.body.type) ? req.body.type.toString().trim() : '';
    let price = (req.body.price) ? req.body.price.toString().trim() : '0';
    const description = (req.body.description) ? req.body.description.toString().trim() : '';
    const featured = (req.body.featured) ? req.body.featured.toString().trim() : '';    

    const REGEX = {
        isNum: /\d+/
    }
    
    // Product name cannot be empty
    if(validator.isEmpty(name)) {
        error.emptyName = 'Name field cannot be empty';
    } else {        
        if(!validator.isLength(name, { min: 1, max: 100 })) {
            error.nameLength = 'Name field must be at least 1 and below 100 characters';
        }
    }    

    // Product type cannot be empty
    if(validator.isEmpty(type)) {
        error.emptyType = 'Type field cannot be empty';
    } else {
        // Product type is currently drink and food
        if(type !== 'drink' && type !== 'food') {
            error.invalidType = 'Type field is either drink or food'
        }
    }  

    // Product feature cannot be empty
    if(validator.isEmpty(featured)) {
        error.emptyFeature = 'Feature field cannot be empty';
    } else {
        if(featured !== 'true' && featured !== 'false') {
            error.featureFormat = 'Feature field can only be true or false';
        }
    }

    // Product price cannot be empty
    if(validator.isEmpty(price)) {
        error.emptyPrice = 'Price field cannot be empty';
    } else {        
        REGEX.priceIsNumber = price === price.match(REGEX.isNum)[0];        
        if(REGEX.priceIsNumber === false) {            
            error.priceFormat = 'Price field must be a number';
        }

        if(!validator.isInt(price, { min: 3 })) {            
            error.priceValue = 'Price field must be at least 3';    
        }   
    }

    // If description exist, its length must be between 30 and 150 characters
    if(description) {
        if(!validator.isLength(description, { max: 150 })) {
            error.descLength = 'Description field must be between 30 and 150 characters';
        }
    }

    if(Object.keys(error).length > 0) {
        return res.status(400).json({ 
            success: false,
            error 
        });
    }

    next();
}

module.exports.validateModificationInput = (req, res, next) => {
    const error = {};    

    const name = (req.body.name) ? req.body.name.toString().trim() : '';
    const type = (req.body.type) ? req.body.type.toString().trim() : '';
    let price = (req.body.price) ? req.body.price.toString().trim() : '0';
    const description = (req.body.description) ? req.body.description.toString().trim() : '';
    const featured = (req.body.featured) ? req.body.featured.toString().trim() : '';    

    const REGEX = {
        isNum: /\d+/
    }
    
    // Product name cannot be empty
    if(validator.isEmpty(name)) {
        error.emptyName = 'Name field cannot be empty';
    } else {        
        if(!validator.isLength(name, { min: 1, max: 100 })) {
            error.nameLength = 'Name field must be at least 1 and below 100 characters';
        }
    }    

    // Product type cannot be empty
    if(validator.isEmpty(type)) {
        error.emptyType = 'Type field cannot be empty';
    } else {
        // Product type is currently drink and food
        if(type !== 'drink' && type !== 'food') {
            error.invalidType = 'Type field is either drink or food'
        }
    }  

    // Product feature cannot be empty
    if(validator.isEmpty(featured)) {
        error.emptyFeature = 'Feature field cannot be empty';
    } else {
        if(featured !== 'true' && featured !== 'false') {
            error.featureFormat = 'Feature field can only be true or false';
        }
    }

    // Product price cannot be empty
    if(validator.isEmpty(price)) {
        error.emptyPrice = 'Price field cannot be empty';
    } else {        
        REGEX.priceIsNumber = price === price.match(REGEX.isNum)[0];        
        if(REGEX.priceIsNumber === false) {            
            error.priceFormat = 'Price field must be a number';
        }

        if(!validator.isInt(price, { min: 3 })) {            
            error.priceValue = 'Price field must be at least 3';    
        }   
    }

    // If description exist, its length must be between 30 and 150 characters
    if(description) {
        if(!validator.isLength(description, { max: 150 })) {
            error.descLength = 'Description field must be between 30 and 150 characters';
        }
    }

    if(Object.keys(error).length > 0) {
        return res.status(400).json({ 
            success: false,
            error 
        });
    }

    next();
}