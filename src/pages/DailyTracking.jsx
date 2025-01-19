import React, { useState } from "react";
import axios from "axios";

const pet_info_api = import.meta.env.VITE_API_URL_GET_PETS_INFO;

const DailyTracking = () => {
    const pet_id = localStorage.getItem('pet_id') // Extract pet_id from the URL
  const authToken = localStorage.getItem("authToken"); // Get auth token from localStorage
  const [formData, setFormData] = useState({
    datentime: "",
    weight: "",
    diet: [{ meal_type: "", datentime: "", food: "", amount: "", notes: "" }],
    temperature: "",
    water_intake: "",
    walking: "",
    behavior: "",
    mood_indicator: "",
    sleep_time: "",
    notes: "",
  });

  // Handle general input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "weight" ? parseInt(value, 10) || "" : value,
    });
  };

  // Handle diet input changes
  const handleDietChange = (index, field, value) => {
    const updatedDiet = [...formData.diet];

    if (field === "datetime-local") {
      // Format the datetime-local value to "YYYY-MM-DD HH:mm:ss"
      const formattedValue = value.replace("T", " ") + ":00";
      updatedDiet[index]["datentime"] = formattedValue; // Save in the correct field
    } else {
      updatedDiet[index][field] = value;
    }

    setFormData({ ...formData, diet: updatedDiet });
  };

  // Add a new diet entry
  const addDietEntry = () => {
    setFormData({
      ...formData,
      diet: [
        ...formData.diet,
        { meal_type: "", datentime: "", food: "", amount: "", notes: "" },
      ],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format the datetime field
    const formattedDateTime = formData.datentime.replace("T", " ") + ":00";

    const formattedData = {
      ...formData,
      datentime: formattedDateTime,
    };

    try {
      const response = await axios.post(
        `${pet_info_api}/${pet_id}`,
        formattedData,
        {
          headers: { Authorization: `${authToken}` },
        }
      );
      console.log("Response:", response.data);
      alert("Daily tracking data submitted successfully!");
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to submit data. Please try again.");
    }
  };

  return (
    <div className="p-6 lg:p-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl lg:text-5xl font-bold mb-8 text-center text-blue-700">
        Daily Tracking
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-8 rounded shadow-lg"
      >
        {/* Datentime */}
        <div className="mb-6">
          <label
            htmlFor="datentime"
            className="block text-lg font-semibold mb-2"
          >
            Tracking Date and Time
          </label>
          <input
            type="datetime-local"
            id="datentime"
            name="datentime"
            value={formData.datentime}
            onChange={handleInputChange}
            className="w-full p-3 border rounded"
            required
          />
        </div>

        {/* Weight */}
        <div className="mb-6">
          <label htmlFor="weight" className="block text-lg font-semibold mb-2">
            Weight (in KG)
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            className="w-full p-3 border rounded"
            required
          />
        </div>

        {/* Diet */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Diet</label>
          {formData.diet.map((dietEntry, index) => (
            <div key={index} className="mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Meal Type"
                  value={dietEntry.meal_type}
                  onChange={(e) =>
                    handleDietChange(index, "meal_type", e.target.value)
                  }
                  className="p-3 border rounded"
                  required
                />
                <input
                  type="datetime-local"
                  placeholder="Time"
                  value={(dietEntry.datentime || "")
                    .replace(" ", "T")
                    .slice(0, 16)}
                  onChange={(e) =>
                    handleDietChange(index, "datentime", e.target.value)
                  }
                  className="p-3 border rounded"
                  required
                />

                <input
                  type="text"
                  placeholder="Food"
                  value={dietEntry.food}
                  onChange={(e) =>
                    handleDietChange(index, "food", e.target.value)
                  }
                  className="p-3 border rounded"
                />
                <input
                  type="number"
                  placeholder="Amount (grams)"
                  value={dietEntry.amount}
                  onChange={(e) =>
                    handleDietChange(index, "amount", e.target.value)
                  }
                  className="p-3 border rounded"
                />
              </div>
              <textarea
                placeholder="Notes"
                value={dietEntry.notes}
                onChange={(e) =>
                  handleDietChange(index, "notes", e.target.value)
                }
                className="w-full p-3 border rounded mt-2"
              ></textarea>
            </div>
          ))}
          <button
            type="button"
            onClick={addDietEntry}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Another Diet Entry
          </button>
        </div>

        {/* Other Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="temperature"
              className="block text-lg font-semibold mb-2"
            >
              Temperature (°C)
            </label>
            <input
              type="number"
              id="temperature"
              name="temperature"
              value={formData.temperature}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
              required
            />
          </div>
          <div>
            <label
              htmlFor="water_intake"
              className="block text-lg font-semibold mb-2"
            >
              Water Intake (Litres)
            </label>
            <input
              type="number"
              id="water_intake"
              name="water_intake"
              value={formData.water_intake}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
            />
          </div>
          <div>
            <label
              htmlFor="walking"
              className="block text-lg font-semibold mb-2"
            >
              Walking (KM)
            </label>
            <input
              type="number"
              id="walking"
              name="walking"
              value={formData.walking}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
            />
          </div>
          <div>
            <label
              htmlFor="behaviour"
              className="block text-lg font-semibold mb-2"
            >
              Behaviour
            </label>
            <input
              type="text"
              id="behavior"
              name="behavior"
              value={formData.behavior}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
              required
            />
          </div>
          <div>
            <label
              htmlFor="mood_indicator"
              className="block text-lg font-semibold mb-2"
            >
              Mood Indicator (0-3)
            </label>
            <input
              type="number"
              id="mood_indicator"
              name="mood_indicator"
              value={formData.mood_indicator}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
              required
            />
          </div>
          <div>
            <label
              htmlFor="sleep_time"
              className="block text-lg font-semibold mb-2"
            >
              Sleep Time (Hours)
            </label>
            <input
              type="number"
              id="sleep_time"
              name="sleep_time"
              value={formData.sleep_time}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="mt-6">
          <label htmlFor="notes" className="block text-lg font-semibold mb-2">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            className="w-full p-3 border rounded"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-3 rounded mt-6"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DailyTracking;
