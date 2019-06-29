const router = require('express').Router();

const uploads = require('../../config/multer');

const { 
    test,
    createProduct
} = require('../../controller/products.controller');

const {    
    checkToken,
    protectedRoute,    
} = require('../../middleware/auth.middleware');

// @route   GET /api/products/test
// @desc    Test route
// @access  Public
router.get('/text', test);

// @route   POST /api/products
// @desc    Mock api to create new product
// @access  Public
router.post('', createProduct);

module.exports = router;