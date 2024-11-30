import React from 'react';
import EmployeeTable from './EmployeeTable';
import '../styles/Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Salary Management Dashboard</h1>
      <div className="dashboard-content">
        <EmployeeTable />
        {/* You can add more dashboard widgets here */}
      </div>
    </div>
  );
}

export default Dashboard;