import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Paper, Grid } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from React Router
import { submitEmployeeExpense, getEmployeeExpense } from "../../apis/expensesheetapi";

const ExpenseSheetDisplay = ({
  expense,
  description,
  setExpense,
  setDescription,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showExpenseSheet, setShowExpenseSheet] = useState(false);
  const [expenseHistory, setExpenseHistory] = useState([]);

  useEffect(() => {
    const fetchExpenseHistory = async () => {
      try {
        const expenses = await getEmployeeExpense();
        if (Array.isArray(expenses)) {
          setExpenseHistory(expenses);
        } else {
          console.error("Received non-array data:", expenses);
          setExpenseHistory([]);
        }
      } catch (error) {
        console.error("Error fetching expense history:", error);
      }
    };

    fetchExpenseHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitEmployeeExpense(expense, description);
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);

      setExpense("");
      setDescription("");
    } catch (error) {
      console.error("Error submitting expense:", error.response?.data || error.message);
    }
  };

  const handleShowExpenseSheet = async () => {
    try {
      const expenses = await getEmployeeExpense();
      setExpenseHistory(expenses);
      setShowExpenseSheet(true);
    } catch (error) {
      console.error("Error fetching expenses:", error.response?.data || error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "100vh",
        padding: 2,
        backgroundColor: "#e0f7fa",
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, borderRadius: 2, width: "45%", backgroundColor: "#ffffff", mr: 2 }}
      >
        <Typography variant="h4" sx={{ mb: 3, textAlign: "center", color: "#1976d2" }}>
          Add Expense
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Expense Amount"
                type="number"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
                fullWidth
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  height: "56px",
                  "&:hover": {
                    backgroundColor: "#004ba0",
                  },
                }}
              >
                Submit Expense
              </Button>
            </Grid>
          </Grid>
        </form>

        {showConfirmation && (
          <Typography variant="h6" sx={{ mt: 2, textAlign: "center", color: "green" }}>
            Expense added successfully!
          </Typography>
        )}

        <Button
          variant="outlined"
          color="secondary"
          sx={{ mt: 3 }}
          onClick={handleShowExpenseSheet}
        >
          Show My Expense Sheet
        </Button>

        {/* Navigation Buttons */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}>
          <Button variant="contained" color="primary" component={Link} to="/time-sheet">
            Go to Time Sheet
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/employee">
            Go to Employee Card
          </Button>
        </Box>
      </Paper>

      {/* Expense Sheet History */}
      {showExpenseSheet && (
        <Paper
          elevation={3}
          sx={{ padding: 4, borderRadius: 2, width: "45%", backgroundColor: "#ffffff", ml: 2 }}
        >
          <Typography variant="h4" sx={{ mb: 3, textAlign: "center", color: "#1976d2" }}>
            My Expense Sheet
          </Typography>

          {expenseHistory.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: "center", color: "#555" }}>
              No expenses recorded yet.
            </Typography>
          ) : (
            <Box sx={{ mt: 2, maxHeight: "400px", overflowY: "auto" }}>
              {expenseHistory.map((item, index) => (
                <Paper key={index} elevation={1} sx={{ padding: 1, margin: 1, borderRadius: 2 }}>
                  <Typography variant="body1">
                    <strong>Amount:</strong> ${item.amount} <br />
                    <strong>Description:</strong> {item.description}
                  </Typography>
                </Paper>
              ))}
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default ExpenseSheetDisplay;
