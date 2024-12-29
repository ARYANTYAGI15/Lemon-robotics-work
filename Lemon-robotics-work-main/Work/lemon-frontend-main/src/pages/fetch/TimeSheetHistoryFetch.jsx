import React, { useState, useEffect } from "react";
import {
  submitWorkingHours,
  getMyTimeSheetDetails,
} from "../../apis/TimeSheetapi";
import TimeSheetHistoryRender from "../render/TimeSheetHistoryRender";

const TimeSheetHistoryFetch = () => {
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [timeSheetHistory, setTimeSheetHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimeSheetHistory = async () => {
      try {
        const history = await getMyTimeSheetDetails();
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

  return (
    <TimeSheetHistoryRender
      hours={hours}
      setHours={setHours}
      date={date}
      setDate={setDate}
      timeSheetHistory={timeSheetHistory}
      loading={loading}
      error={error}
    />
  );
};

export default TimeSheetHistoryFetch;
