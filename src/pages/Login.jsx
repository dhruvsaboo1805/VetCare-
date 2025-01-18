import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/Login.css";

const Login_api = import.meta.env.VITE_API_URL_LOGIN;

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(Login_api, formData);

      if (response.status === 200) {
        const token = response.data.token;
        // console.log(token);
        localStorage.setItem("authToken", token); 

        if (response.status === 200 || response.status === 201) {
          toast.success("Login successful! Redirecting to home...", {
            position: "top-right",
            autoClose: 3000,
          });

          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } else {
          throw new Error("Authorization failed");
        }
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/SignUp");
  };

  return (
    <div className="sign-in">
      <div className="sign-in-headings">
        <p className="sign-in-headings-sub-heading1">Sign In to</p>
        <p className="sign-in-headings-sub-heading2">Salon Management App</p>
        <p className="sign-in-headings-sub-heading3">
          Your journey to effortless salon management begins here. <br />
          Join us and transform your business today!
        </p>
      </div>
      <div className="sign-in-form">
        <div className="sign-in-form_heading">
          <p>
            Welcome to <span>Salon</span>
          </p>
          <p>Sign In</p>
        </div>
        <form className="sign-in__form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username or email address</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username or email address"
            value={formData.username}
            onChange={handleChange}
            required
          />
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
          <div className="sign-in__form__forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit">Sign in</button>
        </form>

        <div className="sign-in__signup-link">
          <p>
            Don't have an account?{" "}
            <span onClick={handleSignUpRedirect} className="signup-link">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
