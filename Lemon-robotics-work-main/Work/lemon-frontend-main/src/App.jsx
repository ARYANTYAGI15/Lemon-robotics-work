// src/App.jsx

import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header, Footer } from "./components";
import {
  Home,
  About,
  AllServicePage,
  VirtualCommission,
  SoftwareTesting,
  Login,
  ExpenseSheetFetch,
  TimeSheet,
  EmployeeCardFetch,
} from "./pages";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

  // Handle successful login
  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Set to true on successful login
  };

  // Private Route wrapper to check authentication
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      {/* <Header isAuthenticated={isAuthenticated} /> */}
      {window.location.pathname.startsWith("/hr") ? (
        <h1>Seperate SideNavbar</h1>
      ) : (
        <Header isAuthenticated={isAuthenticated} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<AllServicePage />} />
        <Route path="/services/virtualcom" element={<VirtualCommission />} />
        <Route path="/services/softwaretest" element={<SoftwareTesting />} />

        {/* Public route for login */}
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />

        {/* Protected routes */}
        <Route path="/hr/employee" element={<EmployeeCardFetch />} />
        <Route path="/hr/expense-sheet" element={<ExpenseSheetFetch />} />
        <Route path="/hr/time-sheet" element={<TimeSheet />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
