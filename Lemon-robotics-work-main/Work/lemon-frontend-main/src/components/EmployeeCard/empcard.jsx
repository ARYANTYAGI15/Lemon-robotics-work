import React from "react";

const EmployeeCard = ({ employee }) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{employee?.name || "Employee Name"}</h2>
      <p style={styles.detail}><strong>Position:</strong> {employee?.position || "N/A"}</p>
      <p style={styles.detail}><strong>Email:</strong> {employee?.email || "N/A"}</p>
      <p style={styles.detail}><strong>Phone:</strong> {employee?.phone || "N/A"}</p>
      <p style={styles.detail}><strong>Department:</strong> {employee?.department || "N/A"}</p>
    </div>
  );
};

// Inline styles object
const styles = {
  card: {
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    padding: "20px",
    maxWidth: "400px",
    textAlign: "left",
  },
  title: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#333",
  },
  detail: {
    fontSize: "16px",
    marginBottom: "5px",
    color: "#555",
  },
};

export default EmployeeCard;
