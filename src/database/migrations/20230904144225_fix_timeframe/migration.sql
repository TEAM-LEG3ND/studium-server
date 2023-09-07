/*
  Warnings:

  - You are about to drop the column `end` on the `TimeFrame` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `TimeFrame` table. All the data in the column will be lost.
  - Added the required column `day` to the `TimeFrame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endtime` to the `TimeFrame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starttime` to the `TimeFrame` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Days" AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');

-- AlterTable
ALTER TABLE "TimeFrame" DROP COLUMN "end",
DROP COLUMN "start",
ADD COLUMN     "day" "Days" NOT NULL,
ADD COLUMN     "endtime" TEXT NOT NULL,
ADD COLUMN     "starttime" TEXT NOT NULL;
