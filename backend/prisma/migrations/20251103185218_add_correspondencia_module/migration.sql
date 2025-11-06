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

-- CreateTable
CREATE TABLE `Condomino` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `apartamento` VARCHAR(191) NOT NULL,
    `andar` INTEGER NOT NULL DEFAULT 0,
    `usuarioId` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `Condomino_cpf_key`(`cpf`),
    UNIQUE INDEX `Condomino_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Porteiro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `turno` VARCHAR(191) NOT NULL,
    `usuarioId` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `Porteiro_cpf_key`(`cpf`),
    UNIQUE INDEX `Porteiro_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Visitante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `documento` VARCHAR(191) NULL,
    `autorizado` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Entregador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `empresa` VARCHAR(191) NULL,
    `documento` VARCHAR(191) NULL,
    `autorizado` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Acesso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` ENUM('CONDOMINO', 'VISITANTE', 'ENTREGADOR') NOT NULL,
    `dataEntrada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataSaida` DATETIME(3) NULL,
    `observacao` VARCHAR(191) NULL,
    `condominoId` INTEGER NULL,
    `visitanteId` INTEGER NULL,
    `entregadorId` INTEGER NULL,
    `porteiroId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Correspondencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `tipo` ENUM('CARTA', 'ENCOMENDA', 'DOCUMENTO', 'OUTRO') NOT NULL,
    `dataRecebimento` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataRetirada` DATETIME(3) NULL,
    `retiradoPor` VARCHAR(191) NULL,
    `porteiroId` INTEGER NOT NULL,
    `condominoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notificacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mensagem` VARCHAR(191) NOT NULL,
    `dataEnvio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `condominoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AreaComum` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reserva` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataReserva` DATETIME(3) NOT NULL,
    `horarioInicio` DATETIME(3) NOT NULL,
    `horarioFim` DATETIME(3) NOT NULL,
    `areaId` INTEGER NOT NULL,
    `condominoId` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pendente',
    `criadaEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Condomino` ADD CONSTRAINT `Condomino_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Porteiro` ADD CONSTRAINT `Porteiro_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acesso` ADD CONSTRAINT `Acesso_condominoId_fkey` FOREIGN KEY (`condominoId`) REFERENCES `Condomino`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acesso` ADD CONSTRAINT `Acesso_visitanteId_fkey` FOREIGN KEY (`visitanteId`) REFERENCES `Visitante`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acesso` ADD CONSTRAINT `Acesso_entregadorId_fkey` FOREIGN KEY (`entregadorId`) REFERENCES `Entregador`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acesso` ADD CONSTRAINT `Acesso_porteiroId_fkey` FOREIGN KEY (`porteiroId`) REFERENCES `Porteiro`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Correspondencia` ADD CONSTRAINT `Correspondencia_porteiroId_fkey` FOREIGN KEY (`porteiroId`) REFERENCES `Porteiro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Correspondencia` ADD CONSTRAINT `Correspondencia_condominoId_fkey` FOREIGN KEY (`condominoId`) REFERENCES `Condomino`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notificacao` ADD CONSTRAINT `Notificacao_condominoId_fkey` FOREIGN KEY (`condominoId`) REFERENCES `Condomino`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `AreaComum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_condominoId_fkey` FOREIGN KEY (`condominoId`) REFERENCES `Condomino`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
