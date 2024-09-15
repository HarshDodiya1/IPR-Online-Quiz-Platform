const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const prisma = require("../db/db.config.js");

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
exports.studentSignup = async (req, res) => {
  try {
    // Extracting the signup data from the request body
    const {
      firstName,
      middleName,
      lastName,
      email,
      password,
      mobileNumber,
      dateOfBirth,
      standard,
      schoolName,
      city,
    } = req.body;

    //Validate the required fields
    if (
      !firstName ||
      !lastName ||
      !middleName ||
      !email ||
      !password ||
      !mobileNumber ||
      !dateOfBirth ||
      !standard ||
      !schoolName ||
      !city
    ) {
      return res.status(400).json({
        success: false,
        message: "Some fields are missing in the request body for signup",
      });
    }

    //Validate the email
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format for signup",
      });
    }

    // check if the email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        firstName,
        middleName,
        lastName,
        email,
        password: hashedPassword,
        mobileNumber,
        dateOfBirth,
        standard,
        schoolName,
        city,
      },
    });

    return res.status(200).json({
      success: true,
      newUser,
      message: "User created successfully.",
    });
  } catch (error) {
    console.log("Error while signing up student: ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validate the required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Some fields are missing in the request body for login",
      });
    }

    //Validate the email
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format for login",
      });
    }

    // check if the user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User with this email does not exist, Please create a new account.",
      });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate the JWT token
    const token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        name: existingUser.firstName + " " + existingUser.lastName,
        role: existingUser.isAdmin ? "admin" : "student",
      },
      config.jwtSecret,
      // { expiresIn: "24h" },
    );

    // Remove the hashed password from the user object
    delete existingUser.password;

    // Send the token as a cookie and corresponding user details
    res
      .cookie("Bearer", token, {
        httpOnly: true, // Prevent access by client-side JavaScript
        sameSite: "strict", // Prevent cross-site request forgery (CSRF)
      })
      .status(200)
      .json({
        message:
          "LoggedIn Successfully. Here's the Cookie Token and Existing User :)",
        success: true,
        token,
        user: existingUser,
      });
  } catch (error) {
    console.log("Error while logging in student: ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
