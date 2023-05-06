-- CreateTable
CREATE TABLE "RecruitArticle" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "recruiting" INTEGER NOT NULL,
    "recruited" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "RecruitArticle_pkey" PRIMARY KEY ("id")
);
