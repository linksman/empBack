const EmployeeDAL = require("../dal/employeeDAL");

// Create an employee
exports.createEmployee = async (req, res) => {
    try {
        const employee = await EmployeeDAL.createEmployee(req.body);
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ error: "Failed to create employee" });
    }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await EmployeeDAL.getAllEmployees();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch employees" });
    }
};

// Get an employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await EmployeeDAL.getEmployeeById(req.params.id);
        if (!employee) return res.status(404).json({ error: "Employee not found" });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch employee" });
    }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await EmployeeDAL.updateEmployee(req.params.id, req.body);
        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ error: "Failed to update employee" });
    }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
    try {
        await EmployeeDAL.deleteEmployee(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete employee" });
    }
};
