const express = require("express");

const { verifyToken, verifyAdmin } = require("../middleware/verifyJWT");
const {
  questionUpload,
  findAllCategories,
  getAllQuestions,
  getAllLanguages,
  deleteAllQuestions,
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
router.get("/languages", verifyToken, verifyAdmin, getAllLanguages);
router.post("/get-questions", verifyToken, verifyAdmin, getAllQuestions);

router.delete("/delete-all", verifyToken, verifyAdmin, deleteAllQuestions);

module.exports = router;
