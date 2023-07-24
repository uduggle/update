/*
  Warnings:

  - You are about to drop the column `create_at` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "category" (
    "catId" SERIAL NOT NULL,
    "cat_type" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("catId")
);

-- CreateTable
CREATE TABLE "subcategory" (
    "subId" SERIAL NOT NULL,
    "subename" TEXT NOT NULL,
    "subimage" TEXT NOT NULL,
    "discription" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "cat_catId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "subcategory_pkey" PRIMARY KEY ("subId")
);

-- CreateTable
CREATE TABLE "product" (
    "proId" SERIAL NOT NULL,
    "proname" TEXT NOT NULL,
    "proStock" INTEGER NOT NULL,
    "proPrice" DECIMAL(65,30) NOT NULL,
    "proimage" TEXT NOT NULL,
    "proDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "subId" INTEGER NOT NULL,
    "autherId" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("proId")
);

-- CreateTable
CREATE TABLE "cart" (
    "cartid" SERIAL NOT NULL,
    "careatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "autherId" INTEGER NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("cartid")
);

-- CreateTable
CREATE TABLE "cartItem" (
    "cartItemId" SERIAL NOT NULL,
    "careatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "cartId" INTEGER NOT NULL,
    "porid" INTEGER NOT NULL,

    CONSTRAINT "cartItem_pkey" PRIMARY KEY ("cartItemId")
);

-- CreateTable
CREATE TABLE "order" (
    "or_id" SERIAL NOT NULL,
    "or_name" TEXT NOT NULL,
    "or_image" TEXT NOT NULL,
    "or_price" DECIMAL(65,30) NOT NULL,
    "or_quant" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "manuid" INTEGER NOT NULL,
    "proid" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("or_id")
);

-- CreateTable
CREATE TABLE "payment" (
    "pay_id" SERIAL NOT NULL,
    "or_name" TEXT NOT NULL,
    "or_quantity" INTEGER NOT NULL,
    "or_price" DECIMAL(65,30) NOT NULL,
    "totalPrice" DECIMAL(65,30) NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "orderid" INTEGER NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("pay_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_cat_type_key" ON "category"("cat_type");

-- CreateIndex
CREATE UNIQUE INDEX "subcategory_subename_key" ON "subcategory"("subename");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subcategory" ADD CONSTRAINT "subcategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subcategory" ADD CONSTRAINT "subcategory_cat_catId_fkey" FOREIGN KEY ("cat_catId") REFERENCES "category"("catId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_subId_fkey" FOREIGN KEY ("subId") REFERENCES "subcategory"("subId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_autherId_fkey" FOREIGN KEY ("autherId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_autherId_fkey" FOREIGN KEY ("autherId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartItem" ADD CONSTRAINT "cartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("cartid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartItem" ADD CONSTRAINT "cartItem_porid_fkey" FOREIGN KEY ("porid") REFERENCES "product"("proId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_proid_fkey" FOREIGN KEY ("proid") REFERENCES "product"("proId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("cartid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_orderid_fkey" FOREIGN KEY ("orderid") REFERENCES "order"("or_id") ON DELETE RESTRICT ON UPDATE CASCADE;
