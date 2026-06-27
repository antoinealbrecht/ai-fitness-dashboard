-- CreateTable
CREATE TABLE "RecoveryEntry" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sleepHours" DOUBLE PRECISION NOT NULL,
    "sleepQuality" INTEGER NOT NULL,
    "fatigue" INTEGER NOT NULL,
    "soreness" INTEGER NOT NULL,
    "stress" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecoveryEntry_pkey" PRIMARY KEY ("id")
);
