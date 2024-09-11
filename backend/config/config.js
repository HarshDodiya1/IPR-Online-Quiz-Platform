require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  cors_origin: process.env.CORS_ORIGIN,
  dbURL: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
};
