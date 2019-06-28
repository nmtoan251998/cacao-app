const router = require('express').Router();

const {
    test,
    user,
    allUsers
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
router.get('/all', allUsers);

module.exports = router;