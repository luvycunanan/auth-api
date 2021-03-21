const router = require('express').Router();
const { users } = require('../controllers');
const auth = require('../middleware/auth');

router.post('/', users.create)
router.post('/profile', auth, users.profile)


module.exports = router;