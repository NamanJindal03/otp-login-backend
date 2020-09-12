const express = require('express');
const router = express.Router();

router.use('/user', require('./user_auth'))
module.exports = router;