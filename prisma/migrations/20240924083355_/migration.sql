/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileImage" TEXT,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
