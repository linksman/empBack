const Employee = require('../models/employee');

let employees = [];
let currentId = 1;

exports.createEmployee = (req, res) => {
    const { name, role, department } = req.body;
    const newEmployee = new Employee(currentId++, name, role, department);
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
};

exports.getAllEmployees = (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    res.json({
        total: employees.length,
        page: parseInt(page),
        limit: parseInt(limit),
        data: employees.slice(startIndex, endIndex),
    });
};

exports.getEmployeeById = (req, res) => {
    const id = parseInt(req.params.id);
    const employee = employees.find(emp => emp.id === id);
    if (!employee) {
        return res.status(404).json({ error: 'Employee not found.' });
    }
    res.json(employee);
};

exports.updateEmployee = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, role, department } = req.body;
    const employee = employees.find(emp => emp.id === id);

    if (!employee) {
        return res.status(404).json({ error: 'Employee not found.' });
    }
    if (name) employee.name = name;
    if (role) employee.role = role;
    if (department) employee.department = department;

    res.json(employee);
};

exports.deleteEmployee = (req, res) => {
    const id = parseInt(req.params.id);
    const index = employees.findIndex(emp => emp.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Employee not found.' });
    }
    employees.splice(index, 1);
    res.status(204).send();
};

exports.bulkUpdateEmployees = (req, res) => {
    const updates = req.body;
    if (!Array.isArray(updates)) {
        return res.status(400).json({ error: 'Updates should be an array.' });
    }
    updates.forEach(update => {
        const { id, name, role, department } = update;
        const employee = employees.find(emp => emp.id === id);
        if (employee) {
            if (name) employee.name = name;
            if (role) employee.role = role;
            if (department) employee.department = department;
        }
    });
    res.status(200).json({ message: 'Employees updated successfully.' });
};

exports.bulkDeleteEmployees = (req, res) => {
    const { ids } = req.body;
    if (!Array.isArray(ids)) {
        return res.status(400).json({ error: 'Ids should be an array.' });
    }
    employees = employees.filter(emp => !ids.includes(emp.id));
    res.status(200).json({ message: 'Employees deleted successfully.' });
};
