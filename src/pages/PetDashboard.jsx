import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

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

const PetDashboard = () => {
  const pet_id = localStorage.getItem('pet_id'); // Extract pet_id from the URL
  const [petData, setPetData] = useState(null); // State to store API response
  const [loading, setLoading] = useState(true); // Loading state
  const authToken = localStorage.getItem('authToken'); // Get auth token from localStorage

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await fetch(`${pet_info_api}/${pet_id}`, {
          method: 'GET',
          headers: {
            Authorization: `${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch pet data');
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

  if (loading) {
    return <div>Loading...</div>;
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
          label: 'Value',
          data: dataPoints,
          fill: false,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };
  };

  const dietGraphData = formatGraphData(petData.graph_diet);
  const walkingGraphData = formatGraphData(petData.walking_graph);
  const sleepGraphData = formatGraphData(petData.sleep_graph);

  return (
    <div className="p-6 lg:p-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl lg:text-5xl font-bold mb-8 text-center text-blue-700">
        Pet Dashboard
      </h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-blue-100 p-6 lg:p-8 rounded shadow-lg">
          <h2 className="text-xl lg:text-2xl font-semibold">Average Temperature</h2>
          <p className="text-3xl lg:text-4xl">{petData.avg_temp}°C</p>
        </div>
        <div className="bg-green-100 p-6 lg:p-8 rounded shadow-lg">
          <h2 className="text-xl lg:text-2xl font-semibold">Average Weight</h2>
          <p className="text-3xl lg:text-4xl">{petData.avg_weight} kg</p>
        </div>
        <div className="bg-yellow-100 p-6 lg:p-8 rounded shadow-lg">
          <h2 className="text-xl lg:text-2xl font-semibold">Average Mood</h2>
          <p className="text-3xl lg:text-4xl">{petData.avg_mood}/5</p>
        </div>
        <div className="bg-purple-100 p-6 lg:p-8 rounded shadow-lg">
          <h2 className="text-xl lg:text-2xl font-semibold">Average Water Intake</h2>
          <p className="text-3xl lg:text-4xl">{petData.avg_water_intake} L</p>
        </div>
      </div>

      {/* Graph Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </div>
  );
};

export default PetDashboard;
