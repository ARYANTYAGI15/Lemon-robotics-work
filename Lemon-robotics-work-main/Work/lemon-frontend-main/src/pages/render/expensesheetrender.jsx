import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Grid, TablePagination, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

// Utility function to filter expenses by month and year
const filterExpensesByMonthYear = (expenses, month, year) => {
  return expenses.filter((expense) => {
    const date = new Date(expense.date);
    return date.getMonth() === month && date.getFullYear() === year;
  });
};

const ExpenseSheetDisplay = ({
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
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filter expenses based on the selected month and year
  const filteredExpenses = filterExpensesByMonthYear(expenseHistory, selectedMonth, selectedYear);

  // Handle pagination changes
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
        marginTop: "60px",
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
          {showExpenseSheet ? "Hide My Expense Sheet" : "Show My Expense Sheet"}
        </Button>
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

          {/* Month and Year Selection */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel>Month</InputLabel>
              <Select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                label="Month"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i} value={i}>
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel>Year</InputLabel>
              <Select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                label="Year"
              >
                {Array.from(new Set(expenseHistory.map((expense) => new Date(expense.date).getFullYear()))).map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {filteredExpenses.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: "center", color: "#555" }}>
              No expenses recorded for this month.
            </Typography>
          ) : (
            <>
              <Box sx={{ mt: 2, maxHeight: "400px", overflowY: "auto" }}>
                {filteredExpenses
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <Paper key={index} elevation={1} sx={{ padding: 1, margin: 1, borderRadius: 2 }}>
                      <Typography variant="body1">
                        <strong>Date:</strong> {item.date} <br />
                        <strong>Amount:</strong> ${item.amount} <br />
                        <strong>Description:</strong> {item.description}
                      </Typography>
                    </Paper>
                  ))}
              </Box>

              {/* Table Pagination */}
              <TablePagination
                component="div"
                count={filteredExpenses.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default ExpenseSheetDisplay;
