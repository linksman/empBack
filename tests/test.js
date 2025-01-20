// Import required modules for testing
const request = require('supertest');
const express = require('express');
const employeeRoutes = require('../routes/employeeRoutes');

// Setup Express app for testing
const app = express();
app.use(express.json());
app.use('/employees', employeeRoutes);

// Test Suite for Employee CRUD API
describe('Employee CRUD API', () => {
    test('POST /employees - Create a new employee', async () => {
        const response = await request(app)
            .post('/employees')
            .send({ name: 'John Doe', role: 'Developer', department: 'Engineering' });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('John Doe');
    });

    test('GET /employees - Retrieve all employees', async () => {
        const response = await request(app).get('/employees');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('GET /employees/:id - Retrieve an employee by ID', async () => {
        const newEmployee = await request(app)
            .post('/employees')
            .send({ name: 'Jane Doe', role: 'Designer', department: 'Creative' });

        const response = await request(app).get(`/employees/${newEmployee.body.id}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Jane Doe');
    });

    test('PUT /employees/:id - Update an employee', async () => {
        const newEmployee = await request(app)
            .post('/employees')
            .send({ name: 'Jack Smith', role: 'Analyst', department: 'Finance' });

        const response = await request(app)
            .put(`/employees/${newEmployee.body.id}`)
            .send({ role: 'Senior Analyst' });

        expect(response.status).toBe(200);
        expect(response.body.role).toBe('Senior Analyst');
    });

    test('DELETE /employees/:id - Delete an employee', async () => {
        const newEmployee = await request(app)
            .post('/employees')
            .send({ name: 'Emma Stone', role: 'HR Manager', department: 'Human Resources' });

        const response = await request(app).delete(`/employees/${newEmployee.body.id}`);

        expect(response.status).toBe(204);
    });

    test('PUT /employees - Bulk update employees', async () => {
        const employees = [
            { name: 'Alice', role: 'Engineer', department: 'Tech' },
            { name: 'Bob', role: 'QA', department: 'Testing' }
        ];

        const created = await Promise.all(
            employees.map(emp => request(app).post('/employees').send(emp))
        );

        const updates = created.map(emp => ({ id: emp.body.id, role: 'Updated Role' }));

        const response = await request(app).put('/employees').send(updates);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Employees updated successfully.');
    });

    test('DELETE /employees - Bulk delete employees', async () => {
        const employees = [
            { name: 'Charlie', role: 'Intern', department: 'Tech' },
            { name: 'David', role: 'Manager', department: 'Finance' }
        ];

        const created = await Promise.all(
            employees.map(emp => request(app).post('/employees').send(emp))
        );

        const ids = created.map(emp => emp.body.id);

        const response = await request(app).delete('/employees').send({ ids });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Employees deleted successfully.');
    });
});
