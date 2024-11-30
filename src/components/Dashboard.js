import React from 'react'; 
import EmployeeSalaryManagement from './EmployeeSalaryManagement'; 
import '../styles/Dashboard.css'; 
 
function Dashboard() { 
  return ( 
    <div className="dashboard-container"> 
      <h1>Salary Management Dashboard</h1> 
      <div className="dashboard-content"> 
        <EmployeeSalaryManagement /> 
      </div> 
    </div> 
  ); 
} 
 
export default Dashboard;