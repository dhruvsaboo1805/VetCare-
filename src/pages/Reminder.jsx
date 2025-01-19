import React, { useState } from "react";
import axios from "axios";

const reminder_api = import.meta.env.VITE_API_URL_GET_REMINDER;

const Reminder = () => {
  const [formData, setFormData] = useState({
    date: "",
    summary: "",
    severity: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const dd = String(date.getDate()).padStart(2, "0");
    const time = "00:00:00"; // Fixed time
    return `${yyyy}-${mm}-${dd} ${time}`; // Format: yyyy-MM-dd 00:00:00
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pet_id = localStorage.getItem("pet_id");
    const auth_token = localStorage.getItem("authToken");

    if (!pet_id || !auth_token) {
      alert("Pet ID or Auth Token not found in localStorage!");
      return;
    }

    const formattedDate = formatDateTime(formData.date);

    try {
      const response = await axios.post(
        `${reminder_api}/${pet_id}`,
        {
          date: formattedDate,
          summary: formData.summary,
          severity: formData.severity,
        },
        {
          headers: {
            Authorization: `${auth_token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Reminder created successfully!");
        setFormData({
          date: "",
          summary: "",
          severity: 1,
        });
      }
    } catch (error) {
      console.error("Error creating reminder:", error);
      alert("Failed to create reminder. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-500">
        Create a Reminder
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Input */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date of Task
          </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Summary Input */}
        <div>
          <label
            htmlFor="summary"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Summary or Notes
          </label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            placeholder="Enter a summary or notes..."
            required
          ></textarea>
        </div>

        {/* Severity Input */}
        <div>
          <label
            htmlFor="severity"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Severity (1 to 3)
          </label>
          <select
            id="severity"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="1">1 - Low</option>
            <option value="2">2 - Medium</option>
            <option value="3">3 - High</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Create Reminder
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reminder;
