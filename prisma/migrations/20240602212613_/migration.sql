/*
  Warnings:

  - Added the required column `imageId` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageLgUrl` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageSmUrl` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "imageId" TEXT NOT NULL,
ADD COLUMN     "imageLgUrl" TEXT NOT NULL,
ADD COLUMN     "imageSmUrl" TEXT NOT NULL;
