// src/apis/auth.js
import axios from "axios"; // Importing axios
import { api, setTokens, removeTokens } from './myaxios'; // Assuming myaxios.js is one level up
import { Alert } from "@mui/material";

// Function to handle user login requests
export async function userlogin(email, password) {
  try {
    // Sending POST request to obtain tokens (adjust endpoint if necessary)
    const response = await api.post("/api/token/", {
      username: email,  // Ensure username is passed, not email
      password: password,
    });

    // Store access and refresh tokens in localStorage (or sessionStorage, based on preference)
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);

    // Set the default Authorization header for future requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;

    // Redirect to home or dashboard on successful login
    window.location.href = "/";
  } catch (error) {
    console.log(error);

    // Handle the error by showing an alert or some UI feedback
    if (error.response && error.response.status === 401) {
      // Use Material UI's <Alert> component for better UI consistency
      alert("Invalid username or password. Please try again.");
    } else {
      alert("An error occurred. Please try again later.");
    }
  }
}

