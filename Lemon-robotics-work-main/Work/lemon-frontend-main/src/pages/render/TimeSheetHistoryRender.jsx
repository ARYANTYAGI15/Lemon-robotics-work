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
import React from "react";

const TimeSheetHistoryRender = ({
  timeSheetHistory,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get the current year
  const currentYear = new Date().getFullYear();
  // Create an array with the current year and the previous year
  const years = [currentYear - 1, currentYear];

  return (
    <>
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

        {timeSheetHistory.length === 0 ? (
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
              {timeSheetHistory
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <Paper
                    key={index}
                    elevation={1}
                    sx={{ padding: 1, margin: 1, borderRadius: 2 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Grid container direction="column">
                          <Grid item>
                            <Typography variant="body1">
                              <strong>Date:</strong> {item.work_date}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body1">
                              <strong>Hours Worked:</strong> {item.hours_worked}
                            </Typography>
                          </Grid>
                          {/* Add more fields here */}
                          <Grid item>
                            <Typography variant="body1">
                              <strong>Task Description:</strong>{" "}
                              {item.task_description || "N/A"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
            </Box>
            {/* Table Pagination */}
            <TablePagination
              component="div"
              count={timeSheetHistory.length}
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
