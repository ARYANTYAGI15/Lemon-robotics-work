import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Box, Grid, Typography } from "@mui/material";
import axios from "axios";

import { userlogin } from "../../apis/auth";

const validationSchema = Yup.object({
  email: Yup.string("Enter your email").required("Email is required"),
  password: Yup.string("Enter your password").required("Password is required"),
});

const baseURL = "http://127.0.0.1:8000/auth/jwt/create";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      userlogin(values.email, values.password);
      resetForm();
      setSubmitting(false);
    },
  });

  const styles = {
    container: {
      backgroundImage:
        "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
    },
  };

  return (
    <Grid
      sx={styles.container}
      container
      direction="column"
      alignItems={"center"}
      justifyContent="center"
      minHeight="100vh"
      border="2px solid yellow"
    >
      <Grid
        container
        rowSpacing={2}
        xs={8}
        md={6}
        lg={4}
        sx={{
          padding: 2,
          flexDirection: "column",
          borderRadius: 5,
          boxShadow: "5px 5px 10px #ccc",
        }}
      >
        <Grid item xs sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h4" padding={2}>
            Log IN
          </Typography>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <Grid>
            <TextField
              fullWidth
              variant="filled"
              id="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              variant="filled"
              id="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 3,
            }}
          >
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;

// // src/pages/Login/Login.jsx

// import React from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { userlogin } from "../../apis/auth"; // Adjust the import path as necessary

// const Login = ({ onLoginSuccess }) => {
//   // Theme for responsive design
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   // Validation schema with Yup
//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email("Invalid email address").required("Email is required"),
//     password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
//   });

//   const handleLogin = async (values, { setSubmitting, setErrors }) => {
//     try {
//       await userlogin(values.email, values.password); // Call the userlogin function
//       onLoginSuccess(); // Call this function on successful login
//     } catch (err) {
//       setErrors({ email: "Login failed. Please check your credentials." }); // Set error message
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//         backgroundColor: "#e0f7fa", // Light background color
//         padding: "2rem",
//       }}
//     >
//       <Paper
//         elevation={6}
//         sx={{
//           padding: "2rem",
//           borderRadius: "10px",
//           width: isSmallScreen ? "90%" : "400px", // Responsive width
//           textAlign: "center",
//         }}
//       >
//         <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#00796b" }}>
//           Welcome to Lemon Robotics
//         </Typography>

//         <Formik
//           initialValues={{ email: "", password: "" }}
//           validationSchema={validationSchema}
//           onSubmit={handleLogin}
//         >
//           {({ isSubmitting }) => (
//             <Form>
//               <Field
//                 name="email"
//                 as={TextField}
//                 label="Email Address"
//                 type="email"
//                 fullWidth
//                 variant="outlined"
//                 margin="dense"
//                 sx={{ mb: 2 }}
//                 InputProps={{
//                   sx: { borderRadius: "8px" }, // Rounded corners
//                 }}
//               />
//               <ErrorMessage name="email" component={Typography} color="error" sx={{ mb: 2 }} />

//               <Field
//                 name="password"
//                 as={TextField}
//                 label="Password"
//                 type="password"
//                 fullWidth
//                 variant="outlined"
//                 margin="dense"
//                 sx={{ mb: 2 }}
//                 InputProps={{
//                   sx: { borderRadius: "8px" }, // Rounded corners
//                 }}
//               />
//               <ErrorMessage name="password" component={Typography} color="error" sx={{ mb: 2 }} />

//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 disabled={isSubmitting}
//                 sx={{
//                   borderRadius: "8px",
//                   padding: "10px",
//                   "&:hover": {
//                     backgroundColor: "#004d40", // Darker shade on hover
//                   },
//                 }}
//               >
//                 Login
//               </Button>
//             </Form>
//           )}
//         </Formik>

//         <Typography variant="body2" sx={{ mt: 2, color: "#555" }}>
//           Don't have an account? <a href="/signup" style={{ color: "#00796b", textDecoration: "none" }}>Sign up</a>
//         </Typography>
//       </Paper>
//     </Box>
//   );
// };

// export default Login;
