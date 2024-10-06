const XLSX = require("xlsx");
const fs = require("fs");
const prisma = require("../db/db.config.js");

exports.questionUpload = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized (admin) to upload the questions",
      });
    }

    const { path } = req.file;

    const workbook = XLSX.readFile(path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const formattedData = sheetData.map((row) => ({
      question: row.Question?.toString() || "",
      imageUrl: row.ImageLink?.toString() || null,
      correctAnswer: row.CorrectAns?.toString() || "",
      option1: row.Option1?.toString() || "",
      option2: row.Option2?.toString() || "",
      option3: row.Option3?.toString() || "",
      category: row.Category?.toString() || "",
      language: row.Language?.toString() || "",
      isBasic: Boolean(row.IsBasic),
    }));

    const existingQuestions = await prisma.question.findMany();

    const duplicates = [];
    const uniqueData = formattedData.filter((data) => {
      const isDuplicate = existingQuestions.some(
        (q) =>
          q.question === data.question &&
          q.correctAnswer === data.correctAnswer &&
          q.option1 === data.option1 &&
          q.option2 === data.option2 &&
          q.option3 === data.option3 &&
          q.category === data.category &&
          q.langauge === data.langauge &&
          q.isBasic === data.isBasic,
      );

      if (isDuplicate) {
        duplicates.push(data.question);
        return false;
      }
      return true;
    });

    if (uniqueData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "All questions are duplicates. No new data to upload.",
        duplicates: duplicates,
      });
    }

    const insertedQuestions = await prisma.question.createMany({
      data: uniqueData,
    });

    res.status(200).json({
      success: true,
      message: "Excel data uploaded and stored successfully",
      insertedCount: insertedQuestions.count,
      duplicatesCount: duplicates.length,
      duplicates: duplicates,
    });
  } catch (error) {
    console.log("Error while uploading the excel file:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.findAllCategories = async (req, res) => {
  try {
    const categories = await prisma.question.findMany({
      select: {
        category: true,
      },
      distinct: ["category"],
    });

    res.status(200).json({
      success: true,
      categories: categories.map((cat) => cat.category),
    });
  } catch (error) {
    console.log("Error while fetching categories: ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllLanguages = async (req, res) => {
  try {
    const languages = await prisma.question.findMany({
      select: {
        language: true,
      },
      distinct: ["language"],
    });

    const languageList = languages.map((lang) => lang.language);

    res.status(200).json({
      success: true,
      languages: languageList,
    });
  } catch (error) {
    console.error("Error fetching languages:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch languages",
      error: error.message,
    });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const { selectedTags, totalQuestions } = req.body;

    if (
      !selectedTags ||
      !Array.isArray(selectedTags) ||
      selectedTags.length === 0
    ) {
      return res.status(400).json({ error: "Selected tags are required" });
    }

    try {
      const questionsPerTag = Math.floor(totalQuestions / selectedTags.length);
      let remainingQuestions = totalQuestions % selectedTags.length;

      let allQuestions = [];

      for (const tag of selectedTags) {
        const tagQuestions = await prisma.question.findMany({
          where: {
            Category: tag,
          },
          take: questionsPerTag + (remainingQuestions > 0 ? 1 : 0),
          orderBy: {
            id: "asc",
          },
        });

        allQuestions = [...allQuestions, ...tagQuestions];

        if (remainingQuestions > 0) {
          remainingQuestions--;
        }
      }

      // Shuffle the questions
      allQuestions.sort(() => Math.random() - 0.5);

      res.json(allQuestions);
    } catch (error) {
      res.status(500).json({ error: "Error fetching random questions" });
    }
  } catch (error) {
    console.log("Error while fetching questions: ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAllQuestions = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized (admin) to delete all questions",
      });
    }

    // Delete all QuizQuestion records first
    await prisma.quizQuestion.deleteMany();

    // Then delete all Question records
    await prisma.question.deleteMany();

    res.status(200).json({
      success: true,
      message:
        "All questions and related quiz questions have been deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting all questions:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
