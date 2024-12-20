import React, { useState, useEffect } from "react";
import { submitWorkingHours, getEmployeeWorkingHours } from "../../apis/TimeSheetapi";
import TimeSheetHistory from "../render/TimesheetHistory";

const TimeSheet = () => {
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [taskDescription, setTaskDescription] = useState(""); // New state for task description
  const [timeSheetHistory, setTimeSheetHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTimeSheet, setShowTimeSheet] = useState(false); // State for showing time sheet history

  useEffect(() => {
    const fetchTimeSheetHistory = async () => {
      try {
        const history = await getEmployeeWorkingHours();
        if (Array.isArray(history)) {
          setTimeSheetHistory(history);
        } else {
          console.error("Received non-array data:", history);
          setTimeSheetHistory([]);
        }
      } catch (error) {
        console.error("Error fetching time sheet history:", error);
        setError("Failed to load time sheet history.");
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSheetHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hours && date && taskDescription) { // Include taskDescription in validation
      try {
        const newEntry = await submitWorkingHours(hours, date, taskDescription); // Pass taskDescription
        setTimeSheetHistory((prev) => [...prev, newEntry]);
        setHours("");
        setDate("");
        setTaskDescription(""); // Clear taskDescription after submission
      } catch (error) {
        console.error("Error submitting time sheet:", error);
        setError("Failed to submit time sheet entry.");
      }
    }
  };

  const handleShowTimeSheet = () => {
    setShowTimeSheet((prev) => !prev); // Toggle the visibility
  };

  return (
    <TimeSheetHistory
      hours={hours}
      setHours={setHours}
      date={date}
      setDate={setDate}
      taskDescription={taskDescription} // Pass taskDescription state
      setTaskDescription={setTaskDescription} // Pass setTaskDescription
      handleSubmit={handleSubmit}
      timeSheetHistory={timeSheetHistory}
      loading={loading}
      error={error}
      showTimeSheet={showTimeSheet} // Pass down the state
      handleShowTimeSheet={handleShowTimeSheet} // Pass down the toggle function
    />
  );
};

export default TimeSheet;
