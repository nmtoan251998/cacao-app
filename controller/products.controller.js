const Product = require('../model/products.model');

module.exports.test = (req, res) => {
    res.send('Test product API');
}

module.exports.createProduct = (req, res) => {
    const newProduct = new Product({
        name: req.body.name.trim(),
        type: req.body.type.trim(),
        price: req.body.price.trim(),
    })

    // if price field exists, then assign it to newProduct
    if(req.body.price) {
        newProduct.price = req.body.price.trim();
    }

    // if description field exists, then assign it to newProduct
    if(req.body.description) {
        newProduct.description = req.body.description.trim();
    }

    newProduct.save()
        .then(product => {
            res.status(200).json({
                success: true,
                msg: 'Create new product'
            })
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                msg: 'Error create new product'
            })
        })
}

module.exports.allProducts = (req, res) => {
    Product.find()
        .then(products => {
            if(!products) {
                return res.status(404).json({
                    success: false,
                    msg: 'No products found'
                })
            }

            res.status(200).json(products);
        })
        .catch(err => {
            res.status(404).json({
                success: false,
                msg: 'No products found'
            })
        })
}

module.exports.delById = (req, res) => {
    const id = req.params.id.toString().trim();

    Product.findByIdAndRemove(id)
        .then(product => {
            if(!product) {
                return res.status(404).json({
                    success: false,
                    msg: 'No product found'
                })
            }

            res.status(200).json({
                success: true,
                msg: 'Delete product'
            });
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                msg: 'Cannot delete product'
            })
        })
}

module.exports.modifyById = (req, res) => {
    const id = req.params.id.toString().trim();    

    Product.findById(id)
        .then(product => {
            if(!product) {
                return res.status(404).json({
                    success: false,
                    msg: 'No product found'
                })
            }

            const modifiedProduct = {
                name: req.body.name.trim(),
                type: req.body.type.trim(),
                price: req.body.price.trim(),
            }

            // if price field exists, then assign it to modifiedProduct
            if(req.body.price) {
                modifiedProduct.price = req.body.price.trim();
            }

            // if description field exists, then assign it to modifiedProduct
            if(req.body.description) {
                modifiedProduct.description = req.body.description.trim();
            }

            Product.findByIdAndUpdate(id, modifiedProduct)
                .then(newProduct => {
                    res.status(200).json(modifiedProduct)
                })
                .catch(err => {
                    res.status(400).json({
                        success: false,
                        msg: 'Error modify product'
                    })
                })            
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                msg: 'Cannot delete product'
            })
        })
}