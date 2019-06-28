const router = require('express').Router();

const {
    test,
    registUser,
    loginUser,
} = require('../../controller/auth.controller');

// @route   GET /auth/test
// @desc    Test route
// @access  Public
router.get('/test', test);

// @route   POST /auth/login
// @desc    Regist new user
// @access  Public
router.post('/register', registUser);

// @route   POST /auth/login
// @desc    Login with the given user's account information
// @access  Public
router.post('/login', loginUser);

module.exports = router;