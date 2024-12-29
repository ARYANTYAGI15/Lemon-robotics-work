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

export const submitMyTimeSheetDetails = async (values) => {
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
  submitMyTimeSheetDetails,
  getMyTimeSheetDetails,
};
