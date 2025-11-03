/*
  Warnings:

  - You are about to drop the column `nome` on the `condomino` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `condomino` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `porteiro` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `porteiro` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usuarioId]` on the table `Condomino` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[usuarioId]` on the table `Porteiro` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `condomino` DROP COLUMN `nome`,
    DROP COLUMN `senha`,
    ADD COLUMN `andar` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `usuarioId` INTEGER NOT NULL DEFAULT 1,
    MODIFY `apartamento` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `porteiro` DROP COLUMN `nome`,
    DROP COLUMN `senha`,
    ADD COLUMN `usuarioId` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `tipo` ENUM('ADMIN', 'CONDOMINO', 'PORTEIRO') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Condomino_usuarioId_key` ON `Condomino`(`usuarioId`);

-- CreateIndex
CREATE UNIQUE INDEX `Porteiro_usuarioId_key` ON `Porteiro`(`usuarioId`);

-- AddForeignKey
ALTER TABLE `Condomino` ADD CONSTRAINT `Condomino_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Porteiro` ADD CONSTRAINT `Porteiro_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
