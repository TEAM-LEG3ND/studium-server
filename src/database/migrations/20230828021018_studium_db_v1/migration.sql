/*
  Warnings:

  - You are about to drop the column `answer` on the `ApplyForm` table. All the data in the column will be lost.
  - You are about to drop the column `questionnaire` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `recruiting` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `studyTemplate` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Study` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[universalAccountId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nickname]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locationDetail` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `templateContent` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `location` on the `Study` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `nickname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Location" AS ENUM ('ONLINE', 'OFFLINE');

-- AlterTable
ALTER TABLE "ApplyForm" DROP COLUMN "answer";

-- AlterTable
ALTER TABLE "Study" DROP COLUMN "questionnaire",
DROP COLUMN "recruiting",
DROP COLUMN "studyTemplate",
DROP COLUMN "title",
ADD COLUMN     "locationDetail" TEXT NOT NULL,
ADD COLUMN     "templateContent" TEXT NOT NULL,
ADD COLUMN     "total" INTEGER NOT NULL,
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "location",
ADD COLUMN     "location" "Location" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nickname" TEXT NOT NULL,
ALTER COLUMN "universalAccountId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "studyId" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    "applyFormId" INTEGER NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeFrame" (
    "id" SERIAL NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "applyFormId" INTEGER NOT NULL,

    CONSTRAINT "TimeFrame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notice" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "studyId" INTEGER NOT NULL,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "studyId" INTEGER NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_universalAccountId_key" ON "User"("universalAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_applyFormId_fkey" FOREIGN KEY ("applyFormId") REFERENCES "ApplyForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeFrame" ADD CONSTRAINT "TimeFrame_applyFormId_fkey" FOREIGN KEY ("applyFormId") REFERENCES "ApplyForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
