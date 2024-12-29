import React, { useState } from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { submitMyTimeSheetDetails } from "../../apis/TimeSheetapi";

const TimeSheetForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      hours_worked: "",
      task_description: "",
      work_date: "",
    },
    validationSchema: Yup.object({
      hours_worked: Yup.string()
        .required("Please enter the working hours")
        .matches(/^\d+$/, "Please enter a valid number of hours"),
      task_description: Yup.string().required(
        "Please enter a task description"
      ),
      work_date: Yup.string()
        .required("Please enter the date")
        .test("date", "Please enter a valid date", (value) => {
          if (!value) return true;
          return Boolean(new Date(value));
        }),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        const newEntry = await submitMyTimeSheetDetails(values);
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
                name="hours_worked"
                type="number"
                fullWidth
                inputProps={{ ...formik.getFieldProps("hours_worked") }}
                error={
                  formik.touched.hours_worked &&
                  Boolean(formik.errors.hours_worked)
                }
                helperText={
                  formik.touched.hours_worked && formik.errors.hours_worked
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Task Description"
                name="task_description"
                type="text"
                fullWidth
                inputProps={{ ...formik.getFieldProps("task_description") }}
                error={
                  formik.touched.task_description &&
                  Boolean(formik.errors.task_description)
                }
                helperText={
                  formik.touched.task_description &&
                  formik.errors.task_description
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Date"
                type="date"
                name="work_date"
                fullWidth
                inputProps={{ ...formik.getFieldProps("work_date") }}
                InputLabelProps={{ shrink: true }}
                error={
                  formik.touched.work_date && Boolean(formik.errors.work_date)
                }
                helperText={formik.touched.work_date && formik.errors.work_date}
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
