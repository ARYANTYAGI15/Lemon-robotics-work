// services/auth.js
import axios from "axios";
import api from "./myaxios";
import { Alert } from "@mui/material";

// export a function to handle login requests
// export const login = async (user, pass) => {
//   try {
//     const response = await api.post("http://127.0.0.1:8000/auth/jwt/create", {
//       user,
//       pass,
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// helper function for axios logic
export async function userlogin(email, password) {
  // return the axios promise
  try {
    const response = await axios.post("http://127.0.0.1:8000/auth/jwt/create", {
      username: email,
      password: password,
    });
    localStorage.clear();
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    axios.defaults.headers.common[
      "Authorization"
    ] = `JWT ${response.data.access}`;
    window.location.href = "/";
  } catch (error) {
    console.log(error);
    {
      alert("Username / Password wrong or mismatch !");
    }
  }
}

// export const logout = async () => {
//   try {
//     const response = await api.delete("/auth");
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
