const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


exports.createQuiz = async (req, res) => {
  try {
    const {
      title,
      startDate,
      endDate,
      categories,
      isBasic,
      imageLink,
      description,
    } = req.body;
    console.log(
      "This is the categories we get from req.body",
      req.body.categories,
    );

    if (
      !title ||
      !startDate ||
      !endDate ||
      !categories ||
      isBasic === undefined
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Categories must be a non-empty array",
      });
    }

    const createdQuiz = await prisma.quiz.create({
      data: {
        title,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        categories,
        isBasic,
        imageLink,
        description,
        adminId: parseInt(req.user.userId),
      },
    });
    const selectedQuestions = await prisma.question.findMany({
      where: {
        category: { in: categories },
        isBasic: isBasic,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    });

    await prisma.quizQuestion.createMany({
      data: selectedQuestions.map((question) => ({
        quizId: createdQuiz.id,
        questionId: question.id,
      })),
    });

    res.status(201).json({
      success: true,
      message: "Quiz created successfully",
      quiz: createdQuiz,
    });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create quiz",
      error: error.message,
    });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, startDate, endDate, imageLink, description } = req.body;

    // Validations
    if (!title && !startDate && !endDate && !imageLink && !description) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required for update",
      });
    }

    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      return res
        .status(400)
        .json({ success: false, message: "End date must be after start date" });
    }

    const updatedQuiz = await prisma.quiz.update({
      where: { id: parseInt(id) },
      data: {
        title,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        imageLink: imageLink ? imageLink : undefined,
        description: description ? description : undefined,
      },
    });

    res.status(200).json({
      success: true,
      message: "Quiz updated successfully",
      quiz: updatedQuiz,
    });
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update quiz",
      error: error.message,
    });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.quizQuestion.deleteMany({
      where: { quizId: parseInt(id) },
    });

    const deletedQuiz = await prisma.quiz.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      success: true,
      message: "Quiz deleted successfully",
      quiz: deletedQuiz,
    });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete quiz",
      error: error.message,
    });
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        admin: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        quizResults: true,
        quizAnalytics: true,
      },
    });

    // Calculate the total number of quizzes
    const totalQuizzes = quizzes.length;

    res.status(200).json({
      success: true,
      totalQuizzes, // Add the total number of quizzes in the response
      quizzes,
    });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch quizzes",
      error: error.message,
    });
  }
};

exports.getQuizQuestions = async (req, res) => {
  try {
    const { id } = req.params;

    const quizQuestions = await prisma.quizQuestion.findMany({
      where: { quizId: parseInt(id) },
      include: {
        question: {
          select: {
            id: true,
            question: true,
            correctAnswer: true,
            option1: true,
            option2: true,
            option3: true,
            imageUrl: true,
          },
        },
      },
    });

    const formattedQuestions = quizQuestions.map(({ question }) => {
      const options = [
        question.correctAnswer,
        question.option1,
        question.option2,
        question.option3,
      ];

      // Shuffle options
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }

      return {
        id: question.id,
        question: question.question,
        options: options,
        imageLink: question.imageUrl || "",
      };
    });

    // Shuffle questions
    for (let i = formattedQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [formattedQuestions[i], formattedQuestions[j]] = [
        formattedQuestions[j],
        formattedQuestions[i],
      ];
    }

    res.status(200).json({
      success: true,
      quizQuestions: formattedQuestions,
    });
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch quiz questions",
      error: error.message,
    });
  }
};
