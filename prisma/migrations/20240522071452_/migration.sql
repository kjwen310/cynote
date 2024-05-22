/*
  Warnings:

  - Added the required column `collaboratorImage` to the `HistoryLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collaboratorName` to the `HistoryLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `HistoryLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HistoryLog" ADD COLUMN     "collaboratorImage" TEXT NOT NULL,
ADD COLUMN     "collaboratorName" TEXT NOT NULL,
ADD COLUMN     "targetId" TEXT NOT NULL;
