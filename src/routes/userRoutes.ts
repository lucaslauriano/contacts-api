const express = require('express');
const {
  registerUser,
  loginUser,
  currentUser,
} = require('../controllers/userController');
const userValidateToken = require('../middleware/validateTokenHandler');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', userValidateToken, currentUser);

module.exports = router;
export {};
