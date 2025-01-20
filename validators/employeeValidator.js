const { body } = require('express-validator');

// Validation rules for creating an employee
const validateEmployeeCreation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required.')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long.'),
    body('role')
        .trim()
        .notEmpty()
        .withMessage('Role is required.')
        .isLength({ min: 2 })
        .withMessage('Role must be at least 2 characters long.'),
    body('department')
        .trim()
        .notEmpty()
        .withMessage('Department is required.')
        .isLength({ min: 2 })
        .withMessage('Department must be at least 2 characters long.'),
];

// Validation rules for updating an employee
const validateEmployeeUpdate = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long.'),
    body('role')
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage('Role must be at least 2 characters long.'),
    body('department')
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage('Department must be at least 2 characters long.'),
];

module.exports = {
    validateEmployeeCreation,
    validateEmployeeUpdate,
};
