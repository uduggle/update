-- CreateTable
CREATE TABLE "order" (
    "orId" SERIAL NOT NULL,
    "orName" TEXT NOT NULL,
    "orImage" TEXT NOT NULL,
    "orPrice" DECIMAL(65,30) NOT NULL,
    "orQuantity" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "proId" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("orId")
);

-- CreateTable
CREATE TABLE "payment" (
    "payId" SERIAL NOT NULL,
    "orName" TEXT NOT NULL,
    "orQuantity" INTEGER NOT NULL,
    "orPrice" DECIMAL(65,30) NOT NULL,
    "totalPrice" DECIMAL(65,30) NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "orId" INTEGER NOT NULL,
    "expensesExpId" INTEGER,
    "incomeIncomeId" INTEGER,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("payId")
);

-- CreateTable
CREATE TABLE "Expenses" (
    "ExpId" SERIAL NOT NULL,
    "ExpAmount" DOUBLE PRECISION NOT NULL,
    "ExpDate" TIMESTAMP(3) NOT NULL,
    "incomeIncomeId" INTEGER,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("ExpId")
);

-- CreateTable
CREATE TABLE "Income" (
    "IncomeId" SERIAL NOT NULL,
    "IncomeAmount" DOUBLE PRECISION NOT NULL,
    "IncomeDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Income_pkey" PRIMARY KEY ("IncomeId")
);

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_proId_fkey" FOREIGN KEY ("proId") REFERENCES "product"("proId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("cartId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_orId_fkey" FOREIGN KEY ("orId") REFERENCES "order"("orId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_expensesExpId_fkey" FOREIGN KEY ("expensesExpId") REFERENCES "Expenses"("ExpId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_incomeIncomeId_fkey" FOREIGN KEY ("incomeIncomeId") REFERENCES "Income"("IncomeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_incomeIncomeId_fkey" FOREIGN KEY ("incomeIncomeId") REFERENCES "Income"("IncomeId") ON DELETE SET NULL ON UPDATE CASCADE;
