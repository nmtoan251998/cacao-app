const router = require('express').Router();

const authRoute = require('./auth/index.routes');
const usersRoute = require('./api/users.routes');
const productsRoute = require('./api/products.routes');

router.use('/auth', authRoute);

router.use('/api/users', usersRoute);
router.use('/api/products', productsRoute);

module.exports = router;