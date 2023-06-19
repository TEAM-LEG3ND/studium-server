/*
  Warnings:

  - You are about to drop the column `description` on the `RecruitArticle` table. All the data in the column will be lost.
  - Added the required column `content` to the `RecruitArticle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecruitArticle" DROP COLUMN "description",
ADD COLUMN     "content" TEXT NOT NULL;
