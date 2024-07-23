import React from "react";
import { Routes, Route } from "react-router-dom"; // Import BrowserRouter or HashRouter
import Dashboard from "./Components/dashboard"; // Corrected the spelling of 'Dashboard'
import Login from "./Components/login";
import Users from "./Components/Users";
import AddUser from "./Components/AddUser";
import UserDetails from "./Components/UserDetails";
import Roles from "./Components/Role";
import AddRole from "./Components/AddRole";
import RoleDetails from "./Components/RoleDetails";
import AddCustomer from "./Components/AddCustomer";
import CustomerDetails from "./Components/CustomerDetails";
import Customers from "./Components/Customers";
import CustomerRequest from "./Components/CustomerRequest";
import CustomerChecker from "./Components/CustomerChecker";
import RoleRequest from "./Components/RoleRequest";
import RoleChecker from "./Components/RoleChecker";
import ReportEcollection from "./Components/ReportEcollection";
import UserRequest from "./Components/UserRequest";
import UserChecker from "./Components/UserChecker";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      {/* --------------------------------------------------------------- */}
      <Route path="/CustomerRequest" element={<CustomerRequest />} />
      <Route path="/CustomerChecker" element={<CustomerChecker />} />
      <Route path="/RoleRequest" element={<RoleRequest />} />
      <Route path="/RoleChecker" element={<RoleChecker />} />
      <Route path="/UserRequest" element={<UserRequest />} />
      <Route path="/UserChecker" element={<UserChecker />} />
      {/* --------------------------------------------------------------- */}
      <Route path="/User" element={<Users />} />
      <Route path="/AddUser" element={<AddUser />} />
      <Route path="/EditUser" element={<AddUser />} />
      <Route path="/UserDetails" element={<UserDetails />} />
      <Route path="/DeleteUser" element={<UserDetails />} />
      {/* --------------------------------------------------------------- */}
      <Route path="/AddRole" element={<AddRole />} />
      <Route path="/Role" element={<Roles />} />
      <Route path="/EditRole" element={<AddRole />} />
      <Route path="/RoleDetails" element={<RoleDetails />} />
      <Route path="/DeleteRole" element={<RoleDetails />} />
      {/* --------------------------------------------------------------- */}
      <Route path="/AddCustomer" element={<AddCustomer />} />
      <Route path="/CustomerDetails" element={<CustomerDetails />} />
      <Route path="/Customers" element={<Customers />} />
      <Route path="/EditCustomer" element={<AddCustomer />} />
      {/* --------------------------------------------------------------- */}
      <Route path="/ReportEcollection" element={<ReportEcollection />} />
    </Routes>
  );
};
export default Routers;
