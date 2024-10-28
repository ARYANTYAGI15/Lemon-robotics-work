import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, TextField, Button, Grid } from "@mui/material";
import { submitWorkingHours, getEmployeeWorkingHours } from "../../apis/TimeSheetapi"; // Import API methods

const TimeSheetHistory = () => {
  const [timeSheetHistory, setTimeSheetHistory] = useState([]);
  const [workingHours, setWorkingHours] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  // Fetch timesheet history on component mount
  useEffect(() => {
    const fetchTimeSheetHistory = async () => {
      setLoading(true); // Start loading
      try {
        const response = await getEmployeeWorkingHours(); // Use the API function
        setTimeSheetHistory(response); // Assuming the data is an array of timesheets
        setError(""); // Clear any previous error
      } catch (error) {
        console.error("Error fetching timesheet history:", error);
        setError("Failed to load timesheet history. Please try again."); // Set error message
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchTimeSheetHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (workingHours && date) {
      try {
        const newEntry = await submitWorkingHours(workingHours, date); // Submit to API
        setTimeSheetHistory((prev) => [...prev, newEntry]); // Update history with new entry
        setWorkingHours(""); // Clear input
        setDate(""); // Clear input
        setError(""); // Clear any previous error
        console.log("Time sheet submitted:", newEntry);
      } catch (error) {
        console.error("Error submitting time sheet:", error);
        setError("Failed to submit timesheet. Please try again."); // Set error message
      }
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
        backgroundColor: "#e0f7fa", // Light background color
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: '90%', maxWidth: 600, backgroundColor: "#ffffff" }}>
        <Typography variant="h4" sx={{ mb: 3, textAlign: "center", color: "#1976d2" }}>
          My Time Sheet History
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Working Hours"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
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
                sx={{
                  height: "56px",
                  "&:hover": {
                    backgroundColor: "#004ba0", // Darker shade on hover
                  },
                }}
              >
                Submit Working Hours
              </Button>
            </Grid>
          </Grid>
        </form>

        {error && (
          <Typography variant="body1" sx={{ textAlign: "center", color: "red", mt: 2 }}>
            {error}
          </Typography>
        )}

        {loading ? (
          <Typography variant="body1" sx={{ textAlign: "center", color: "#555", mt: 4 }}>
            Loading timesheet history...
          </Typography>
        ) : timeSheetHistory.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: "center", color: "#555", mt: 4 }}>
            No time sheets recorded yet.
          </Typography>
        ) : (
          <Box sx={{ mt: 4 }}>
            {timeSheetHistory.map((entry, index) => (
              <Paper key={index} elevation={1} sx={{ padding: 1, margin: 1, borderRadius: 2 }}>
                <Typography variant="body1">
                  <strong>Hours:</strong> {entry.working_hours} <br />
                  <strong>Date:</strong> {entry.date}
                </Typography>
              </Paper>
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default TimeSheetHistory;
