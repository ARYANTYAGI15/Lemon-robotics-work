// src/apis/auth.js
import axios from "axios"; // Importing axios
import api from "./myaxios"; // Adjusted path if myaxios.js is one level up
import { Alert } from "@mui/material";

// Function to handle user login requests
export async function userlogin(email, password) {
  try {
    const response = await api.post("auth/jwt/create", {
      username: email,
      password: password,
    });
    localStorage.clear();
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    axios.defaults.headers.common["Authorization"] = `JWT ${response.data.access}`;
    window.location.href = "/";
  } catch (error) {
    console.log(error);
    alert("Username / Password wrong or mismatch !");
  }
}
