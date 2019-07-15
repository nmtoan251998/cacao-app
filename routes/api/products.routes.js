const router = require('express').Router();

const upload = require('../../config/multer');

const { 
    test,
    createProduct,
    allProducts,
    modifyById,
    delById,
    getById,
    sortProductByType,
    searchProductByName,
    sortProductByPriceRange,
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

// @route   GET /api/products/:id
// @desc    GET product by id
// @access  Public
router.get(
    '/:id'
    , getById);

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

// @route   GET /api/products/action/sort?type=&quantity=
// @desc    Sort products by product type
// @access  Public
router.get(
    '/action/sort?'
    , sortProductByType);

// @route   GET /api/products/action/search?name
// @desc    Search products by product name
// @access  Public
router.get(
    '/action/search?'
    , searchProductByName);



module.exports = router;