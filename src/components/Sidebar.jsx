import React, { useState } from "react";
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

const logout_Api = import.meta.env.VITE_API_URL_LOGOUT;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Use navigate to redirect the user to login
  const authToken = localStorage.getItem("authToken");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(logout_Api, {
        method: "GET", // Assuming GET method for logout API
        headers: {
          Authorization: `${authToken}`, // Sending authToken in the request header
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Remove the auth token from localStorage
      localStorage.removeItem("authToken");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <div>
      {/* Mobile Hamburger Button */}
      <div className="lg:hidden p-4">
        <button
          onClick={toggleSidebar}
          className="text-black focus:outline-none w-10 h-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar (Mobile and Desktop) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-50 transition-opacity lg:relative lg:bg-transparent ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } lg:visible lg:opacity-100`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white text-black flex flex-col z-50 items-center justify-start pt-12 space-y-6 shadow-lg transform transition-transform lg:transform-none ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Logo */}
          <img src={logo} alt="logo" className="w-36" />

          {/* Navigation Links */}
          <ul className="w-full">
            <li>
              <NavLink
                to="/overview"
                className={({ isActive }) =>
                  `block py-2 px-4 text-center font-medium rounded-md ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 text-gray-800"
                  }`
                }
              >
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/calender"
                className={({ isActive }) =>
                  `block py-2 px-4 text-center font-medium rounded-md ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 text-gray-800"
                  }`
                }
              >
                Calender
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `block py-2 px-4 text-center font-medium rounded-md ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 text-gray-800"
                  }`
                }
              >
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `block py-2 px-4 text-center font-medium rounded-md ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 text-gray-800"
                  }`
                }
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/messages"
                className={({ isActive }) =>
                  `block py-2 px-4 text-center font-medium rounded-md ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 text-gray-800"
                  }`
                }
              >
                Messages
              </NavLink>
            </li>
          </ul>

          {/* Logout Button */}
          <div className="mt-auto w-full">
            <button
              onClick={handleLogout}
              className="w-full py-2 text-center text-white bg-red-500 hover:bg-red-700 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
