-- CreateTable
CREATE TABLE `Veiculo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cor` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `placa` VARCHAR(191) NOT NULL,
    `ano` INTEGER NOT NULL,
    `bloco` VARCHAR(191) NOT NULL,
    `apartamento` VARCHAR(191) NOT NULL,
    `condominoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Veiculo_placa_key`(`placa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Veiculo` ADD CONSTRAINT `Veiculo_condominoId_fkey` FOREIGN KEY (`condominoId`) REFERENCES `Condomino`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
