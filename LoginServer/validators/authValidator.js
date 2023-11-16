const { body } = require('express-validator');

const registerValidator = [
    body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    body('phone')
        .matches(/^[0-9]{10}$/)
        .withMessage('Phone number must contain only numbers and be 10 digits long.'),
    body('email').isEmail().withMessage('Invalid email address.'),
   
];

const loginValidator = [
    body('email').isEmail().withMessage('Invalid email or password.'),
    body('password').isLength({ min: 6 }).withMessage('Invalid email or password'),
];

module.exports = {
    registerValidator,
    loginValidator,
};
