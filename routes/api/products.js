const router = require('express').Router();

const controller = require('../../controller/products.js');

router.get('/text', controller.test);

module.exports = router;