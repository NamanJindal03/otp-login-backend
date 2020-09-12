const express = require('express');
const router = express.Router();
const {register ,  login} = require('../../../controllers/api/v1/user_auth_controller');


router.post('/register', register);
router.post('/login', login);


module.exports = router;