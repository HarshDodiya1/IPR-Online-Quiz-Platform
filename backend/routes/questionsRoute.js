const express = require("express");

const { verifyToken, verifyAdmin } = require("../middleware/verifyJWT");
const {
  questionUpload,
  findAllCategories,
  getAllQuestions,
} = require("../controllers/questionController.js");
const { multerUpload } = require("../middleware/multerUpload.js");

const router = express.Router();

// Route for file upload
router.post(
  "/upload-excel",
  verifyToken,
  verifyAdmin,
  multerUpload,
  questionUpload,
);

router.get("/category", verifyToken, verifyAdmin, findAllCategories);
router.post("/get-questions", verifyToken, verifyAdmin, getAllQuestions);

module.exports = router;
