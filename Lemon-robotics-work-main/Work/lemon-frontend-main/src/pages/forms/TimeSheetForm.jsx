import React from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { submitWorkingHours } from "../../apis/TimeSheetapi";

const TimeSheetForm = () => {
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
        formik.setSuccessMessage("Time sheet submitted successfully!");
      } catch (error) {
        formik.setErrorMessage(
          "Error submitting time sheet. Please try again."
        );
      }
    },
  });

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: "500px",
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
        {formik.successMessage && (
          <Grid item xs={12}>
            <Typography
              variant="body1"
              sx={{ mb: 2, textAlign: "center", color: "green" }}
            >
              {formik.successMessage}
            </Typography>
          </Grid>
        )}
        {formik.errorMessage && (
          <Grid item xs={12}>
            <Typography
              variant="body1"
              sx={{ mb: 2, textAlign: "center", color: "red" }}
            >
              {formik.errorMessage}
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
    </Box>
  );
};

export default TimeSheetForm;
