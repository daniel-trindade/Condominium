/*
  Warnings:

  - Added the required column `foto` to the `Veiculo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `veiculo` ADD COLUMN `foto` VARCHAR(191) NOT NULL;
