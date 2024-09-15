const prisma = require("../db/db.config.js");

exports.updateProfile = async (req, res) => {
  try {
    if (req.user.userId !== req.params.id) {
      return res.status(403).json({
        status: false,
        message: "You are not authorized to update this profile",
      });
    }

    console.log("req.body", req.body);
  } catch (error) {
    console.log("Error while updating the profile: ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.signout = (req, res, next) => {
  try {
    res.clearCookie("Bearer").status(200).json("User has been signed out");
  } catch (error) {
    console.log("Error while signout.: ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
