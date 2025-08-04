/*
  Warnings:

  - Added the required column `estimatedTime` to the `Subtask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subtask" ADD COLUMN     "estimatedTime" TEXT NOT NULL,
ADD COLUMN     "priority" TEXT NOT NULL DEFAULT 'low';
