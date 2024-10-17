// src/App.jsx

import React, { useState } from "react";
<<<<<<< Updated upstream
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
>>>>>>> Stashed changes
import { Header, Footer } from "./components";
import {
  Home,
  About,
  AllServicePage,
  VirtualCommission,
  SoftwareTesting,
  Login,
  ExpenseSheet,
  TimeSheet,
<<<<<<< Updated upstream
  EmployeeCard,
=======
>>>>>>> Stashed changes
} from "./pages";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

<<<<<<< Updated upstream
  // Handle successful login
=======
>>>>>>> Stashed changes
  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Set to true on successful login
  };

<<<<<<< Updated upstream
  // Private Route wrapper to check authentication
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Header isAuthenticated={isAuthenticated} />
=======
  return (
    <BrowserRouter>
      <Header isAuthenticated={isAuthenticated} /> {/* Pass authentication state */}
>>>>>>> Stashed changes
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<AllServicePage />} />
        <Route path="/services/virtualcom" element={<VirtualCommission />} />
        <Route path="/services/softwaretest" element={<SoftwareTesting />} />
<<<<<<< Updated upstream
        
        {/* Public route for login */}
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />

        {/* Protected routes */}
        <Route path="/employee" element={<EmployeeCard/>} />
        <Route path="/expense-sheet" element={<ExpenseSheet/>} />
        <Route path="/time-sheet" element={<TimeSheet/>}/>
=======
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/expense-sheet" element={<ExpenseSheet />} />
        <Route path="/time-sheet" element={<TimeSheet />} />
>>>>>>> Stashed changes
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
