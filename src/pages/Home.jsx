import React from "react";
import axios from "axios";
import Chatbot from "../components/Chatbot";
import { useNavigate } from "react-router-dom";

const AuthCheck_api = import.meta.env.VITE_API_URL_AUTH_CHECK;
const LogOut_api = import.meta.env.VITE_API_URL_LOGOUT;

const Home = () => {
  const navigate = useNavigate();

  const handleAuthCheck = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("No token found. Please log in first.");
        return;
      }

      // Perform the GET request to check authorization
      const response = await axios.get(AuthCheck_api, {
        headers: {
          Authorization: `${token}`,
        },
      });

      // Display the authorization response
      if (response.status === 200) {
        alert("Authorization successful!");
        console.log("Authorization Response:", response.data);
      } else {
        alert("Authorization failed!");
      }
    } catch (error) {
      console.error("Error during authorization check:", error);
      alert(
        error.response?.data?.message ||
          "Authorization check failed. Please try again."
      );
    }
  };

  const handleLogout = async () => {
    
    const response = await axios.get(LogOut_api, {
      headers: {
        Authorization: `${token}`,
      },
    });
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold p-4">Home Page</h1>
      <Chatbot />
      <button onClick={handleAuthCheck}>dhruv_auth</button>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Home;
