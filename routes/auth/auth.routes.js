const router = require('express').Router();

const {
    test,
    registUser,
    loginUser,
} = require('../../controller/auth.controller');

const {
    validateRegisterInput,
    validateLoginInput,
} = require('../../validation/auth.validate');

// @route   GET /auth/test
// @desc    Test route
// @access  Public
router.get('/test', test);

// @route   POST /auth/register
// @desc    Regist new user
// @access  Public
router.post(
    '/register'
    , validateRegisterInput
    , registUser);

// @route   POST /auth/login
// @desc    Login with the given user's account information / Sign a JWT token and send it to FE
// @access  Public
router.post(
    '/login'
    , validateLoginInput
    , loginUser);

module.exports = router;