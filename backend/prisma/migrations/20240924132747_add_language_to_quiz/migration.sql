/*
  Warnings:

  - Added the required column `language` to the `quizzes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quizzes" ADD COLUMN     "language" TEXT NOT NULL;
