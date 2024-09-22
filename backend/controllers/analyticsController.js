const prisma = require("../db/db.config.js");

exports.getAnalyticsData = async (req, res) => {
  try {
    const totalParticipants = await prisma.user.count({
      where: { isAdmin: false },
    });
    const quizzes = await prisma.quiz.findMany({
      include: { quizResults: true },
    });
    const quizResults = await prisma.quizResult.findMany({
      include: { user: true, quiz: true },
    });

    const completionRatio =
      quizResults.length / (totalParticipants * quizzes.length);
    const averageScore =
      quizResults.reduce((sum, result) => sum + result.score, 0) /
      quizResults.length;

    const quizzesByCategory = await prisma.quiz.groupBy({
      by: ["categories"],
      _count: true,
    });

    const participationTrend = await prisma.quizResult.groupBy({
      by: ['createdAt'],
      _count: true
    });

   

    const regionWiseParticipation = await prisma.user.groupBy({
      by: ["city"],
      _count: true,
      where: { isAdmin: false },
    });

    const participationByStd = await prisma.user.groupBy({
      by: ["standard"],
      _count: true,
      where: { isAdmin: false },
    });

    const topPerformers = await prisma.quizResult.findMany({
      take: 5,
      orderBy: { score: "desc" },
      include: { user: true },
    });

    const analyticsData = {
      totalParticipants,
      completionRatio,
      averageScore,
      quizzesByCategory: Object.fromEntries(
        quizzesByCategory.map((q) => [q.categories[0], q._count]),
      ),
      participationTrend: Object.fromEntries(
        participationTrend.reduce((p) => [
          p.createdAt.toISOString().split("T")[0],
          p._count,
        ]),
      ),
      regionWiseParticipation: Object.fromEntries(
        regionWiseParticipation.map((r) => [r.city, r._count]),
      ),
      participationByCity: Object.fromEntries(
        regionWiseParticipation.map((r) => [r.city, r._count]),
      ),
      participationByStd: Object.fromEntries(
        participationByStd.map((s) => [s.standard.toString(), s._count]),
      ),
      topPerformers: topPerformers.map((p) => ({
        name: `${p.user.firstName} ${p.user.lastName}`,
        score: p.score,
      })),
    };

    res.status(200).json({
      success: true,
      data: analyticsData,
    });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics data",
      error: error.message,
    });
  }
};
