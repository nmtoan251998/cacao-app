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
        newProduct.type = req.body.type.trim();
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