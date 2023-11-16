const express = require('express');
const authController = require('../controllers/authControllers');
const { registerValidator, loginValidator } = require('../validators/authValidator');
const router = express.Router();

//register route
router.post('/register', registerValidator, authController.register);
//login route
router.post('/login', loginValidator, authController.login);


module.exports = router;