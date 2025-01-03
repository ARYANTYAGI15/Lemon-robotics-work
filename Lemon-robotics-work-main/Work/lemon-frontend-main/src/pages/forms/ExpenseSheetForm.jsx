import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { submitEmployeeExpense, getEmployeeExpense } from "../../apis/expensesheetapi";

const ExpenseSheetForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [expenseHistory, setExpenseHistory] = useState([]);

  useEffect(() => {
    const fetchExpenseHistory = async () => {
      try {
        const expenses = await getEmployeeExpense();
        if (Array.isArray(expenses)) {
          // Sort expenses by date in descending order
          const sortedExpenses = expenses.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setExpenseHistory(sortedExpenses);
        }
      } catch (error) {
        console.error("Error fetching expense history:", error);
      }
    };

    fetchExpenseHistory();
  }, []);

  const formik = useFormik({
    initialValues: {
      expense: "",
      description: "",
    },
    validationSchema: Yup.object({
      expense: Yup.string()
        .required("Please enter the expense amount")
        .matches(/^\d+(\.\d{1,2})?$/, "Please enter a valid amount"),
      description: Yup.string()
        .required("Please enter a description")
        .min(5, "Description must be at least 5 characters long"),
    }),
    onSubmit: async (values) => {
      try {
        await submitEmployeeExpense(values.expense, values.description);
        setSuccessMessage("Expense submitted successfully!");
        setErrorMessage("");

        // Refresh expense history
        const updatedExpenses = await getEmployeeExpense();
        const sortedUpdatedExpenses = updatedExpenses.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setExpenseHistory(sortedUpdatedExpenses);

        // Reset form fields
        formik.resetForm();
      } catch (error) {
        setErrorMessage("Error submitting expense. Please try again.");
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
          Log Expense Sheet
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
                label="Expense Amount"
                name="expense"
                type="text"
                fullWidth
                inputProps={{ ...formik.getFieldProps("expense") }}
                error={
                  formik.touched.expense && Boolean(formik.errors.expense)
                }
                helperText={
                  formik.touched.expense && formik.errors.expense
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                type="text"
                fullWidth
                inputProps={{ ...formik.getFieldProps("description") }}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
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

export default ExpenseSheetForm;
