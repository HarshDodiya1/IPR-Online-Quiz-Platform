const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.verifyToken = (req, res, next) => {
  // Get the token from the cookies
  const token = req.cookies.Bearer;
  console.log("This is the token:", token);

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "No token provided. Unauthorized.",
    });
  }

  try {
    // Verify the token
    const secret = config.jwtSecret;
    const verified = jwt.verify(token, secret);

    if (!verified) {
      return res.status(401).json({
        success: false,
        message: "Token verification failed. Unauthorized.",
      });
    }

    // Store the decoded user information in req.user
    req.user = verified;
    console.log("Now req.user is:", req.user);

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error verifying token. Unauthorized.",
    });
  }
};

exports.verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to access this resource (Admin only).",
    });
  }
  console.log("Admin verified");

  next();
};
