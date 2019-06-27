const router = require('express').Router();

const controller = require('../../controller/users.js');

router.get('/test', controller.test);

module.exports = router;