const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.verifyToken = (req, res, next) => {
  let token;

  // Check for token in cookies
  if (req.cookies.Bearer) {
    token = req.cookies.Bearer;
  }

  // If not in cookies, check Authorization header
  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  console.log("Token received:", token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided. Unauthorized.",
    });
  }

  try {
    const secret = config.jwtSecret;
    const verified = jwt.verify(token, secret);

    console.log("Decoded token:", verified);

    if (!verified) {
      return res.status(401).json({
        success: false,
        message: "Token verification failed. Unauthorized.",
      });
    }

    req.user = verified;
    console.log("User verified:", req.user);

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({
      success: false,
      message: "Error verifying token. Unauthorized.",
      error: error.message,
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
