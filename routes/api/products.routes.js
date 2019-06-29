const router = require('express').Router();

const uploads = require('../../config/multer');

const { 
    test,
    createProduct,
    allProducts
} = require('../../controller/products.controller');

const {    
    checkToken,
    protectedRoute,    
} = require('../../middleware/auth.middleware');

const {    
    validateCreateProduct    
} = require('../../validation/products.validate');

// @route   GET /api/products/test
// @desc    Test route
// @access  Public
router.get('/text', test);

// @route   POST /api/products
// @desc    Mock api to create new product
// @access  Public
router.post(
    ''
    , validateCreateProduct
    , createProduct);

// @route   POST /api/products/all
// @desc    Get all currents products
// @access  Public
router.get('/all', allProducts);

module.exports = router;