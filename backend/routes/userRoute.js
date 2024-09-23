const express = require("express");
const { updateProfile, signout, getPastQuizzes } = require("../controllers/userController.js");
const { verifyToken } = require("../middleware/verifyJWT.js");
const router = express.Router();

router.put("/update/:id", verifyToken, updateProfile);
router.post("/signout", signout);
router.get("/past-quizzes", verifyToken, getPastQuizzes);

module.exports = router;
