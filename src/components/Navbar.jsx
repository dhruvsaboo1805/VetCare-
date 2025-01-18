import React from "react";
import { FaCircleUser } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="ml-44 flex justify-between items-center p-5 bg-white shadow-md  md:ml-64 sm:ml-44">
      <div className="text-xl sm:text-2xl font-bold text-black">
        Hi, Chirag
      </div>
      <div className="text-black">
        <FaCircleUser className="text-3xl sm:text-4xl" />
      </div>
    </nav>
  );
};

export default Navbar;
