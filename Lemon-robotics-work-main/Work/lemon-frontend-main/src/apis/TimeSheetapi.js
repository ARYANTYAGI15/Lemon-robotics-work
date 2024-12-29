import api from "./myaxios"; // Import your axios instance

export const getMyTimeSheetDetails = async () => {
  try {
    const response = await api.get("hr/timesheets/me/"); // Corrected endpoint
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching employee working hours log:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Post a new working hours log with task description
export const submitWorkingHours = async (values) => {
  try {
    const response = await api.post("hr/timesheets/me/", {
      work_date: values.work_date,
      hours_worked: values.hours_worked,
      task_description: values.task_description,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error submitting working hours log:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default {
  submitWorkingHours, // Function to submit a new working hours log with description
  getMyTimeSheetDetails,
};
