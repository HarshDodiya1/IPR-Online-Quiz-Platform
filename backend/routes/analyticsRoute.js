const express = require("express");
const { getAnalyticsData, exportQuizResultsToExcel } = require("../controllers/analyticsController");
const { verifyToken, verifyAdmin } = require("../middleware/verifyJWT");

const router = express.Router();

router.get("/dashboard/:quizId", verifyToken, verifyAdmin, getAnalyticsData);
router.get("/export/:quizId", verifyToken, verifyAdmin, exportQuizResultsToExcel);

module.exports = router;
