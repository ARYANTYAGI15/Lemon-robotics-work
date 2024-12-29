import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TablePagination,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const groupTimeSheetsByMonth = (timeSheetHistory) => {
  return timeSheetHistory.reduce((groups, timeSheet) => {
    const date = new Date(timeSheet.work_date);
    const monthYear = `${date.toLocaleString("default", {
      month: "long",
    })} ${date.getFullYear()}`;

    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(timeSheet);
    return groups;
  }, {});
};

const filterTimeSheetsByMonthYear = (timeSheetHistory, month, year) => {
  return timeSheetHistory.filter((timeSheet) => {
    const date = new Date(timeSheet.work_date);
    console.log(
      "Date:",
      date,
      "Month:",
      date.getMonth(),
      "Year:",
      date.getFullYear()
    );
    return date.getMonth() === month && date.getFullYear() === year;
  });
};

const TimeSheetHistoryRender = ({ timeSheetHistory }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filtered time sheets based on the selected month and year
  const filteredTimeSheets = filterTimeSheetsByMonthYear(
    timeSheetHistory,
    selectedMonth,
    selectedYear
  );

  // Default years if timeSheetHistory is empty
  const years = Array.from(
    new Set(
      timeSheetHistory.length > 0
        ? timeSheetHistory.map((timeSheet) =>
            new Date(timeSheet.work_date).getFullYear()
          )
        : [new Date().getFullYear()]
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  console.log("Time Sheet History:", timeSheetHistory);
  console.log("Filtered Time Sheets:", filteredTimeSheets);

  return (
    <>
      {/* Time Sheet History */}
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
            My Time Sheet History
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

        {filteredTimeSheets.length === 0 ? (
          <Grid item xs={12}>
            <Typography
              variant="body1"
              sx={{ textAlign: "center", color: "#555" }}
            >
              No time sheets recorded for this month.
            </Typography>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Box sx={{ mt: 2, maxHeight: "400px", overflowY: "auto" }}>
              {filteredTimeSheets
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <Paper
                    key={index}
                    elevation={1}
                    sx={{ padding: 1, margin: 1, borderRadius: 2 }}
                  >
                    <Typography variant="body1">
                      <strong>Date:</strong> {item.work_date} <br />
                      <strong>Hours Worked:</strong> {item.hours_worked}
                    </Typography>
                  </Paper>
                ))}
            </Box>
            {/* Table Pagination */}
            <TablePagination
              component="div"
              count={filteredTimeSheets.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default TimeSheetHistoryRender;
