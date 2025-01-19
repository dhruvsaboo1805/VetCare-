import React, { useEffect, useState } from "react";
import axios from "axios";

const calender_api = import.meta.env.VITE_API_URL_GET_CALENDER;

const Calendar = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to fetch calendar data
  const fetchCalendarData = async () => {
    const auth_token = localStorage.getItem("authToken");

    if (!auth_token) {
      setError("Authorization token not found!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(calender_api, {
        headers: {
          Authorization: `${auth_token}`,
        },
      });

      if (response.status === 200 && response.data.calender) {
        // Transform the calendar object into an array
        const transformedData = Object.values(response.data.calender).map((entry) => ({
          ...entry,
          date: new Date(entry.date),
        }));
        setCalendarData(transformedData);
      } else {
        setError("Invalid data format received from the server.");
      }
    } catch (err) {
      console.error("Error fetching calendar data:", err);
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendarData();
  }, []);

  // Helper function to get the number of days in the current month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to generate an array of dates for the current month
  const generateMonthlyDates = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = getDaysInMonth(year, month);

    const dates = [];
    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(new Date(year, month, day));
    }
    return dates;
  };

  const monthlyDates = generateMonthlyDates();

  // Function to get severity data for a specific date
  const getSeverityData = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const entry = calendarData.find(
      (data) => data.date.toISOString().split("T")[0] === formattedDate
    );
    return entry || {};
  };

  // Function to apply color based on severity
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 1:
        return "bg-green-300";
      case 2:
        return "bg-yellow-300";
      case 3:
        return "bg-red-300";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 ml-60 ">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Monthly Calendar - {new Date().toLocaleString("default", { month: "long", year: "numeric" })}
      </h1>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-500">Loading calendar...</p>
      ) : !error && calendarData.length > 0 ? (
        <div className="grid grid-cols-7 gap-4">
          {/* Render day headers */}
          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
            (day) => (
              <div
                key={day}
                className="text-center font-semibold text-gray-700 border-b pb-2"
              >
                {day}
              </div>
            )
          )}

          {/* Render calendar boxes for the month */}
          {monthlyDates.map((date, index) => {
            const { severity, summary } = getSeverityData(date);
            return (
              <div
                key={index}
                className={`h-24 border rounded-md p-2 flex flex-col justify-between ${getSeverityColor(
                  severity
                )}`}
              >
                <p className="text-sm font-medium">{date.getDate()}</p>
                <p className="text-xs text-gray-700">
                  {summary || "No summary available"}
                </p>
                {severity && (
                  <p className="text-xs text-gray-500">Severity: {severity}</p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">No calendar data available.</p>
      )}
    </div>
  );
};

export default Calendar;
