import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";

const PetSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pet_id } = useParams();

  useEffect(() => {
    if (pet_id) {
      // Save pet_id to local storage
      localStorage.setItem("pet_id", pet_id);
    }
  }, [pet_id]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-12 text-2xl text-blue-500 md:hidden z-50 focus:outline-none"
      >
        {isOpen ? <FaTimes color="white"/> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-blue-500 text-white w-64 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:w-64`}
      >
        <h1 className="text-2xl font-bold p-4 border-b border-blue-400">
          Pet Dashboard
        </h1>
        <nav className="flex flex-col p-4 space-y-4">
          <NavLink
            to={`/petsidebar/dashboard`}
            className="hover:bg-blue-600 px-4 py-2 rounded"
          >
            Dashboard
          </NavLink>
          <NavLink
            to={`/petsidebar/dailytrack`}
            className="hover:bg-blue-600 px-4 py-2 rounded"
          >
            Daily Tracking
          </NavLink>
          <NavLink
            to={`/petsidebar/reminder`}
            className="hover:bg-blue-600 px-4 py-2 rounded"
          >
            Reminder
          </NavLink>
          <a href="#vet-visits" className="hover:bg-blue-600 px-4 py-2 rounded">
            Vet Visits
          </a>
          <a href="#profile" className="hover:bg-blue-600 px-4 py-2 rounded">
            Profile
          </a>
        </nav>
      </div>
    </div>
  );
};

export default PetSidebar;
