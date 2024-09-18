const express = require("express");
const router = express.Router();
const {
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getAllQuizzes,
} = require("../controllers/quizController.js");
const { verifyToken, verifyAdmin } = require("../middleware/verifyJWT.js");

router.post("/create", verifyToken, verifyAdmin, createQuiz);
router.post("/update/:id", verifyToken, verifyAdmin, updateQuiz);
router.post("/delete/:id", verifyToken, verifyAdmin, deleteQuiz);
router.get("/get-all", getAllQuizzes);

module.exports = router;
