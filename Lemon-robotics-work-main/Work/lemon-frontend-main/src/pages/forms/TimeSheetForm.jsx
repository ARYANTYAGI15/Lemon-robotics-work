import React, { useState } from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { submitWorkingHours } from "../../apis/TimeSheetapi";

const TimeSheetForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      hours: "",
      date: "",
    },
    validationSchema: Yup.object({
      hours: Yup.string()
        .required("Please enter the working hours")
        .test("hours", "Please enter a valid number of hours", (value) => {
          if (!value) return true;
          const hours = Number(value);
          return hours >= 0 && hours <= 24;
        }),
      date: Yup.string()
        .required("Please enter the date")
        .test("date", "Please enter a valid date", (value) => {
          if (!value) return true;
          return Boolean(new Date(value));
        }),
    }),
    onSubmit: async (values) => {
      try {
        const newEntry = await submitWorkingHours(values.hours, values.date);
        setSuccessMessage("Time sheet submitted successfully!");
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Error submitting time sheet. Please try again.");
        setSuccessMessage("");
      }
    },
  });

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        mb: 4,
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        borderRadius: 2,
        backgroundColor: "#ffffff",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h4"
          sx={{ mb: 3, textAlign: "center", color: "#1976d2" }}
        >
          Log Time Sheet
        </Typography>
      </Grid>
      {successMessage && (
        <Grid item xs={12}>
          <Typography
            variant="body1"
            sx={{ mb: 2, textAlign: "center", color: "green" }}
          >
            {successMessage}
          </Typography>
        </Grid>
      )}
      {errorMessage && (
        <Grid item xs={12}>
          <Typography
            variant="body1"
            sx={{ mb: 2, textAlign: "center", color: "red" }}
          >
            {errorMessage}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Working Hours"
                name="hours"
                type="text"
                fullWidth
                inputProps={{ ...formik.getFieldProps("hours") }}
                error={formik.touched.hours && Boolean(formik.errors.hours)}
                helperText={formik.touched.hours && formik.errors.hours}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Date"
                type="date"
                name="date"
                fullWidth
                inputProps={{ ...formik.getFieldProps("date") }}
                InputLabelProps={{ shrink: true }}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default TimeSheetForm;
