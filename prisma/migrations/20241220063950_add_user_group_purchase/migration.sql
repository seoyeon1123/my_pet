/*
  Warnings:

  - Added the required column `userId` to the `GroupPurchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `GroupPurchaseParticipant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupPurchase" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GroupPurchaseParticipant" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "GroupPurchase" ADD CONSTRAINT "GroupPurchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupPurchaseParticipant" ADD CONSTRAINT "GroupPurchaseParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
