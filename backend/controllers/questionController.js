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
    console.log("this is the path of the file : ", path);

    // Read the Excel file and convert to JSON
    const workbook = XLSX.readFile(path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Ensure all fields are strings where necessary
    const formattedData = sheetData.map((row) => ({
      Question: row.Question.toString(),
      ImageLink: row.ImageLink ? row.ImageLink.toString() : null,
      CorrectAns: row.CorrectAns.toString(),
      Option1: row.Option1.toString(),
      Option2: row.Option2.toString(),
      Option3: row.Option3.toString(),
      Category: row.Category.toString(),
      IsBasic: Boolean(row.IsBasic),
    }));

    // Fetch all existing questions from the DB
    const existingQuestions = await prisma.question.findMany();

    // Check for duplicates
    for (const data of formattedData) {
      const duplicate = existingQuestions.some((question) => {
        return (
          question.Question === data.Question &&
          question.Correct_answer === data.CorrectAns &&
          question.Option1 === data.Option1 &&
          question.Option2 === data.Option2 &&
          question.Option3 === data.Option3 &&
          question.Category === data.Category &&
          question.Is_basic === data.IsBasic &&
          question.Image_url === data.ImageLink
        );
      });

      if (duplicate) {
        // Throw error if a duplicate is found
        return res.status(400).json({
          error: `Duplicate question found: ${data.Question}. Upload aborted.`,
        });
      }
    }

    // If no duplicates, insert the new data
    const insertedQuestions = await prisma.question.createMany({
      data: formattedData.map((data) => ({
        Question: data.Question,
        Correct_answer: data.CorrectAns,
        Option1: data.Option1,
        Option2: data.Option2,
        Option3: data.Option3,
        Category: data.Category,
        Is_basic: data.IsBasic,
        Image_url: data.ImageLink,
      })),
    });

    res.status(200).json({
      message: "Excel data uploaded and stored successfully",
      insertedQuestions,
    });
  } catch (error) {
    console.log("Error while uploading the excel file : ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    // Clean up the uploaded file
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.findAllCategories = async (req, res) => {
  try {
    const categories = await prisma.question.findMany({
      select: {
        Category: true,
      },
      distinct: ["Category"],
    });

    res.status(200).json({
      success: true,
      categories: categories.map((cat) => cat.Category),
    });
  } catch (error) {
    console.log("Error while fetching categories: ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
