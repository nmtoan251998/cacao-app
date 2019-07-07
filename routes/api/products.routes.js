const router = require('express').Router();

const upload = require('../../config/multer');

const { 
    test,
    createProduct,
    allProducts,
    modifyById,
    delById
} = require('../../controller/products.controller');

const {    
    checkToken,    
} = require('../../middleware/products.middleware');

const {    
    validateCreationInput,
    validateModificationInput,
} = require('../../validation/products.validate');

// @route   GET /api/products/test
// @desc    Test route
// @access  Public
// router.get('/test', test);

// @route   POST /api/products
// @desc    Mock api to create new product
// @access  Private
router.post(
    ''        
    , checkToken
    , upload.single('image')
    , validateCreationInput    
    , createProduct);

// @route   GET /api/products/all
// @desc    Get all currents products
// @access  Public
router.get('/all', allProducts);

// @route   PATCH /api/products/:id
// @desc    Modify product by id
// @access  Private
router.patch(
    '/:id'    
    , checkToken    
    , upload.single('image')
    , validateModificationInput    
    , modifyById);

// @route   DELETE /api/products/:id
// @desc    Delete product by id
// @access  Private
router.delete(
    '/:id'
    , checkToken
    , delById);

module.exports = router;