const Product = require('../model/products.model');

module.exports.test = (req, res) => {
    res.send('Test product API');
}

module.exports.createProduct = (req, res) => {
    const error = {};
    const newProduct = new Product({
        name: req.body.name.trim(),
        type: req.body.type.trim(),
        price: req.body.price.trim(),
        featured: req.body.featured.toString().trim() === 'true' ? true : false,
    })    

    // if price field exists, then assign it to newProduct
    if(req.body.price) {
        newProduct.price = req.body.price.trim();
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
                error             
            })            
        })
        .catch(err => {
            error.createNewProduct = 'Failed to create new product';
            res.status(400).json({
                success: false,
                error
            })
        })
}

module.exports.allProducts = (req, res) => {
    const error = {};

    Product.find()
        .then(products => {
            if(!products.length) {                
                error.noProducts = 'No products found';
                return res.status(404).json({
                    success: false,
                    error
                })
            }                        

            res.status(200).json(products);
        })
        .catch(err => {
            error.noProducts = 'No products found';
            res.status(404).json({
                success: false,
                error
            })
        })
}

module.exports.delById = (req, res) => {
    const error = {};
    const id = req.params.id.toString().trim();

    Product.findByIdAndRemove(id)
        .then(product => {
            if(!product) {
                error.noProduct = 'No product found';
                return res.status(404).json({
                    success: false,
                    error
                })
            }

            res.status(200).json({
                success: true,
                error
            });
        })
        .catch(err => {
            error.deleteProduct = 'Failed to delete product';
            res.status(400).json({
                success: false,
                error
            })
        })
}

module.exports.modifyById = (req, res) => {
    const error = {};
    const id = req.params.id.toString().trim();    

    Product.findById(id)
        .then(product => {
            if(!product) {
                error.noProduct = 'No product found';
                return res.status(404).json({
                    success: false,
                    error
                })
            }

            const modifiedProduct = {
                name: req.body.name.trim(),
                type: req.body.type.trim(),
                price: req.body.price.trim(),
                featured: req.body.featured.toString().trim() === 'true' ? true : false
            }

            // if price field exists, then assign it to modifiedProduct
            if(req.body.price) {
                modifiedProduct.price = req.body.price.trim();
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
                .then(newProduct => {
                    res.status(200).json({
                        success: true,
                        modifiedProduct
                    })
                })
                .catch(err => { 
                    error.modifyProduct = 'Failed to modify product';
                    res.status(400).json({
                        success: false,
                        error
                    })
                })            
        })
        .catch(err => {    
            error.modifyProduct = 'Failed to modify product';
            res.status(400).json({
                success: false,
                error
            })
        })
}