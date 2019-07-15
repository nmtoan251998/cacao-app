const httpStatus = require('http-status');

const Product = require('../model/products.model');

// module.exports.test = (req, res) => {
//     res.send('Test product API');
// }
module.exports.allProducts = (req, res) => {
    const errors = {};
    Product.find()
        .then(products => {
            if(!products.length) {
                errors.noProducts = 'No products found';
                return res.status(404).json({
                    success: false,
                    errors
                })
            }                        

            res.status(200).json({
                success: true, 
                products
            });
        })
        .catch(err => {
            errors.noProducts = 'No products found';
            res.status(404).json({
                success: false,
                errors
            })
        })
};

module.exports.createProduct = (req, res) => {
    const errors = {};
    const newProduct = new Product({
        name: req.body.name.toString().trim(),
        type: req.body.type.toString().trim(),
        featured: req.body.featured.toString().trim() === 'true' ? true : false,
    })    

    // if price field exists, then assign it to newProduct
    if(req.body.price) {
        newProduct.price = parseInt(req.body.price);
    }

    // if description field exists, then assign it to newProduct
    if(req.body.description) {
        newProduct.description = req.body.description.trim();
    }    

    // if image field exists, then assign it to newProduct
    if(req.file) {
        newProduct.image = req.file.filename;            
    }

    newProduct.save()
        .then(product => {                  
            res.status(200).json({
                success: true,
                newProduct        
            })            
        })
        .catch(err => {
            errors.createProduct = 'Failed to create new product';
            res.status(400).json({
                success: false,
                errors
            })
        })
};

module.exports.getById = (req, res) => {
    const errors = {};
    const id = req.params.id.toString().trim();        
    
    Product.findById(id)
        .then(product => {
            if(!product) {
                errors.noProduct = 'No product found';
                return res.status(httpStatus.NOT_FOUND).json({ success: false, errors });
            };

            res.status(httpStatus.OK).json({ success: true, product });
        })
        .catch(err => {
            errors.queryProductById = 'Error querying product by id';
            res.status(httpStatus.BAD_REQUEST).json({ success: false, errors });
        });
};

module.exports.delById = (req, res) => {
    const errors = {};
    const id = req.params.id.toString().trim();

    Product.findByIdAndRemove(id)
        .then(product => {
            if(!product) {
                errors.noProduct = 'No product found';
                return res.status(404).json({
                    success: false,
                    errors
                })
            }

            res.status(200).json({
                success: true,
                deletedProduct: product
            });
        })
        .catch(err => {
            errors.deleteProduct = 'Failed to delete product';
            res.status(400).json({
                success: false,
                errors
            })
        })
};

module.exports.modifyById = (req, res) => {
    const errors = {};
    const id = req.params.id.toString().trim();    

    Product.findById(id)
        .then(product => {
            if(!product) {
                errors.noProduct = 'No product found';
                return res.status(404).json({
                    success: false,
                    errors
                })
            }

            const modifiedProduct = {
                name: req.body.name.trim(),
                type: req.body.type.trim(),
                featured: req.body.featured.toString().trim() === 'true' ? true : false
            }

            // if price field exists, then assign it to modifiedProduct
            if(req.body.price) {
                modifiedProduct.price = parseInt(req.body.price);
            }

            // if description field exists, then assign it to modifiedProduct
            if(req.body.description) {
                modifiedProduct.description = req.body.description.trim();
            }

            // if image field exists, then assign it to newProduct
            if(req.file) {
                modifiedProduct.image = req.file.filename;            
            }

            Product.findByIdAndUpdate(id, modifiedProduct)
                .then(updatedProduct => {
                    res.status(200).json( {
                        success: true,
                        updatedProduct
                    })
                })
                .catch(err => { 
                    errors.modifyProduct = 'Failed to modify product';
                    res.status(400).json({
                        success: false,
                        errors
                    })
                })            
        })
        .catch(err => {    
            errors.modifyProduct = 'Failed to modify product';
            res.status(400).json({
                success: false,
                errors
            })
        })
};

module.exports.sortProductByType = (req, res) => {
    const errors = {};
    const type = (req.query.type) ? req.query.type : '';
    const quantity = (req.query.quantity) ? parseInt(req.query.quantity) : 5;    

    // if !type or type !== drink,food
    if(!type || (type !== 'drink' && type !== 'food')) {
        errors.wrongQuery = 'Wrong query format';
        return res.status(httpStatus.BAD_REQUEST).json({ success: false, errors });
    }

    Product.find({})
        .where('type').equals(type)
        .limit(quantity)
        .exec((err, products) => {
            if(err) {                
                errors.queryProductByType = 'errors querying products by type';
                return res.status(httpStatus.BAD_REQUEST).json({ success: false, errors });
            };            

            if(!products) {
                errors.noProducts = 'No products found with this this type';
                return res.status(httpStatus.NOT_FOUND).json({ success: false, errors });
            };

            if(products.length < quantity) {
                errors.notEnough = 'There is not enought products in database';
                return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({ 
                        success: false, 
                        errors, 
                        products 
                    });
            };

            res.status(httpStatus.OK).json({ success: true, products });
        });        
};

module.exports.sortProductByPriceRange = (req, res) => {
    const errors = {};
    const minPrice = (req.query['price-min']) ? parseInt(req.query['price-min']) : 0;
    const maxPrice = (req.query['price-max']) ? parseInt(req.query['price-max']) : 0;
    

    // if max price is falsy, return error
    if(!maxPrice) {
        errors.invalidMaxPrice = 'Max price must be greater than 0';
        return res.status(httpStatus.BAD_REQUEST).json({ errors });
    };

    Product.find({ price: { $gte: maxPrice, $lte: minPrice }})        
        .exec((err, products) => {
            if(err) {                
                errors.queryProductPriceRange = 'errors querying products by price';
                return res.status(httpStatus.BAD_REQUEST).json({ success: false, errors });
            };            

            if(!products) {
                errors.noProducts = 'No products found between this price range';
                return res.status(httpStatus.NOT_FOUND).json({ success: false, errors });
            };

            res.status(httpStatus.OK).json({ success: true, products });
        });        
};

module.exports.searchProductByName = (req, res) => {
    const errors = {};
    const name = (req.query.name) ? req.query.name.toString() : '';           

    if(!name) {
        errors.inputProductname = 'Wrong product name';
        return res.status(httpStatus.BAD_REQUEST).json({ errors });
    };

    Product.findOne({ name: name })
        .then(product => {
            if(!product) {
                errors.noProduct = 'No product found with the given name';
                return res.status(httpStatus.NOT_FOUND).json({ success: false, errors });
            };

            res.status(httpStatus.OK).json({ success: true, product });
        })
        .catch(err => {            
            errors.queryProduct = 'Error querying product by the given name';
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, errors });
        });
};