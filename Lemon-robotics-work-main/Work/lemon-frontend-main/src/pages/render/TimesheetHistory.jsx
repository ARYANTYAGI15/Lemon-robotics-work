import React, { useState } from 'react';
import { Box, Button, Paper, Typography, Grid, TextField, TablePagination, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const groupTimeSheetsByMonth = (timeSheetHistory) => {
  return timeSheetHistory.reduce((groups, timeSheet) => {
    const date = new Date(timeSheet.work_date);
    const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

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
    return date.getMonth() === month && date.getFullYear() === year;
  });
};

const TimeSheetHistory = ({
  hours,
  setHours,
  date,
  setDate,
  handleSubmit,
  timeSheetHistory,
  loading,
  error,
  showTimeSheet,
  handleShowTimeSheet,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filtered time sheets based on the selected month and year
  const filteredTimeSheets = filterTimeSheetsByMonthYear(timeSheetHistory, selectedMonth, selectedYear);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "flex-start", height: "100vh", padding: 2, marginTop: "60px", backgroundColor: "#e0f7fa", overflow: "hidden" }}>
      
      {/* Log Time Sheet */}
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: "45%", backgroundColor: "#ffffff", mr: 2 }}>
        <Typography variant="h4" sx={{ mb: 3, textAlign: "center", color: "#1976d2" }}>Log Time Sheet</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Working Hours"
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                fullWidth
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ height: "56px", "&:hover": { backgroundColor: "#004ba0" }}}
              >
                Submit Time Sheet
              </Button>
            </Grid>
          </Grid>
        </form>

        <Button variant="outlined" color="secondary" sx={{ mt: 3 }} onClick={handleShowTimeSheet}>
          {showTimeSheet ? "Hide My Time Sheet History" : "Show My Time Sheet History"}
        </Button>
      </Paper>

      {/* Time Sheet History */}
      {showTimeSheet && (
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: "45%", backgroundColor: "#ffffff", ml: 2 }}>
          <Typography variant="h4" sx={{ mb: 3, textAlign: "center", color: "#1976d2" }}>My Time Sheet History</Typography>

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
                {Array.from(new Set(timeSheetHistory.map((timeSheet) => new Date(timeSheet.work_date).getFullYear()))).map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {filteredTimeSheets.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: "center", color: "#555" }}>
              No time sheets recorded for this month.
            </Typography>
          ) : (
            <>
              <Box sx={{ mt: 2, maxHeight: "400px", overflowY: "auto" }}>
                {filteredTimeSheets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                  <Paper key={index} elevation={1} sx={{ padding: 1, margin: 1, borderRadius: 2 }}>
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
            </>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default TimeSheetHistory;
