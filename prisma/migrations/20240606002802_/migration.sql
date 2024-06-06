/*
  Warnings:

  - The values [TASK] on the enum `LOG_TYPE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LOG_TYPE_new" AS ENUM ('NOTE', 'TASK_BOARD', 'TASK_LIST', 'TASK_CARD', 'WORKSPACE');
ALTER TABLE "HistoryLog" ALTER COLUMN "type" TYPE "LOG_TYPE_new" USING ("type"::text::"LOG_TYPE_new");
ALTER TYPE "LOG_TYPE" RENAME TO "LOG_TYPE_old";
ALTER TYPE "LOG_TYPE_new" RENAME TO "LOG_TYPE";
DROP TYPE "LOG_TYPE_old";
COMMIT;

-- AlterTable
ALTER TABLE "HistoryLog" ADD COLUMN     "upperTargetId" TEXT;
