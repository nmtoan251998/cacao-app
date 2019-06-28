const router = require('express').Router();

const controller = require('../../controller/products.controller');

router.get('/text', controller.test);

module.exports = router;