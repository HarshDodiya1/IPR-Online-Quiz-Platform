const express = require("express");
const { getAnalyticsData } = require("../controllers/analyticsController");
const { verifyToken, verifyAdmin } = require("../middleware/verifyJWT");

const router = express.Router();

router.get("/dashboard", verifyToken, verifyAdmin, getAnalyticsData);

module.exports = router;
