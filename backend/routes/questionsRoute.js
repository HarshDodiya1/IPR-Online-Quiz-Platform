const express = require("express");
const multer = require("multer");
const { verifyToken, verifyAdmin } = require("../middleware/verifyJWT");
const {
  questionUpload,
  findAllCategories,
  getAllQuestions,
} = require("../controllers/questionController.js");

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Only accept Excel files
  if (
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype === "application/vnd.ms-excel"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only Excel files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Route for file upload
router.post(
  "/upload-excel",
  verifyToken,
  verifyAdmin,
  (req, res, next) => {
    // Handle Multer errors
    upload.single("file")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res
          .status(400)
          .json({ message: "File upload error", error: err.message });
      } else if (err) {
        // An unknown error occurred when uploading.
        return res.status(400).json({ message: err.message });
      }
      // Everything went fine.
      next();
    });
  },
  questionUpload,
);

router.get("/category", verifyToken, verifyAdmin, findAllCategories);
router.post("/get-questions", verifyToken, verifyAdmin, getAllQuestions);

module.exports = router;
