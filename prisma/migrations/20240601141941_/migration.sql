/*
  Warnings:

  - You are about to drop the column `image` on the `Workspace` table. All the data in the column will be lost.
  - Added the required column `imageId` to the `Workspace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageLgUrl` to the `Workspace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageSmUrl` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "image",
ADD COLUMN     "imageId" TEXT NOT NULL,
ADD COLUMN     "imageLgUrl" TEXT NOT NULL,
ADD COLUMN     "imageSmUrl" TEXT NOT NULL;
