import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleExpenseClick = () => {
    navigate("/expensesheet");
  };

  const handleTimeClick = () => {
    navigate("/timesheet");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h3" sx={{ mb: 4 }}>
        Employee Dashboard
      </Typography>

      <Button variant="contained" sx={{ mb: 2 }} onClick={handleExpenseClick}>
        Add Expense Sheet
      </Button>

      <Button variant="contained" onClick={handleTimeClick}>
        Log Time Sheet
      </Button>
    </Box>
  );
};

export default Dashboard;
