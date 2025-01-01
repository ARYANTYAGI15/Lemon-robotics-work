import React, { useState, useEffect } from "react";
import { getMyTimeSheetDetails } from "../../apis/TimeSheetapi";
import TimeSheetHistoryRender from "../render/TimeSheetHistoryRender";

const TimeSheetHistoryFetch = () => {
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [timeSheetHistory, setTimeSheetHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchTimeSheetHistory = async (month, year) => {
    try {
      const history = await getMyTimeSheetDetails(month, year);
      if (Array.isArray(history)) {
        setTimeSheetHistory(history);
        console.log(history);
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

  useEffect(() => {
    fetchTimeSheetHistory(selectedMonth + 1, selectedYear); // Month is 0-based in JavaScript
  }, [selectedMonth, selectedYear]);

  return (
    <TimeSheetHistoryRender
      hours={hours}
      setHours={setHours}
      date={date}
      setDate={setDate}
      timeSheetHistory={timeSheetHistory}
      loading={loading}
      error={error}
      selectedMonth={selectedMonth}
      setSelectedMonth={setSelectedMonth}
      selectedYear={selectedYear}
      setSelectedYear={setSelectedYear}
      page={page}
      setPage={setPage}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
    />
  );
};

export default TimeSheetHistoryFetch;
