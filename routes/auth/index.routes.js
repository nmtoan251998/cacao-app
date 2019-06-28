const router = require('express').Router();

const controller = require('../../controller/auth.controller');

router.get('/test', controller.test);
// router.get('/login');
// router.post('/login');
// router.get('/register');
// router.post('/register');

module.exports = router;