const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Create Employee
router.post('/', async (req, res) => {
  try {
    const { name, department, salary } = req.body;
    const newEmployee = new Employee({ name, department, salary });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All Employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Employee
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, salary } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id, 
      { name, department, salary }, 
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Employee
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;