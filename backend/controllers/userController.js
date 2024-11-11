const prisma = require("../db/db.config.js");
const bcrypt = require("bcrypt");
const excel = require("exceljs");

exports.updateProfile = async (req, res) => {
  try {
    if (req.user.userId !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this profile",
      });
    }

    const updateData = {};
    const fields = [
      "firstName",
      "middleName",
      "lastName",
      "mobileNumber",
      "dateOfBirth",
      "schoolName",
      "standard",
      "city",
      "password",
    ];

    for (const field of fields) {
      if (req.body[field] !== undefined && req.body[field] !== "") {
        if (field === "dateOfBirth") {
          const dobDate = new Date(req.body[field]);
          if (!isNaN(dobDate.getTime())) {
            updateData[field] = dobDate;
          }
        } else if (field === "standard") {
          updateData[field] = parseInt(req.body[field]);
        } else if (field === "mobileNumber") {
          const mobileRegex = /^[0-9]{10}$/;
          if (mobileRegex.test(req.body[field])) {
            updateData[field] = req.body[field];
          }
        } else if (field === "password") {
          if (req.body[field].length >= 6) {
            updateData[field] = await bcrypt.hash(req.body[field], 10);
          } else {
            return res.status(400).json({
              success: false,
              message: "Password must be at least 6 characters long",
            });
          }
        } else {
          updateData[field] = req.body[field];
        }
      }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields to update",
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: updateData,
    });

    delete updatedUser.password;

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
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

exports.getPastQuizzes = async (req, res) => {
  try {
    const { userId } = req.body;

    const pastQuizzes = await prisma.quizResult.findMany({
      where: { userId: userId },
      include: {
        quiz: {
          select: {
            title: true,
            categories: true,
          },
        },
      },
      orderBy: {
        submittedAt: "desc",
      },
    });

    const formattedQuizzes = pastQuizzes.map((result) => ({
      id: result.id,
      quizName: result.quiz.title,
      categories: result.quiz.categories,
      percentage: result.score,
      totalQuestions: result.totalQuestions,
      submittedAt: result.submittedAt,
      timeTaken: result.timeTaken,
    }));

    res.status(200).json({
      success: true,
      pastQuizzes: formattedQuizzes,
    });
  } catch (error) {
    console.log("Error while getting past quizzes: ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        email: true,
        mobileNumber: true,
        dateOfBirth: true,
        schoolName: true,
        standard: true,
        city: true,
        totalQuizzesTaken: true,
      },
    });

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Users Data");

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Mobile Number", key: "mobileNumber", width: 15 },
      { header: "Date of Birth", key: "dateOfBirth", width: 15 },
      { header: "School Name", key: "schoolName", width: 30 },
      { header: "Standard", key: "standard", width: 10 },
      { header: "City", key: "city", width: 20 },
      { header: "Total Quizzes Taken", key: "totalQuizzesTaken", width: 20 },
    ];

    users.forEach((user) => {
      worksheet.addRow({
        id: user.id,
        name: `${user.firstName} ${user.middleName || ""} ${user.lastName}`.trim(),
        email: user.email,
        mobileNumber: user.mobileNumber,
        dateOfBirth: user.dateOfBirth.toLocaleDateString(),
        schoolName: user.schoolName,
        standard: user.standard,
        city: user.city,
        totalQuizzesTaken: user.totalQuizzesTaken,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=users_data.xlsx",
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.log("Error while getting all users: ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
