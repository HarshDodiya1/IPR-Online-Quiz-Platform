import React, { useState } from "react";
import { RiEyeLine as Eye, RiEyeOffLine as EyeOff } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../slices/userSlice.js";
import AuthLeftSide from "../components/AuthLeftSide.jsx";

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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (data.success) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
            <a href="/sign-up" className="text-violet-950 underline">
              Sign Up Now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
