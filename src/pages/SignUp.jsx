import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/SignUp.css";
import CryptoJS from "crypto-js"; // Importing crypto-js

const SignUp_api = import.meta.env.VITE_API_URL_SIGNUP;

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    phone_num: "",
    address: "",
    vet_info: {
      full_name: "",
      phone_num: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const keys = name.split(".");
      if (keys.length > 1) {
        return {
          ...prevData,
          [keys[0]]: {
            ...prevData[keys[0]],
            [keys[1]]: value,
          },
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hashedPassword = CryptoJS.SHA256(formData.password).toString();
    const dataToSend = {
      full_name: formData.full_name,
    email: formData.email,
    phone_num: formData.phone_num,
    address: formData.address,
    vet_info: {
      full_name: formData.vet_info.full_name,
      phone_num: formData.vet_info.phone_num,
    },
      password: hashedPassword,   
    };
    axios
      .post(SignUp_api, dataToSend)
      .then(() => {
        toast.success("Signup successful! Redirecting to Dashboard...", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/overview");
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong!", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="sign-up">
      <div className="sign-up-headings">
        <p className="sign-up-headings-sub-heading1">Sign Up to</p>
        <p className="sign-up-headings-sub-heading2">VetCare +</p>
        <p className="sign-up-headings-sub-heading3">
        Step into the VETcare world and give your pet the <br />care they deserve, every single day
        </p>
      </div>
      <div className="sign-up-form">
        <div className="sign-up-form_heading">
          <p>
            Welcome to <span>VetCare +</span>
          </p>
          <p>Sign Up</p>
        </div>
        <form className="sign-up__form" onSubmit={handleSubmit}>
          <div className="sign-up__form-row">
            <div className="form-group">
              <label htmlFor="full_name">Full Name</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="sign-up__form-row">
            <div className="form-group">
              <label htmlFor="phone_num">Phone Number</label>
              <input
                type="text"
                id="phone_num"
                name="phone_num"
                placeholder="Phone Number"
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

          <div className="sign-up__form-row">
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="sign-up__form-row">
            <div className="form-group">
              <label htmlFor="vet_info.full_name">Doctor's Full Name</label>
              <input
                type="text"
                id="vet_info.full_name"
                name="vet_info.full_name"
                placeholder="Vet's Full Name"
                value={formData.vet_info.full_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="vet_info.phone_num">Doctor's Phone Number</label>
              <input
                type="text"
                id="vet_info.phone_num"
                name="vet_info.phone_num"
                placeholder="Vet's Phone Number"
                value={formData.vet_info.phone_num}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
