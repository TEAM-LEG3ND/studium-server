/*
  Warnings:

  - You are about to drop the column `recruitArticleId` on the `ApplyForm` table. All the data in the column will be lost.
  - You are about to drop the `RecruitArticle` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `studyId` to the `ApplyForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionnaire` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recruited` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recruiting` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studyTemplate` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intro` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileURL` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ApplyForm" DROP CONSTRAINT "ApplyForm_recruitArticleId_fkey";

-- DropForeignKey
ALTER TABLE "RecruitArticle" DROP CONSTRAINT "RecruitArticle_authorId_fkey";

-- DropForeignKey
ALTER TABLE "RecruitArticle" DROP CONSTRAINT "RecruitArticle_studyId_fkey";

-- AlterTable
ALTER TABLE "ApplyForm" DROP COLUMN "recruitArticleId",
ADD COLUMN     "studyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Study" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "questionnaire" JSONB NOT NULL,
ADD COLUMN     "recruited" INTEGER NOT NULL,
ADD COLUMN     "recruiting" INTEGER NOT NULL,
ADD COLUMN     "studyTemplate" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "intro" TEXT NOT NULL,
ADD COLUMN     "profileURL" TEXT NOT NULL;

-- DropTable
DROP TABLE "RecruitArticle";

-- AddForeignKey
ALTER TABLE "ApplyForm" ADD CONSTRAINT "ApplyForm_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
