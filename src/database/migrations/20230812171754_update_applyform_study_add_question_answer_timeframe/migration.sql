/*
  Warnings:

  - You are about to drop the column `answer` on the `ApplyForm` table. All the data in the column will be lost.
  - You are about to drop the column `questionnaire` on the `Study` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ApplyForm" DROP COLUMN "answer";

-- AlterTable
ALTER TABLE "Study" DROP COLUMN "questionnaire";

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

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_applyFormId_fkey" FOREIGN KEY ("applyFormId") REFERENCES "ApplyForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeFrame" ADD CONSTRAINT "TimeFrame_applyFormId_fkey" FOREIGN KEY ("applyFormId") REFERENCES "ApplyForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
