import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chatbot from "../components/Chatbot";
import Loader from "../components/Loader";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const pet_info_api = import.meta.env.VITE_API_URL_GET_PETS_INFO;
const report_api = import.meta.env.VITE_API_URL_REPORT;

const PetDashboard = () => {
  const pet_id = localStorage.getItem("pet_id"); // Extract pet_id from the URL
  const [petData, setPetData] = useState(null); // State to store API response
  const [loading, setLoading] = useState(true); // Loading state
  const authToken = localStorage.getItem("authToken"); // Get auth token from localStorage

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await fetch(`${pet_info_api}/${pet_id}`, {
          method: "GET",
          headers: {
            Authorization: `${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch pet data");
        }

        const data = await response.json();
        setPetData(data); // Set the fetched data
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchPetData();
  }, [pet_id, authToken]);

  const handleDownloadReport = async () => {
    try {
      const response = await fetch(`${report_api}?pet_id=${pet_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to generate the report");
      }
  
      // Assuming the response contains the PDF as a Blob or download link
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `pet_report_${pet_id}.pdf`; // Set the name of the PDF file
      link.click(); // Trigger the download
    } catch (error) {
      console.error("Error downloading report:", error.message);
    }
  };
  

  if (loading) {
    return <Loader />;
  }

  if (!petData) {
    return <div>Failed to fetch data.</div>;
  }

  // Prepare data for graphs
  const formatGraphData = (graph) => {
    const labels = graph.map((entry) => Object.keys(entry)[0]); // Extract dates
    const dataPoints = graph.map((entry) => Object.values(entry)[0]); // Extract values

    return {
      labels,
      datasets: [
        {
          label: "Value",
          data: dataPoints,
          fill: false,
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
  };

  const dietGraphData = formatGraphData(petData.graph_diet);
  const walkingGraphData = formatGraphData(petData.walking_graph);
  const sleepGraphData = formatGraphData(petData.sleep_graph);

  return (
    <div className="relative p-6 lg:p-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl lg:text-5xl font-bold mb-8 text-center text-blue-700">
        Pet Dashboard
      </h1>

      {/* Cards Section */}
      <div className="bg-blue-100 p-6 m-3 lg:p-8 rounded shadow-lg w-3/5 mx-auto">
        <h2 className="text-xl lg:text-xl font-semibold">
          Average Temperature
        </h2>
        <p className="text-3xl lg:text-2xl">
          {isNaN(parseFloat(petData.avg_temp))
            ? "N/A"
            : parseFloat(petData.avg_temp).toFixed(2)}
          °C
        </p>
      </div>
      <div className="bg-green-100 p-6 m-3 lg:p-8 rounded shadow-lg w-3/5 mx-auto">
        <h2 className="text-xl lg:text-xl font-semibold">Average Weight</h2>
        <p className="text-3xl lg:text-2xl">
          {isNaN(parseFloat(petData.avg_weight))
            ? "N/A"
            : parseFloat(petData.avg_weight).toFixed(2)}{" "}
          kg
        </p>
      </div>
      <div className="bg-yellow-100 p-6 m-3 lg:p-8 rounded shadow-lg w-3/5 mx-auto">
        <h2 className="text-xl lg:text-xl font-semibold">Average Mood</h2>
        <p className="text-3xl lg:text-2xl">
          {isNaN(parseFloat(petData.avg_mood))
            ? "N/A"
            : parseFloat(petData.avg_mood).toFixed(2)}
          /5
        </p>
      </div>
      <div className="bg-purple-100 p-6 m-3 lg:p-8 rounded shadow-lg w-3/5 mx-auto">
        <h2 className="text-xl lg:text-xl font-semibold">
          Average Water Intake
        </h2>
        <p className="text-3xl lg:text-2xl">
          {isNaN(parseFloat(petData.avg_water_intake))
            ? "N/A"
            : parseFloat(petData.avg_water_intake).toFixed(2)}{" "}
          L
        </p>
      </div>

      {/* Graph Section */}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:ml-32">
        <div className="p-4 bg-white rounded shadow-lg">
          <h2 className="text-lg lg:text-xl font-semibold mb-4 text-center">
            Diet Graph
          </h2>
          <Line data={dietGraphData} />
        </div>
        <div className="p-4 bg-white rounded shadow-lg">
          <h2 className="text-lg lg:text-xl font-semibold mb-4 text-center">
            Walking Graph
          </h2>
          <Line data={walkingGraphData} />
        </div>
        <div className="p-4 bg-white rounded shadow-lg">
          <h2 className="text-lg lg:text-xl font-semibold mb-4 text-center">
            Sleep Graph
          </h2>
          <Line data={sleepGraphData} />
        </div>
      </div>

      {/* Download Report Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleDownloadReport}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Download Pet Report
        </button>
      </div>

      {/* Chatbot Component */}
      <div className="fixed bottom-4 right-4">
        <Chatbot />
      </div>
    </div>
  );
};

export default PetDashboard;


