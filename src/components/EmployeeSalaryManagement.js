import React, { useState } from 'react';
import '../styles/EmployeeSalaryManagement.css';

function EmployeeSalaryManagement() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', department: 'IT', salary: 75000 },
    { id: 2, name: 'Jane Smith', department: 'HR', salary: 65000 },
    { id: 3, name: 'Mike Johnson', department: 'Finance', salary: 80000 }
  ]);

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    department: '',
    salary: ''
  });

  // Create Operation
  const handleAddEmployee = (e) => {
    e.preventDefault();
    
    // Validate input
    if (!newEmployee.name || !newEmployee.department || !newEmployee.salary) {
      alert('Please fill in all fields');
      return;
    }

    const employeeToAdd = {
      ...newEmployee,
      id: employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1,
      salary: parseFloat(newEmployee.salary)
    };

    setEmployees([...employees, employeeToAdd]);
    
    // Reset form
    setNewEmployee({ name: '', department: '', salary: '' });
  };

  // Update Operation
  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
  };

  const handleUpdateEmployee = (e) => {
    e.preventDefault();
    
    // Validate input
    if (!editingEmployee.name || !editingEmployee.department || !editingEmployee.salary) {
      alert('Please fill in all fields');
      return;
    }

    setEmployees(employees.map(emp => 
      emp.id === editingEmployee.id ? editingEmployee : emp
    ));

    // Reset editing state
    setEditingEmployee(null);
  };

  // Delete Operation
  const handleDeleteEmployee = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      setEmployees(employees.filter(emp => emp.id !== id));
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
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              {editingEmployee && editingEmployee.id === employee.id ? (
                // Edit mode
                <>
                  <td>{employee.id}</td>
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
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>${employee.salary.toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleEditEmployee(employee)}>Edit</button>
                    <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
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