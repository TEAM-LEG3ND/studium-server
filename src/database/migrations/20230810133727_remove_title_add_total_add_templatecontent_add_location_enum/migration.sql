/*
  Warnings:

  - You are about to drop the column `recruiting` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `studyTemplate` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Study` table. All the data in the column will be lost.
  - Added the required column `locationDetail` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `templateContent` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `location` on the `Study` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Location" AS ENUM ('ONLINE', 'OFFLINE');

-- AlterTable
ALTER TABLE "Study" DROP COLUMN "recruiting",
DROP COLUMN "studyTemplate",
DROP COLUMN "title",
ADD COLUMN     "locationDetail" TEXT NOT NULL,
ADD COLUMN     "templateContent" TEXT NOT NULL,
ADD COLUMN     "total" INTEGER NOT NULL,
DROP COLUMN "location",
ADD COLUMN     "location" "Location" NOT NULL;
