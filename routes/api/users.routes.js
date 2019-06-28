const router = require('express').Router();

const {
    test,
    user,
    allUsers,
    userById,
    modifyUserById
} = require('../../controller/users.controller');

const {    
    checkToken
} = require('../../middleware/auth.middleware');

// @route   GET /api/users/test
// @desc    Test route
// @access  Public
router.get('/test', test);

// @route   GET /api/users
// @desc    Get current user
// @access  Private
router.get(
    ''
    , checkToken 
    , user);

// @route   GET /api/users/all
// @desc    Get all users
// @access  Private
router.get(
    '/all'    
    , allUsers);

// @route   GET /api/users/:id
// @desc    Get user by id
// @access  Public
router.get(
    '/:id'  
    , checkToken  
    , userById);

// @route   PATCH /api/users/:id
// @desc    Modify user by id
// @access  Private
router.patch(
    '/:id'
    , checkToken
    , modifyUserById);

module.exports = router;