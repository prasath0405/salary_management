import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EmployeeSalaryManagement.css';

function EmployeeSalaryManagement() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    department: '',
    salary: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Ensure your backend server URL is correct
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setError('Failed to fetch employees');
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Create Operation
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    
    // Input validation
    if (!newEmployee.name || !newEmployee.department || !newEmployee.salary) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/employees', {
        name: newEmployee.name,
        department: newEmployee.department,
        salary: parseFloat(newEmployee.salary)
      });

      // Add new employee to state
      setEmployees([...employees, response.data]);
      
      // Reset form
      setNewEmployee({ name: '', department: '', salary: '' });
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Failed to add employee');
    }
  };

  // Update Operation
  const handleEditEmployee = (employee) => {
    setEditingEmployee({...employee});
  };

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!editingEmployee.name || !editingEmployee.department || !editingEmployee.salary) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/employees/${editingEmployee._id}`, {
        name: editingEmployee.name,
        department: editingEmployee.department,
        salary: parseFloat(editingEmployee.salary)
      });

      // Update employees in state
      setEmployees(employees.map(emp => 
        emp._id === editingEmployee._id ? response.data : emp
      ));

      // Reset editing state
      setEditingEmployee(null);
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee');
    }
  };

  // Delete Operation
  const handleDeleteEmployee = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/employees/${id}`);
        
        // Remove employee from state
        setEmployees(employees.filter(emp => emp._id !== id));
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Failed to delete employee');
      }
    }
  };

  // Input change handlers
  const handleNewEmployeeChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditEmployeeChange = (e) => {
    const { name, value } = e.target;
    setEditingEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Render loading state
  if (loading) {
    return <div>Loading employees...</div>;
  }

  // Render error state
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="employee-salary-management">
      <h2>Employee Salary Management</h2>
      
      {/* Add New Employee Form */}
      <form onSubmit={handleAddEmployee} className="add-employee-form">
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={newEmployee.name}
          onChange={handleNewEmployeeChange}
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={newEmployee.department}
          onChange={handleNewEmployeeChange}
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={newEmployee.salary}
          onChange={handleNewEmployeeChange}
        />
        <button type="submit">Add Employee</button>
      </form>

      {/* Employee Table */}
      <table className="salary-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee._id}>
              <td>{index + 1}</td>
              {editingEmployee && editingEmployee._id === employee._id ? (
                // Edit mode
                <>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editingEmployee.name}
                      onChange={handleEditEmployeeChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="department"
                      value={editingEmployee.department}
                      onChange={handleEditEmployeeChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="salary"
                      value={editingEmployee.salary}
                      onChange={handleEditEmployeeChange}
                    />
                  </td>
                  <td>
                    <button onClick={handleUpdateEmployee}>Save</button>
                    <button onClick={() => setEditingEmployee(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                // View mode
                <>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>${employee.salary.toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleEditEmployee(employee)}>Edit</button>
                    <button onClick={() => handleDeleteEmployee(employee._id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeSalaryManagement;