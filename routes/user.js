const express = require('express');
const {handleUserLogin, handleUserSignUp} = require('../controllers/user.js');

const router = express.Router();

router.post('/', handleUserSignUp);
router.post('/login', handleUserLogin);

module.exports = router;