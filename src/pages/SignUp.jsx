import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/SignUp.css";

const SignUp_api = import.meta.env.VITE_API_URL_SIGNUP;
// const test_api = import.meta.env.VITE_API_TEST;

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    phone_num: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log(formData);
    console.log("API calling starting...");
  
    axios
      .post(SignUp_api, formData)
      .then((response) => {
        // // Access headers here
        // const authToken = response.headers['authorization'];
        // console.log("Authorization Token:", authToken);
  
        // Success notification
        toast.success("Signup successful! Redirecting to Dashboard...", {
          position: "top-right",
          autoClose: 3000,
        });
  
        // Store the token if necessary
        // if (authToken) {
        //   localStorage.setItem('authToken', authToken); // Save the token in local storage
        // }
  
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error during signup:", error);
  
        // Display error message
        toast.error(error.response?.data?.message || "Something went wrong!", {
          position: "top-right",
          autoClose: 3000,
        });
      });
   
  };
  
  // useEffect(() => {
  //   const fetchTestData = async () => {
  //     try {
  //       console.log("Fetching test API data...");
  //       const response = await axios.get(test_api);
  //       console.log("Test API Data:", response.headers['content-length']);
  //     } catch (error) {
  //       console.error("Error fetching test API data:", error);
  //     }
  //   };

  //   fetchTestData();
  // }, []);

  return (
    <div className="sign-up">
      <div className="sign-up-headings">
        <p className="sign-up-headings-sub-heading1">Sign Up to</p>
        <p className="sign-up-headings-sub-heading2">Saloon Management App</p>
        <p className="sign-up-headings-sub-heading3">
          Your journey to effortless salon management begins here. <br />
          Join us and transform your business today!
        </p>
      </div>
      <div className="sign-up-form">
        <div className="sign-up-form_heading">
          <p>
            Welcome to <span>Saloon</span>
          </p>
          <p>Sign Up</p>
        </div>
        <form className="sign-up__form" onSubmit={handleSubmit}>
          <div className="sign-up__form-row">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="full_name">Name</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                placeholder="Name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="sign-up__form-row">
            <div className="form-group">
              <label htmlFor="phone_num">Contact Number</label>
              <input
                type="text"
                id="phone_num"
                name="phone_num"
                placeholder="Contact Number"
                value={formData.phone_num}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
