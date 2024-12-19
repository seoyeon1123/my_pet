-- CreateTable
CREATE TABLE "GroupPurchase" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "expectedPrice" INTEGER NOT NULL,
    "maxParticipants" INTEGER NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "deliveryMethod" TEXT NOT NULL,
    "shippingCost" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" INTEGER NOT NULL,
    "productCategory" TEXT NOT NULL,

    CONSTRAINT "GroupPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupPurchaseParticipant" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "groupPurchaseId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupPurchaseParticipant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroupPurchaseParticipant" ADD CONSTRAINT "GroupPurchaseParticipant_groupPurchaseId_fkey" FOREIGN KEY ("groupPurchaseId") REFERENCES "GroupPurchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
