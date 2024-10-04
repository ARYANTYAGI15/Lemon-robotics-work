// src/myaxios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/", // Your API base URL
  timeout: 1000, // Optional: set a timeout for requests
});

export default api;
