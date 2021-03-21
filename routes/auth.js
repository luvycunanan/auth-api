const router = require('express').Router();
const controllers = require('../controllers');
const auth = require('../middleware/auth');


router.post('/login', controllers.auth.login);
router.post('/verify', auth, controllers.auth.verify);

module.exports = router;