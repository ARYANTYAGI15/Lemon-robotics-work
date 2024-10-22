// src/apis/TimeSheetapi.js
import api from "./myaxios"; // Import your axios instance

// Get the employee's working hours log
export const getEmployeeWorkingHours = async () => {
  try {
    const response = await api.get("hr/timesheets/me/"); // Corrected endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching employee working hours log:", error.response?.data || error.message);
    throw error;
  }
};

// Post a new working hours log with current date
export const submitWorkingHours = async (working_hours) => {
  try {
    // Get the current date in YYYY-MM-DD format
    const date = new Date().toISOString().split("T")[0];

    // Submit the working hours log with the current date
    const response = await api.post("hr/timesheets/me/", {  // Corrected endpoint
      working_hours,
      date,  // Automatically include the current date
    });

    return response.data;
  } catch (error) {
    console.error("Error submitting working hours log:", error.response?.data || error.message);
    throw error;
  }
};

// Export the functions
export default {
  getEmployeeWorkingHours, // Function to fetch employee working hours logs
  submitWorkingHours,      // Function to submit a new working hours log
};
