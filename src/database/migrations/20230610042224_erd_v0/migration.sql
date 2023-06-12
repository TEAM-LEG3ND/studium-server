/*
  Warnings:

  - You are about to drop the column `duration` on the `RecruitArticle` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `RecruitArticle` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `RecruitArticle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionnaire` to the `RecruitArticle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studyId` to the `RecruitArticle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StudyStatus" AS ENUM ('RECRUITING', 'PROGRESS', 'EVALUATE', 'COMPLETE');

-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('PENDING', 'ACTIVE', 'COMPLETE');

-- CreateEnum
CREATE TYPE "MemberType" AS ENUM ('LEADER', 'MEMBER');

-- AlterTable
ALTER TABLE "RecruitArticle" DROP COLUMN "duration",
DROP COLUMN "tags",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "questionnaire" JSONB NOT NULL,
ADD COLUMN     "studyId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Study" (
    "id" SERIAL NOT NULL,
    "leaderId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "intro" TEXT NOT NULL,
    "rules" TEXT[],
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "max_ppl" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "recruit_start_date" TIMESTAMP(3) NOT NULL,
    "recruit_end_date" TIMESTAMP(3) NOT NULL,
    "status" "StudyStatus" NOT NULL DEFAULT 'RECRUITING',

    CONSTRAINT "Study_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "manners" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "studyId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "MemberStatus" NOT NULL DEFAULT 'PENDING',
    "type" "MemberType" NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplyForm" (
    "id" SERIAL NOT NULL,
    "recruitArticleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "answer" JSONB NOT NULL,

    CONSTRAINT "ApplyForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StudyToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_StudyToTag_AB_unique" ON "_StudyToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_StudyToTag_B_index" ON "_StudyToTag"("B");

-- AddForeignKey
ALTER TABLE "RecruitArticle" ADD CONSTRAINT "RecruitArticle_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecruitArticle" ADD CONSTRAINT "RecruitArticle_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplyForm" ADD CONSTRAINT "ApplyForm_recruitArticleId_fkey" FOREIGN KEY ("recruitArticleId") REFERENCES "RecruitArticle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplyForm" ADD CONSTRAINT "ApplyForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudyToTag" ADD CONSTRAINT "_StudyToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Study"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudyToTag" ADD CONSTRAINT "_StudyToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
