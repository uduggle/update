-- CreateTable
CREATE TABLE "category" (
    "catid" SERIAL NOT NULL,
    "cart_type" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("catid")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_cart_type_key" ON "category"("cart_type");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
