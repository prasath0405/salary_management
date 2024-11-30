import React from 'react';
import '../styles/EmployeeTable.css';

function EmployeeTable() {
  const salaryData = [
    { id: 1, name: 'John Doe', department: 'IT', salary: 75000 },
    { id: 2, name: 'Jane Smith', department: 'HR', salary: 65000 },
    { id: 3, name: 'Mike Johnson', department: 'Finance', salary: 80000 }
  ];

  return (
    <div className="employee-table-container">
      <h2>Employee Salary Details</h2>
      <table className="salary-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {salaryData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>${employee.salary.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;