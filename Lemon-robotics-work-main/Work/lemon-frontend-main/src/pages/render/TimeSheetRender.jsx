// TimeSheetHistory.jsx
import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { getEmployeeWorkingHours } from "../../apis/TimeSheetapi";

const TimeSheetRender = () => {
  const [timeSheetHistory, setTimeSheetHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(true);

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

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {showHistory && (
        <Paper
          elevation={3}
          sx={{ padding: 4, borderRadius: 2, backgroundColor: "#ffffff" }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 3, textAlign: "center", color: "#1976d2" }}
          >
            Time Sheet History
          </Typography>
          <Grid container spacing={2}>
            {timeSheetHistory.map((entry, index) => (
              <Grid item key={index} xs={12}>
                <Typography variant="body1">
                  Date: {entry.work_date} | Hours: {entry.hours_worked}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default TimeSheetRender;
