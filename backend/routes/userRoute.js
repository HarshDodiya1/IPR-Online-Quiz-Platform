const express = require("express");
const { updateProfile, signout } = require("../controllers/userController.js");
const { verifyToken } = require("../middleware/verifyJWT.js");
const router = express.Router();

router.put("/update/:id", verifyToken, updateProfile);
router.post("/signout", signout)

module.exports = router;
