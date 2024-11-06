import React, { useEffect, useState } from "react";
import {
  getEmployeeExpense,
  submitEmployeeExpense,
} from "../../apis/expensesheetapi";
import ExpenseSheetRender from "../render/ExpenseSheetRender";
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
          // Sort expenses by date in descending order
          const sortedExpenses = expenses.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setExpenseHistory(sortedExpenses);
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

      // Refresh expense history and sort by date
      const updatedExpenses = await getEmployeeExpense();
      const sortedUpdatedExpenses = updatedExpenses.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setExpenseHistory(sortedUpdatedExpenses);
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
      // Sort expenses by date in descending order
      const sortedExpenses = expenses.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setExpenseHistory(sortedExpenses);
      setShowExpenseSheet(true);
    } catch (error) {
      console.error(
        "Error fetching expenses:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <ExpenseSheetRender
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
