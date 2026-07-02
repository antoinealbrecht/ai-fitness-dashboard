/*
  Warnings:

  - You are about to drop the column `fatigue` on the `RecoveryEntry` table. All the data in the column will be lost.
  - You are about to drop the column `soreness` on the `RecoveryEntry` table. All the data in the column will be lost.
  - You are about to drop the column `stress` on the `RecoveryEntry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RecoveryEntry" DROP COLUMN "fatigue",
DROP COLUMN "soreness",
DROP COLUMN "stress";
