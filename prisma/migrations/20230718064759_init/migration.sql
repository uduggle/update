/*
  Warnings:

  - You are about to drop the column `created_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cartItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subcategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_autherId_fkey";

-- DropForeignKey
ALTER TABLE "cartItem" DROP CONSTRAINT "cartItem_cartId_fkey";

-- DropForeignKey
ALTER TABLE "cartItem" DROP CONSTRAINT "cartItem_porid_fkey";

-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_userId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_cartId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_proid_fkey";

-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_orderid_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_autherId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_subId_fkey";

-- DropForeignKey
ALTER TABLE "subcategory" DROP CONSTRAINT "subcategory_cat_catId_fkey";

-- DropForeignKey
ALTER TABLE "subcategory" DROP CONSTRAINT "subcategory_userId_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "created_at",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "cart";

-- DropTable
DROP TABLE "cartItem";

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "order";

-- DropTable
DROP TABLE "payment";

-- DropTable
DROP TABLE "product";

-- DropTable
DROP TABLE "subcategory";
