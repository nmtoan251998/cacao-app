const router = require('express').Router();

const authRoute = require('./auth/index.js');
const usersRoute = require('./api/users');
const productsRoute = require('./api/products');

router.use('/auth', authRoute);

router.use('/api/users', usersRoute);
router.use('/api/products', productsRoute);

module.exports = router;