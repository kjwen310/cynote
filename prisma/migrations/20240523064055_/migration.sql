/*
  Warnings:

  - You are about to drop the column `isDark` on the `User` table. All the data in the column will be lost.
  - The required column `inviteCode` was added to the `Workspace` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isDark";

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "inviteCode" TEXT NOT NULL;
