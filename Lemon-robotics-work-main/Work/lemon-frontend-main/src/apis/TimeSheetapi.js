import api from "./myaxios"; // Import your axios instance
//Time sheet API
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
    const work_date = new Date().toISOString().split("T")[0]; // Renamed to work_date for consistency

    // Submit the working hours log with the current date
    const response = await api.post("hr/timesheets/me/", {  // Corrected endpoint
      work_date,         // Use work_date instead of date
      hours_worked: working_hours, // Use hours_worked instead of working_hours
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
