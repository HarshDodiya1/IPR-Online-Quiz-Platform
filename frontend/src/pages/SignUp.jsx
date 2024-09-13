import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    school: "",
    standard: "",
    forgotPasswordHint: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.school ||
      !formData.standard ||
      !formData.forgotPasswordHint
    ) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    // If all validations pass, you can submit the form
    console.log("Form submitted:", formData);
    // Here you would typically send the form data to your API for registration

    // After successful registration, redirect to the login page
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="bg-white px-8 py-8 rounded-2xl drop-shadow-md border-2 border-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">
        Let's Register <br /> Account
      </h1>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <form className="space-y-4" onSubmit={handleSubmit}>
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
          name="forgotPasswordHint"
          placeholder="Hint for Forgot Password"
          className="w-full p-3 border border-gray-300 rounded"
          value={formData.forgotPasswordHint}
          onChange={handleInputChange}
        />
        <select
          name="school"
          className="w-full p-3 border border-gray-300 rounded"
          value={formData.school}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Select School Name
          </option>
          <option value="School A">School A</option>
          <option value="School B">School B</option>
          <option value="School C">School C</option>
        </select>
        <input
          type="text"
          name="standard"
          placeholder="Standard"
          className="w-full p-3 border border-gray-300 rounded"
          value={formData.standard}
          onChange={handleInputChange}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          type="submit"
          className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all w-full py-3 rounded-xl bg-log-violet text-white text-lg font-bold"
        >
          Register
        </button>
      </form>

      <div className="flex items-center justify-center mt-4">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="mx-2 text-gray-500">or</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      <p className="ml-2 font-medium text-base pt-3">
        Already have an account?
        <Link
          to={"/login"}
          className="font-medium text-base text-violet-950 ml-4 underline underline-offset-1"
        >
          Login
        </Link>
      </p>
    </div>
  );
};
export default SignUp;
