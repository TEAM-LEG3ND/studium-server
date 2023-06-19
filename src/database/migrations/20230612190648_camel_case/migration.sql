/*
  Warnings:

  - You are about to drop the column `end_date` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `recruit_end_date` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `recruit_start_date` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Study` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recruitEndDate` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recruitStartDate` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Study` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Study" DROP COLUMN "end_date",
DROP COLUMN "recruit_end_date",
DROP COLUMN "recruit_start_date",
DROP COLUMN "start_date",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "recruitEndDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "recruitStartDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
