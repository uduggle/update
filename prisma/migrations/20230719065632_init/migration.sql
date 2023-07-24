/*
  Warnings:

  - You are about to drop the column `cart_type` on the `category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cat_type]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cat_type` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "category_cart_type_key";

-- AlterTable
ALTER TABLE "category" DROP COLUMN "cart_type",
ADD COLUMN     "cat_type" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "category_cat_type_key" ON "category"("cat_type");
