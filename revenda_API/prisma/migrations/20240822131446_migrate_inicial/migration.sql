-- CreateTable
CREATE TABLE `marcas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carros` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modelo` VARCHAR(60) NOT NULL,
    `ano` SMALLINT NOT NULL,
    `km` INTEGER NOT NULL,
    `preco` DECIMAL(10, 2) NOT NULL,
    `foto` VARCHAR(191) NOT NULL,
    `acessorios` VARCHAR(191) NULL,
    `destacado` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `combustivel` ENUM('GASOLINA', 'ALCOOL', 'DIESEL', 'FLEX', 'ELETRICO') NOT NULL DEFAULT 'FLEX',
    `marcaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `carros` ADD CONSTRAINT `carros_marcaId_fkey` FOREIGN KEY (`marcaId`) REFERENCES `marcas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
