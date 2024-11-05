import React, { useEffect, useState } from "react";
// Adjust the import path as needed
import { Link } from "react-router-dom"; // Import Link from React Router
import {
  submitEmployeeExpense,
  getEmployeeExpense,
} from "../../apis/expensesheetapi";
import ExpenseSheetDisplay from "../render/expensesheetrender";
const ExpenseSheetFetch = () => {
  const [expense, setExpense] = useState("");
  const [description, setDescription] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showExpenseSheet, setShowExpenseSheet] = useState(false);
  const [expenseHistory, setExpenseHistory] = useState([]);

  useEffect(() => {
    const fetchExpenseHistory = async () => {
      try {
        const expenses = await getEmployeeExpense();
        if (Array.isArray(expenses)) {
          setExpenseHistory(expenses);
        } else {
          console.error("Received non-array data:", expenses);
          setExpenseHistory([]);
        }
      } catch (error) {
        console.error("Error fetching expense history:", error);
      }
    };

    fetchExpenseHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitEmployeeExpense(expense, description);
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);

      // Clear input fields after submission
      setExpense("");
      setDescription("");

      // Refresh expense history
      const updatedExpenses = await getEmployeeExpense();
      setExpenseHistory(updatedExpenses);
    } catch (error) {
      console.error(
        "Error submitting expense:",
        error.response?.data || error.message
      );
    }
  };

  const handleShowExpenseSheet = async () => {
    try {
      const expenses = await getEmployeeExpense();
      setExpenseHistory(expenses);
      setShowExpenseSheet(true);
    } catch (error) {
      console.error(
        "Error fetching expenses:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <ExpenseSheetDisplay
      expense={expense}
      description={description}
      setExpense={setExpense}
      setDescription={setDescription}
      handleSubmit={handleSubmit}
      expenseHistory={expenseHistory}
      showConfirmation={showConfirmation}
      handleShowExpenseSheet={handleShowExpenseSheet}
      showExpenseSheet={showExpenseSheet}
    />
  );
};

export default ExpenseSheetFetch;
