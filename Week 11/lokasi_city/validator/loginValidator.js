const { check } = require('express-validator');

const loginValidator = [
    check('email_username')
    .not().isEmpty()
    .withMessage('email is required'),
    check('password', 'password is required')
    .not().isEmpty()
];

module.exports = {
    loginValidator
}