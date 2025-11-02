/*
  Warnings:

  - Added the required column `senha` to the `Condomino` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Porteiro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `condomino` ADD COLUMN `senha` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `porteiro` ADD COLUMN `senha` VARCHAR(191) NOT NULL;
