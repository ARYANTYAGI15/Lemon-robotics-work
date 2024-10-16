// src/pages/TimeSheet/TimeSheetHistory.jsx

import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import axios from "../../apis/myaxios"; // Import your axios instance

const TimeSheetHistory = () => {
  const [timeSheetHistory, setTimeSheetHistory] = useState([]);

  // Fetch timesheet history on component mount
  useEffect(() => {
    const fetchTimeSheetHistory = async () => {
      try {
        const response = await axios.get("/timesheets/myhistory/"); // API endpoint to get current user's timesheets
        setTimeSheetHistory(response.data); // Assuming the data is an array of timesheets
      } catch (error) {
        console.error("Error fetching timesheet history:", error);
      }
    };

    fetchTimeSheetHistory();
  }, []);

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

export default TimeSheetHistory;
