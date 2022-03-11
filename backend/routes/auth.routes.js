const express = require('express');
const { getToken, signUp } = require('../controller/auth');

const router = express.Router();

router.post('/login', getToken);
router.post('/signup', signUp);


module.exports = router;
