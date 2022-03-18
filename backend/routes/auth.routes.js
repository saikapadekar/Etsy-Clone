const express = require('express');
const { getToken, signUp, authenticatedUser,selectedUser } = require('../controller/auth');

const router = express.Router();

router.post('/login', getToken);
router.post('/signup', signUp);
router.post('/authenticatedUser', authenticatedUser);
router.get('/:id', selectedUser);

module.exports = router;
