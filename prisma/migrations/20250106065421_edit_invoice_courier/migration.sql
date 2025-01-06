/*
  Warnings:

  - You are about to drop the column `invoiceCourier` on the `GroupPurchase` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceTrackingNumber` on the `GroupPurchase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GroupPurchase" DROP COLUMN "invoiceCourier",
DROP COLUMN "invoiceTrackingNumber";

-- AlterTable
ALTER TABLE "GroupPurchaseParticipant" ADD COLUMN     "invoiceCourier" TEXT,
ADD COLUMN     "invoiceTrackingNumber" TEXT;
