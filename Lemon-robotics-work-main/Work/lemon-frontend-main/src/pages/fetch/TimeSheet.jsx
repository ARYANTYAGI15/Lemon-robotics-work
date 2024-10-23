import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Paper, Grid } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from React Router
import { submitWorkingHours, getEmployeeWorkingHours } from "../../apis/TimeSheetapi";

const TimeSheet = () => {
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [timeSheetHistory, setTimeSheetHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const fetchTimeSheetHistory = async () => {
      try {
        const history = await getEmployeeWorkingHours();
        if (Array.isArray(history)) {
          setTimeSheetHistory(history);
        } else {
          console.error("Received non-array data:", history);
          setTimeSheetHistory([]);
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
        const newEntry = await submitWorkingHours(hours);
        setTimeSheetHistory((prev) => [...prev, newEntry]);
        setHours("");
        setDate("");
      } catch (error) {
        console.error("Error submitting time sheet:", error);
      }
    }
  };

  const toggleHistory = () => {
    setShowHistory((prev) => !prev);
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
        backgroundColor: "#e0f7fa",
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
                    backgroundColor: "#004ba0",
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

        {showHistory && (
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
                      <strong>Hours:</strong> {entry.hours_worked} <br />
                      <strong>Date:</strong> {entry.work_date}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            )}
          </>
        )}

        {/* Navigation Buttons */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}>
          <Button variant="contained" color="primary" component={Link} to="/expense-sheet">
            Go to Expense Sheet
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/employee">
            Go to Employee Card
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default TimeSheet;
