const router = require('express').Router();
const passport = require('passport');

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
// router.get('/test', test);

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

// @route   POST /auth/facebook
// @desc    Login user with facebook account
// @access  Public
router.get(
    '/facebook'
    , passport.authenticate('facebook')
);

router.get(
    '/facebook/callback'
    , passport.authenticate(
            'facebook'
            , { successRedirect: '/api/users', failureRedirect: 'auth/login' })
);

module.exports = router;