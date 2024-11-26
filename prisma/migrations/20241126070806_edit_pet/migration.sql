/*
  Warnings:

  - Made the column `category` on table `Pet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pet" ALTER COLUMN "category" SET NOT NULL;
