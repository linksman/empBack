const Employee = require("../models/Employee");

class EmployeeDAL {
    // Create a new employee
    static async createEmployee(data) {
        return await Employee.create(data);
    }

    // Get all employees
    static async getAllEmployees() {
        return await Employee.findAll();
    }

    // Get an employee by ID
    static async getEmployeeById(id) {
        return await Employee.findByPk(id);
    }

    // Update an employee
    static async updateEmployee(id, newData) {
        await Employee.update(newData, { where: { id } });
        return await Employee.findByPk(id);
    }

    // Delete an employee
    static async deleteEmployee(id) {
        return await Employee.destroy({ where: { id } });
    }
}

module.exports = EmployeeDAL;
