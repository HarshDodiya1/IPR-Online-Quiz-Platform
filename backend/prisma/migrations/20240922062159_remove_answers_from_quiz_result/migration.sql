/*
  Warnings:

  - You are about to drop the `certificates` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `completionRatio` to the `quiz_analytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participationByCity` to the `quiz_analytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participationByStd` to the `quiz_analytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeTaken` to the `quiz_results` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "certificates" DROP CONSTRAINT "certificates_quizId_fkey";

-- DropForeignKey
ALTER TABLE "certificates" DROP CONSTRAINT "certificates_userId_fkey";

-- AlterTable
ALTER TABLE "quiz_analytics" ADD COLUMN     "completionRatio" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "participationByCity" JSONB NOT NULL,
ADD COLUMN     "participationByStd" JSONB NOT NULL,
ALTER COLUMN "highestScore" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "lowestScore" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "quiz_results" ADD COLUMN     "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "timeTaken" TEXT NOT NULL,
ALTER COLUMN "score" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "certificates";
