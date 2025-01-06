-- AlterTable
ALTER TABLE "GroupPurchase" ADD COLUMN     "invoiceCourier" TEXT,
ADD COLUMN     "invoiceTrackingNumber" TEXT,
ADD COLUMN     "meetingLocation" TEXT,
ADD COLUMN     "meetingTime" TIMESTAMP(3);
