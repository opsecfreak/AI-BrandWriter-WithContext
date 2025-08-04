/*
  Warnings:

  - You are about to drop the column `taskid` on the `Subtask` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[taskId]` on the table `Subtask` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Subtask_taskid_key";

-- AlterTable
ALTER TABLE "Subtask" DROP COLUMN "taskid";

-- CreateIndex
CREATE UNIQUE INDEX "Subtask_taskId_key" ON "Subtask"("taskId");
