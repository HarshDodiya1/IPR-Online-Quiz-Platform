import React, { useState } from "react";
import { RiEyeLine as Eye, RiEyeOffLine as EyeOff } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../slices/userSlice.js";
// import AuthLeftSide from "../components/AuthLeftSide.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value.trim() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const response = await axios.post("/api/auth/login", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Login response:", response.data);
      const { token, ...userData } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        console.log(
          "Token saved in localStorage:",
          localStorage.getItem("token")
        );
        dispatch(signInSuccess(userData));
        navigate("/");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("Login error:", error);
      dispatch(
        signInFailure(
          error.response?.data?.message || "An error occurred during login"
        )
      );
    }
  };

  return (
    <div className="flex ">
      <AuthLeftSide />
      <div className="bg-white p-8 rounded-2xl shadow-md border-2 border-gray-100 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">
          Let's Sign you in
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Welcome back! You've been missed
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              className="w-full border-2 rounded-xl p-3 border-gray-200"
              placeholder="abc@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full border-2 rounded-xl p-3 pr-10 border-gray-200"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="flex justify-between items-center gap-5">
            Didn't remember your password?
            <Link to="/forgot-password" className="text-red-800">
              <span className="underline">Reset it here</span>
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-violet-600 text-white font-bold transition-all hover:bg-violet-700 active:scale-[.98]"
            disabled={loading}
          >
            {loading ? "Loading..." : "Log in"}
          </button>
        </form>
        {errorMessage && (
          <div className="mt-4 text-red-500 text-center">{errorMessage}</div>
        )}
        <div className="mt-6 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-red-800">
              <span className="underline">Sign up now</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
