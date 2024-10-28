import React, { useEffect, useState } from "react";
import ExpenseSheetDisplay from "../render/expensesheetdisplay"; // Adjust the import path as needed
import api from "../../apis/myaxios"; // Use the default export of the api instance

const ExpenseSheetFetch = () => {
  const [expense, setExpense] = useState("");
  const [description, setDescription] = useState("");
  const [expenseHistory, setExpenseHistory] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        // Use the api instance for GET request
        const response = await api.get("hr/expenses/"); // Use the endpoint relative to the base URL
        setExpenseHistory(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate that both expense and description are provided
    if (expense && description) {
      const newExpense = { amount: expense, description };

      try {
        // Use the api instance for POST request
        const response = await api.post("expenses/", newExpense); // Make sure this endpoint is correct

        // Update the expense history state
        setExpenseHistory((prevHistory) => [...prevHistory, response.data]);
        setExpense(""); // Clear the input fields
        setDescription("");
      } catch (error) {
        // Check if the error has a response and if the status is 401
        if (error.response && error.response.status === 401) {
          // Notify the user that they must be logged in to submit expenses
          alert("You must be logged in to submit expenses.");
          // Optionally, redirect to the login page here
          // For example: navigate('/login');
        } else {
          // Log any other error for debugging
          console.error("Error submitting expense:", error);
        }
      }
    } else {
      alert("Please fill out all fields."); // Inform user if fields are empty
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
    />
  );
};

export default ExpenseSheetFetch;
