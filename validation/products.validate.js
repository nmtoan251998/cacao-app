const validator = require('validator');

module.exports.validateCreationInput = (req, res, next) => {
    const error = {};

    const name = (req.body.name) ? req.body.name.toString().trim() : '';
    const type = (req.body.type) ? req.body.type.toString().trim() : '';
    const price = (req.body.price) ? req.body.price.toString().trim() : '';
    const description = (req.body.description) ? req.body.description.toString().trim() : '';
    const image = (req.body.image) ? req.body.image.toString().trim() : '';

    // Product name cannot be empty
    if(validator.isEmpty(name)) {
        error.emptyName = 'Name field cannot be empty';
    }

    // Product type cannot be empty
    if(validator.isEmpty(type)) {
        error.emptyType = 'Type field cannot be empty';
    }

    // check Product type if it exists
    if(type) {
        // Product type is currently drink and food
        if(type !== 'drink' && type !== 'food') {
            error.invalidType = 'Type field is either drink or food'
        }
    }

    // Product price cannot be empty
    if(validator.isEmpty(price)) {
        error.emptyPrice = 'Price field cannot be empty';
    }

    // Price of the product is minium 3 characters length
    if(!validator.isLength(price, { min: 3 })) {
        error.priceLength = 'Price is at least 3 characters';
    }

    // If description exist, its length must be between 30 and 150 characters
    if(description) {
        if(!validator.isLength(description, { min: 30, max: 150 })) {
            error.descLength = 'Description field must be between 30 and 150 characters';
        }
    }

    if(Object.keys(error).length > 0) {
        return res.status(400).json(error);
    }

    next();
}

module.exports.validateModificationInput = (req, res, next) => {
    const error = {};

    console.log()

    const name = (req.body.name) ? req.body.name.toString().trim() : '';
    const type = (req.body.type) ? req.body.type.toString().trim() : '';
    const price = (req.body.price) ? req.body.price.toString().trim() : '';
    const description = (req.body.description) ? req.body.description.toString().trim() : '';    

    // Product name cannot be empty
    if(validator.isEmpty(name)) {
        error.emptyName = 'Name field cannot be empty';
    }

    // Product type cannot be empty
    if(validator.isEmpty(type)) {
        error.emptyType = 'Type field cannot be empty';
    }

    // check Product type if it exists
    if(type) {
        // Product type is currently drink and food
        if(type !== 'drink' && type !== 'food') {
            error.invalidType = 'Type field is either drink or food'
        }
    }

    // Product price cannot be empty
    if(validator.isEmpty(price)) {
        error.emptyPrice = 'Price field cannot be empty';
    }

    // Price of the product is minium 3 characters length
    if(!validator.isLength(price, { min: 3 })) {
        error.priceLength = 'Price is at least 3 characters';
    }

    // If description exist, its length must be between 30 and 150 characters
    if(description) {
        if(!validator.isLength(description, { min: 30, max: 150 })) {
            error.descLength = 'Description field must be between 30 and 150 characters';
        }
    }

    if(Object.keys(error).length > 0) {
        return res.status(400).json({ error });
    }

    next();
}