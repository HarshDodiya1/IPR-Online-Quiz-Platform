import React, { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import AuthLeftSide from "../components/AuthLeftSide.jsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = ({ Logo, myImage }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
    dateOfBirth: "",
    schoolName: "",
    standard: "",
    city: "",
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "standard" ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage(null);

      if (Object.values(formData).some((field) => field === "")) {
        setErrorMessage("Please fill in all the fields.");
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setErrorMessage("Please enter a valid email address.");
        setLoading(false);
        return;
      }

      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(formData.mobileNumber)) {
        setErrorMessage("Please enter a valid mobile number (10 digits).");
        setLoading(false);
        return;
      }

      if (formData.password.length < 8) {
        setErrorMessage("Password must be at least 8 characters long.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;

      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AuthLeftSide Logo={Logo} myImage={myImage} />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white px-8 py-8 rounded-2xl shadow-md border-2 border-gray-100 w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-center mb-6">
            Let's Register Account
          </h1>
          {errorMessage && (
            <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full p-3 border border-gray-300 rounded"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="middleName"
                placeholder="Middle Name"
                className="w-full p-3 border border-gray-300 rounded"
                value={formData.middleName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full p-3 border border-gray-300 rounded"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded"
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="mobileNumber"
                placeholder="Mobile Number"
                className="w-full p-3 border border-gray-300 rounded"
                value={formData.mobileNumber}
                onChange={handleInputChange}
              />
              <input
                type="date"
                name="dateOfBirth"
                className="w-full p-3 border border-gray-300 rounded"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="schoolName"
                placeholder="School Name"
                className="w-full p-3 border border-gray-300 rounded"
                value={formData.schoolName}
                onChange={handleInputChange}
              />
              <select
                name="standard"
                className="w-full p-3 border border-gray-300 rounded"
                value={formData.standard}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select Standard
                </option>
                {[...Array(8)].map((_, index) => (
                  <option key={index + 5} value={index + 5}>
                    {index + 5}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full p-3 border border-gray-300 rounded"
              value={formData.city}
              onChange={handleInputChange}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded pr-10"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <RiEyeOffLine size={20} />
                ) : (
                  <RiEyeLine size={20} />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-violet-600 text-white text-lg font-bold transition-all hover:bg-violet-700 active:scale-[.98] disabled:bg-violet-400"
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </form>

          <div className="flex items-center justify-center mt-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-500">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <p className="text-center mt-4">
            Already have an account?
            <Link
              to="/login"
              className="font-medium text-violet-950 ml-2 underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
