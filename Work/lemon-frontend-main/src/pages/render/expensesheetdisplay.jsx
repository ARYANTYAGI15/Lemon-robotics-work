import React,{ useState } from "react";
import axios from "axios"; // Import Axios
import { submitEmployeeExpense, getEmployeeExpense } from "../../apis/expensesheetapi";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
} from "@mui/material";

const ExpenseSheetDisplay = ({
  expense,
  description,
  setExpense,
  setDescription,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false); // State to show confirmation
  const [showExpenseSheet, setShowExpenseSheet] = useState(false); // State to toggle expense sheet
  const [expenseHistory, setExpenseHistory] = useState([]); // Expense history state

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the submitEmployeeExpense API method
      await submitEmployeeExpense(expense, description);

      // Show confirmation message
      setShowConfirmation(true);

      // Clear the form
      setExpense("");
      setDescription("");
    } catch (error) {
      console.error("Error submitting expense:", error.response?.data || error.message);
    }
  };

  // Function to fetch and show the expense sheet
  const handleShowExpenseSheet = async () => {
    try {
      const expenses = await getEmployeeExpense(); // Fetch expense sheet
      setExpenseHistory(expenses);
      setShowExpenseSheet(true); // Show the expense sheet view
    } catch (error) {
      console.error("Error fetching expenses:", error.response?.data || error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: 2,
        backgroundColor: "#e0f7fa",
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, borderRadius: 2, width: "90%", maxWidth: 600, backgroundColor: "#ffffff" }}
      >
        {!showExpenseSheet ? (
          <>
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
              variant="contained"
              color="secondary"
              sx={{ mt: 3 }}
              onClick={handleShowExpenseSheet} // Show expense sheet on click
            >
              Show My Expense Sheet
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h4" sx={{ mb: 3, textAlign: "center", color: "#1976d2" }}>
              My Expense Sheet
            </Typography>

            {expenseHistory.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: "center", color: "#555" }}>
                No expenses recorded yet.
              </Typography>
            ) : (
              <Box sx={{ mt: 2 }}>
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

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() => setShowExpenseSheet(false)} // Back to add expense view
            >
              Back to Add Expense
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default ExpenseSheetDisplay;
