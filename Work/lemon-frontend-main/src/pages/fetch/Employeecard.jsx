import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeCardPage = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/hr/employees/me/")
      .then((response) => {
        setEmployee(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching employee data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p style={{ fontSize: "18px", textAlign: "center", marginTop: "20px" }}>
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
        {error}
      </p>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Vertically centers the content
        backgroundColor: "#f4f4f9",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Employee Details</h1>
      <div style={styles.card}>
        <h2>{employee.name}</h2>
        <p>
          <strong>Email:</strong> {employee.email}
        </p>
        <p>
          <strong>Position:</strong> {employee.position}
        </p>
        <p>
          <strong>Department:</strong> {employee.department}
        </p>
        <p>
          <strong>Phone:</strong> {employee.phone}
        </p>
        {/* Add any other employee details you want to display */}
      </div>
    </div>
  );
};

// Inline styles using a styles object
const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    width: "300px", // You can adjust the width based on your needs
    textAlign: "left",
  },
};

export default EmployeeCardPage;
