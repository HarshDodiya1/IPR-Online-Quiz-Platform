const prisma = require("../db/db.config.js");
const excel = require('exceljs');

exports.getAnalyticsData = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quizAnalytics = await prisma.quizAnalytics.findUnique({
      where: { quizId: parseInt(quizId) },
      include: {
        quiz: {
          include: {
            quizResults: {
              include: {
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    standard: true,
                    city: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!quizAnalytics) {
      return res.status(404).json({ message: "Analytics not found for this quiz" });
    }

    const topPerformers = quizAnalytics.quiz.quizResults
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(result => ({
        name: `${result.user.firstName} ${result.user.lastName}`,
        city: result.user.city,
        std: result.user.standard.toString(),
        timeTaken: result.timeTaken,
      }));

    res.status(200).json({
      success: true,
      data: {
        totalParticipants: quizAnalytics.totalParticipants,
        completionRatio: quizAnalytics.completionRatio,
        averageScore: quizAnalytics.averageScore,
        participationByStd: quizAnalytics.participationByStd,
        participationByCity: quizAnalytics.participationByCity,
        topPerformers,
      },
    });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.exportQuizResultsToExcel = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quizResults = await prisma.quizResult.findMany({
      where: { quizId: parseInt(quizId) },
      include: {
        user: {
          select: {
            firstName: true,
            middleName: true,
            lastName: true,
            email: true,
            mobileNumber: true,
            dateOfBirth: true,
            schoolName: true,
            standard: true,
            city: true,
          },
        },
        quiz: {
          select: { title: true },
        },
      },
    });

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Quiz Results');

    worksheet.columns = [
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Mobile Number', key: 'mobileNumber', width: 15 },
      { header: 'Date of Birth', key: 'dateOfBirth', width: 15 },
      { header: 'School Name', key: 'schoolName', width: 20 },
      { header: 'Standard', key: 'standard', width: 10 },
      { header: 'City', key: 'city', width: 20 },
      { header: 'Score', key: 'score', width: 10 },
      { header: 'Correct Answers', key: 'correctAnswers', width: 15 },
      { header: 'Incorrect Answers', key: 'incorrectAnswers', width: 15 },
      { header: 'Skipped Questions', key: 'skippedQuestions', width: 15 },
      { header: 'Time Taken', key: 'timeTaken', width: 15 },
    ];

    quizResults.forEach(result => {
      worksheet.addRow({
        name: `${result.user.firstName} ${result.user.middleName} ${result.user.lastName}`,
        email: result.user.email,
        mobileNumber: result.user.mobileNumber,
        dateOfBirth: result.user.dateOfBirth,
        schoolName: result.user.schoolName,
        standard: result.user.standard,
        city: result.user.city,
        score: result.score,
        correctAnswers: result.correctAnswers,
        incorrectAnswers: result.incorrectAnswers,
        skippedQuestions: result.skippedQuestions,
        timeTaken: result.timeTaken,
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${quizResults[0].quiz.title}_results.xlsx`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error exporting quiz results:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
