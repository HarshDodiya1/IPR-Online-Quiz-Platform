const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("./config/config.js");

const app = express();

dotenv.config();
app.use(
  cors({
    origin: config.cors_origin,
    credentials: true,
  }),
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Imported Routes
const authRoutes = require("./routes/authRoute.js");
const questionRoutes = require("./routes/questionsRoute.js");
const userRoutes = require("./routes/userRoute.js");
const quizRoutes = require("./routes/quizRoutes.js");
const analyticsRoutes = require("./routes/analyticsRoute.js");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/user", userRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/analytics", analyticsRoutes);

app.listen(config.port, () => {
  console.log(`⚙️ Server is running at port : ${config.port}`);
});
