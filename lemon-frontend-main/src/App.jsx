// src/App.jsx

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
} from "./pages";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Set to true on successful login
  };

  return (
    <BrowserRouter>
      <Header isAuthenticated={isAuthenticated} /> {/* Pass authentication state */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<AllServicePage />} />
        <Route path="/services/virtualcom" element={<VirtualCommission />} />
        <Route path="/services/softwaretest" element={<SoftwareTesting />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/expense-sheet" element={<ExpenseSheet />} />
        <Route path="/time-sheet" element={<TimeSheet />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
