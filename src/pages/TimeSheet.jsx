// src/pages/TimeSheet/TimeSheet.jsx

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
} from "@mui/material";

const TimeSheet = () => {
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [timeSheetHistory, setTimeSheetHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hours && date) {
      const newEntry = { hours, date };
      setTimeSheetHistory([...timeSheetHistory, newEntry]);
      setHours("");
      setDate("");
      console.log("Time sheet submitted:", newEntry);
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
                  <strong>Hours:</strong> {entry.hours} <br />
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

export default TimeSheet;
