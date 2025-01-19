import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import photo from "../assets/landing_page_hero_section.png";
import dog from "../assets/dog.webp";
import cat from "../assets/cat.jpeg";

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    } else {
      navigate("/login");
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-5 bg-white shadow-md">
        <div className="text-2xl font-bold text-blue-600">VetCare +</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a href="/blogs" className="text-gray-700 hover:text-blue-600">
            Blogs
          </a>
          <a href="#services" className="text-gray-700 hover:text-blue-600">
            Services
          </a>
          <a href="#contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </a>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button
            onClick={handleMenuToggle}
            className="text-blue-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Login/Logout Button */}
        <div className="hidden md:flex items-center space-x-4">
          {!isLoggedIn ? (
            <button
              onClick={handleToggle}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleToggle}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col space-y-4 p-5">
            <a
              href="#blogs"
              className="text-gray-700 hover:text-blue-600"
              onClick={handleMenuToggle}
            >
              Blogs
            </a>
            <a
              href="#services"
              className="text-gray-700 hover:text-blue-600"
              onClick={handleMenuToggle}
            >
              Services
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600"
              onClick={handleMenuToggle}
            >
              Contact
            </a>
            {!isLoggedIn ? (
              <button
                onClick={() => {
                  handleToggle();
                  handleMenuToggle();
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => {
                  handleToggle();
                  handleMenuToggle();
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="flex flex-col md:flex-row justify-between items-center p-10">
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 leading-tight">
            Taking Care of Your Little Friends
          </h1>
          <p className="mt-4 text-gray-600">
            Our highly skilled professional associates love pets as much as you
            do, and we offer a wide range of pet services.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <img
            src={photo}
            alt="Pets illustration"
            className="max-w-xs md:max-w-md"
          />
        </div>
      </header>

      {/* section - 2 */}

      <section className="bg-gray-200 text-gray-800 py-10 px-5">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          {/* Images */}
          <div className="flex flex-col space-y-4">
            <img
              src={cat} 
              alt="Cat peeking"
              className="w-3/4 mx-auto md:w-full rounded-lg shadow-lg"
            />
            <img
              src={dog} 
              alt="Dog with bow"
              className="w-3/4 mx-auto md:w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold text-blue-700 mb-4">
              Welcome To <span className="text-blue-600">Pet Care Center</span>
            </h2>
            <p className="text-gray-600 m-6 leading-relaxed">
              Grooming & Supply provides grooming services for all dog and cat
              breeds. We are fully committed to the health and hygiene of your
              furry best friends. We offer free estimates and consultations to
              help keep your pets in their best condition.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
