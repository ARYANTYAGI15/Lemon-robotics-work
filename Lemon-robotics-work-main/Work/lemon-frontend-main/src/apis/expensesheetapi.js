import api from "./myaxios"; // Import your axios instance

// Get the employee's expense history
export const getEmployeeExpense = async () => {
  try {
    const response = await api.get("hr/expenses/me/");
    return response.data;
  } catch (error) {
    console.error("Error fetching employee expense details:", error.response?.data || error.message);
    throw error;
  }
};

// Post a new employee expense with current date
export const submitEmployeeExpense = async (amount, description) => {
  try {
    // Get the current date in YYYY-MM-DD format
    const date = new Date().toISOString().split("T")[0]; 

    // Submit the expense with the current date
    const response = await api.post("hr/expenses/me/", {
      amount,
      description,
      date,  // Automatically include the current date
    });
    
    return response.data;
  } catch (error) {
    console.error("Error submitting employee expense:", error.response?.data || error.message);
    throw error;
  }
};

// Export the functions
export default {
  getEmployeeExpense, // Function to fetch employee expenses
  submitEmployeeExpense, // Function to submit a new expense
};
