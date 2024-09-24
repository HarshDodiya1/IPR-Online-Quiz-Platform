/*
  Warnings:

  - You are about to drop the column `attemptedQuizzes` on the `users` table. All the data in the column will be lost.
  - The `totalQuizzesTaken` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "attemptedQuizzes",
DROP COLUMN "totalQuizzesTaken",
ADD COLUMN     "totalQuizzesTaken" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
