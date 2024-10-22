import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Paper, Grid } from "@mui/material";
import { submitWorkingHours, getEmployeeWorkingHours } from "../../apis/TimeSheetapi"; // Import API methods

const TimeSheet = () => {
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [timeSheetHistory, setTimeSheetHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false); // State to manage visibility of time sheet history

  // Fetch the timesheet history on component mount
  useEffect(() => {
    const fetchTimeSheetHistory = async () => {
      try {
        const history = await getEmployeeWorkingHours(); // Fetch from API
        console.log("Fetched timesheet history:", history); // Log the response
        
        // Check if the response is an array
        if (Array.isArray(history)) {
          setTimeSheetHistory(history); // Set the state if valid
        } else {
          console.error("Received non-array data:", history);
          setTimeSheetHistory([]); // Reset to empty array if not valid
        }
      } catch (error) {
        console.error("Error fetching time sheet history:", error);
      }
    };

    fetchTimeSheetHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hours && date) {
      try {
        // Submit new time sheet entry to the API
        const newEntry = await submitWorkingHours(hours); // Adjusted to just send hours
        // Update local state with the new entry
        setTimeSheetHistory((prev) => [...prev, newEntry]); // Use functional update
        setHours("");
        setDate("");
        console.log("Time sheet submitted:", newEntry);
      } catch (error) {
        console.error("Error submitting time sheet:", error);
      }
    }
  };

  const toggleHistory = () => {
    setShowHistory((prev) => !prev); // Toggle the history visibility
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
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: "90%", maxWidth: 600, backgroundColor: "#ffffff" }}>
        <Typography variant="h4" sx={{ mb: 3, textAlign: "center", color: "#1976d2" }}>
          Log Time Sheet
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Working Hours"
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
                sx={{
                  height: "56px",
                  "&:hover": {
                    backgroundColor: "#004ba0", // Darker shade on hover
                  },
                }}
              >
                Submit Time Sheet
              </Button>
            </Grid>
          </Grid>
        </form>

        <Button
          variant="outlined"
          color="primary"
          onClick={toggleHistory}
          sx={{ mt: 3 }}
        >
          {showHistory ? "Hide Time Sheet History" : "Show Time Sheet History"}
        </Button>

        {showHistory && ( // Render history only when showHistory is true
          <>
            <Typography variant="h5" sx={{ mt: 4, mb: 2, textAlign: "center", color: "#1976d2" }}>
              Time Sheet History
            </Typography>

            {timeSheetHistory.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: "center", color: "#555" }}>
                No time sheets recorded yet.
              </Typography>
            ) : (
              <Box sx={{ mt: 2 }}>
                {timeSheetHistory.map((entry, index) => (
                  <Paper key={index} elevation={1} sx={{ padding: 1, margin: 1, borderRadius: 2 }}>
                    <Typography variant="body1">
                      <strong>Hours:</strong> {entry.hours_worked} <br /> {/* Adjusted to correct property */}
                      <strong>Date:</strong> {entry.work_date} {/* Adjusted to correct property */}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default TimeSheet;
