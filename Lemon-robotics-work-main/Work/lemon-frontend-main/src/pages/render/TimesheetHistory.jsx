import React from 'react';
import { Box, Button, Paper, Typography, Grid ,TextField} from "@mui/material";
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
const TimeSheetHistory = ({
  hours,
  setHours,
  date,
  setDate,
  handleSubmit,
  timeSheetHistory,
  loading,
  error,
  showTimeSheet, // Use the prop to manage visibility
  handleShowTimeSheet,
}) => {
  const groupedTimeSheets = groupTimeSheetsByMonth(timeSheetHistory);

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

          {timeSheetHistory.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: "center", color: "#555" }}>
              No time sheets recorded yet.
            </Typography>
          ) : (
            <Box sx={{ mt: 2, maxHeight: "400px", overflowY: "auto" }}>
              {Object.entries(groupedTimeSheets).map(([monthYear, timeSheets], index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ color: "#1976d2", mb: 1 }}>{monthYear}</Typography>
                  {timeSheets.map((item, idx) => (
                    <Paper key={idx} elevation={1} sx={{ padding: 1, margin: 1, borderRadius: 2 }}>
                      <Typography variant="body1">
                        <strong>Date:</strong> {item.work_date} <br />
                        <strong>Hours Worked:</strong> {item.hours_worked}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              ))}
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default TimeSheetHistory;
