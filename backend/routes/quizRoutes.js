const express = require("express");
const router = express.Router();
const {
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getAllQuizzes,
} = require("../controllers/quizController.js");
const { verifyToken, verifyAdmin } = require("../middleware/verifyJWT.js");

router.use(verifyToken, verifyAdmin);
router.post("/create", createQuiz);
router.post("/update/:id", updateQuiz);
router.post("/delete/:id", deleteQuiz);
router.get("/get-all", getAllQuizzes);

module.exports = router;
