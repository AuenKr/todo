/*
  Warnings:

  - You are about to drop the column `projectId` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `labelId` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_projectId_fkey";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "projectId",
ADD COLUMN     "labelId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
