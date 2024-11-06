import React from "react";
import { Box, Button, TextField, Typography, Paper, Grid } from "@mui/material";

// Utility function to group expenses by month and year
const groupExpensesByMonth = (expenses) => {
  return expenses.reduce((groups, expense) => {
    const date = new Date(expense.date);
    const monthYear = `${date.toLocaleString("default", {
      month: "long",
    })} ${date.getFullYear()}`;

    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(expense);
    return groups;
  }, {});
};

const ExpenseSheetRender = ({
  expense,
  description,
  setExpense,
  setDescription,
  handleSubmit,
  expenseHistory,
  showConfirmation,
  handleShowExpenseSheet,
  showExpenseSheet,
}) => {
  const groupedExpenses = groupExpensesByMonth(expenseHistory);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "100vh",
        padding: 2,
        marginTop: "60px", // Add margin to move it below the header
        backgroundColor: "#e0f7fa",
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          width: "45%",
          backgroundColor: "#ffffff",
          mr: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 3, textAlign: "center", color: "#1976d2" }}
        >
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
          <Typography
            variant="h6"
            sx={{ mt: 2, textAlign: "center", color: "green" }}
          >
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
      </Paper>

      {/* Expense Sheet History */}
      {showExpenseSheet && (
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 2,
            width: "45%",
            backgroundColor: "#ffffff",
            ml: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 3, textAlign: "center", color: "#1976d2" }}
          >
            My Expense Sheet
          </Typography>

          {expenseHistory.length === 0 ? (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", color: "#555" }}
            >
              No expenses recorded yet.
            </Typography>
          ) : (
            <Box sx={{ mt: 2, maxHeight: "400px", overflowY: "auto" }}>
              {Object.entries(groupedExpenses).map(
                ([monthYear, expenses], index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ color: "#1976d2", mb: 1 }}>
                      {monthYear}
                    </Typography>
                    {expenses.map((item, idx) => (
                      <Paper
                        key={idx}
                        elevation={1}
                        sx={{ padding: 1, margin: 1, borderRadius: 2 }}
                      >
                        <Typography variant="body1">
                          <strong>Date:</strong> {item.date} <br />
                          <strong>Amount:</strong> ${item.amount} <br />
                          <strong>Description:</strong> {item.description}
                        </Typography>
                      </Paper>
                    ))}
                  </Box>
                )
              )}
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default ExpenseSheetRender;
