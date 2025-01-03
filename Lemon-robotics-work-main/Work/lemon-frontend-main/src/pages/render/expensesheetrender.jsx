import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TablePagination,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

// Utility function to filter expenses by month and year
const filterExpensesByMonthYear = (expenseHistory, month, year) => {
  return expenseHistory.filter((expense) => {
    const date = new Date(expense.date);
    return date.getMonth() === month && date.getFullYear() === year;
  });
};

const ExpenseSheetRender = ({ expenseHistory }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filter expenses based on the selected month and year
  const filteredExpenses = filterExpensesByMonthYear(
    expenseHistory,
    selectedMonth,
    selectedYear
  );

  // Extract unique years from the expense history
  const years = Array.from(
    new Set(
      expenseHistory.map((expense) => new Date(expense.date).getFullYear())
    )
  );

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        mb: 4,
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        borderRadius: 2,
        backgroundColor: "#ffffff",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h4"
          sx={{ mb: 3, textAlign: "center", color: "#1976d2" }}
        >
          My Expense Sheet
        </Typography>
      </Grid>

      {/* Month and Year Selection */}
      <Grid item xs={12} sm={6}>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            label="Month"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <MenuItem key={i} value={i}>
                {new Date(0, i).toLocaleString("default", {
                  month: "long",
                })}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            label="Year"
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {filteredExpenses.length === 0 ? (
        <Grid item xs={12}>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", color: "#555" }}
          >
            No expenses recorded for this month.
          </Typography>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Box sx={{ mt: 2, maxHeight: "400px", overflowY: "auto" }}>
            {filteredExpenses
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((expense, index) => (
                <Paper
                  key={index}
                  elevation={1}
                  sx={{ padding: 1, margin: 1, borderRadius: 2 }}
                >
                  <Typography variant="body1">
                    <strong>Date:</strong> {expense.date} <br />
                    <strong>Amount:</strong> ${expense.amount} <br />
                    <strong>Description:</strong> {expense.description}
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
        </Grid>
      )}
    </Grid>
  );
};

export default ExpenseSheetRender;
