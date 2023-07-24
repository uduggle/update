-- CreateTable
CREATE TABLE "cart" (
    "cartId" SERIAL NOT NULL,
    "careatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "autherId" INTEGER NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("cartId")
);

-- CreateTable
CREATE TABLE "cartItem" (
    "cartItem" SERIAL NOT NULL,
    "careatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cartId" INTEGER NOT NULL,
    "proId" INTEGER NOT NULL,

    CONSTRAINT "cartItem_pkey" PRIMARY KEY ("cartItem")
);

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_autherId_fkey" FOREIGN KEY ("autherId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartItem" ADD CONSTRAINT "cartItem_cartItem_fkey" FOREIGN KEY ("cartItem") REFERENCES "cart"("cartId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartItem" ADD CONSTRAINT "cartItem_proId_fkey" FOREIGN KEY ("proId") REFERENCES "product"("proId") ON DELETE RESTRICT ON UPDATE CASCADE;
