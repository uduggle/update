/*
  Warnings:

  - You are about to drop the column `cat_type` on the `category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cart_type]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cart_type` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "category_cat_type_key";

-- AlterTable
ALTER TABLE "category" DROP COLUMN "cat_type",
ADD COLUMN     "cart_type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "subcategory" (
    "subId" SERIAL NOT NULL,
    "subname" TEXT NOT NULL,
    "subimage" TEXT NOT NULL,
    "discription" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "cat_catid" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "subcategory_pkey" PRIMARY KEY ("subId")
);

-- CreateTable
CREATE TABLE "product" (
    "proId" SERIAL NOT NULL,
    "proname" TEXT NOT NULL,
    "proStock" INTEGER NOT NULL,
    "proPrice" DECIMAL(65,30) NOT NULL,
    "proDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "subId" INTEGER NOT NULL,
    "autherId" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("proId")
);

-- CreateIndex
CREATE UNIQUE INDEX "subcategory_subname_key" ON "subcategory"("subname");

-- CreateIndex
CREATE UNIQUE INDEX "category_cart_type_key" ON "category"("cart_type");

-- AddForeignKey
ALTER TABLE "subcategory" ADD CONSTRAINT "subcategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subcategory" ADD CONSTRAINT "subcategory_cat_catid_fkey" FOREIGN KEY ("cat_catid") REFERENCES "category"("catid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_subId_fkey" FOREIGN KEY ("subId") REFERENCES "subcategory"("subId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_autherId_fkey" FOREIGN KEY ("autherId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
