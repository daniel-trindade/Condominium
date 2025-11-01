-- CreateTable
CREATE TABLE `Condomino` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `apartamento` INTEGER NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Condomino_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Porteiro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `turno` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Porteiro_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Visitante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Entregador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `empresa` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Correspondencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `dataRecebimento` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataRetirada` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL,
    `destinatarioId` INTEGER NOT NULL,

    INDEX `Correspondencia_destinatarioId_idx`(`destinatarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Acesso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoPessoa` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `dataEntrada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataSaida` DATETIME(3) NULL,
    `condominoId` INTEGER NULL,
    `visitanteId` INTEGER NULL,
    `entregadorId` INTEGER NULL,

    INDEX `Acesso_condominoId_idx`(`condominoId`),
    INDEX `Acesso_visitanteId_idx`(`visitanteId`),
    INDEX `Acesso_entregadorId_idx`(`entregadorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Correspondencia` ADD CONSTRAINT `Correspondencia_destinatarioId_fkey` FOREIGN KEY (`destinatarioId`) REFERENCES `Condomino`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acesso` ADD CONSTRAINT `Acesso_condominoId_fkey` FOREIGN KEY (`condominoId`) REFERENCES `Condomino`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acesso` ADD CONSTRAINT `Acesso_visitanteId_fkey` FOREIGN KEY (`visitanteId`) REFERENCES `Visitante`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acesso` ADD CONSTRAINT `Acesso_entregadorId_fkey` FOREIGN KEY (`entregadorId`) REFERENCES `Entregador`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
