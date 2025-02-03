const express = require('express');
const employeeController = require('../controllers/employeeController');
const { validateEmployeeCreation, validateEmployeeUpdate } = require('../validators/employeeValidator');
const { validationResult } = require('express-validator');
const router = express.Router();

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Define routes
router.post("/", employeeController.createEmployee);
router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;


module.exports = router;
