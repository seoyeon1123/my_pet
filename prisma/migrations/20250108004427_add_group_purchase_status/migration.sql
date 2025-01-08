-- CreateEnum
CREATE TYPE "GroupPurchaseStatus" AS ENUM ('RECRUITING', 'CLOSED', 'FAILED');

-- AlterTable
ALTER TABLE "GroupPurchase" ADD COLUMN     "status" "GroupPurchaseStatus" NOT NULL DEFAULT 'RECRUITING';
