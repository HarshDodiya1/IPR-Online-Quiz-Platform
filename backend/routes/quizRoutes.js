const express = require("express");
const router = express.Router();

const {
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getAllQuizzes,
  getQuizQuestions,
  submitQuiz,
} = require("../controllers/quizController.js");
const { verifyToken, verifyAdmin } = require("../middleware/verifyJWT.js");
const {
  generateAndEmailCertificate,
} = require("../controllers/certificateController.js");


router.get("/get-all", getAllQuizzes);
router.get("/get-quiz-questions/:id", verifyToken, getQuizQuestions);
router.post("/submit", verifyToken, submitQuiz);
router.post("/generate-certificate", verifyToken, generateAndEmailCertificate);

router.use(verifyToken, verifyAdmin);

router.post("/create", createQuiz);
router.post("/update/:id", updateQuiz);
router.post("/delete/:id", deleteQuiz);

module.exports = router;
