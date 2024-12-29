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
  EmployeeCardFetch,
  ExpenseSheetForm,
  TimeSheetWindow,
} from "./pages";
import SideNav from "./components/SideNav/SideNav";
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
        <SideNav />
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
        <Route path="/hr/expense-sheet" element={<ExpenseSheetForm />} />
        {/* <Route path="/hr/time-sheet" element={<TimeSheet />} /> */}
        <Route path="/hr/time-sheet" element={<TimeSheetWindow />} />
      </Routes>
      {window.location.pathname.startsWith("/hr") ? null : <Footer />}
    </BrowserRouter>
  );
}

export default App;
