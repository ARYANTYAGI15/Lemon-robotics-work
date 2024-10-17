import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
} from "@mui/material";

const ExpenseSheetDisplay = ({ expense, description, setExpense, setDescription, handleSubmit, expenseHistory }) => {
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
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: '90%', maxWidth: 600, backgroundColor: "#ffffff" }}>
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

        <Typography variant="h5" sx={{ mt: 4, mb: 2, textAlign: "center", color: "#1976d2" }}>
          Expense History
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
      </Paper>
    </Box>
  );
};

export default ExpenseSheetDisplay;