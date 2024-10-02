// src/pages/Login/Login.jsx

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    onLoginSuccess(); // Call this function on successful login
  };

  // Theme for responsive design
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#e0f7fa", // Light background color
        padding: "2rem",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: "2rem",
          borderRadius: "10px",
          width: isSmallScreen ? "90%" : "400px", // Responsive width
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#00796b" }}>
          Welcome to Lemon Robotics
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              sx: { borderRadius: "8px" }, // Rounded corners
            }}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              sx: { borderRadius: "8px" }, // Rounded corners
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              borderRadius: "8px",
              padding: "10px",
              "&:hover": {
                backgroundColor: "#004d40", // Darker shade on hover
              },
            }}
          >
            Login
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2, color: "#555" }}>
          Don't have an account? <a href="/signup" style={{ color: "#00796b", textDecoration: "none" }}>Sign up</a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
