-- CreateTable
CREATE TABLE `auth_user` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `level` TINYINT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `d_dn` (
    `id_dn` INTEGER NOT NULL AUTO_INCREMENT,
    `id_po` INTEGER NOT NULL,
    `id_doc` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `id_doc`(`id_doc`),
    INDEX `id_po`(`id_po`),
    PRIMARY KEY (`id_dn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `d_dn_detail` (
    `id_dn_detail` INTEGER NOT NULL AUTO_INCREMENT,
    `id_dn` INTEGER NOT NULL,
    `id_order` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `id_dn`(`id_dn`),
    INDEX `id_order`(`id_order`),
    PRIMARY KEY (`id_dn_detail`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `d_item` (
    `id_item` INTEGER NOT NULL AUTO_INCREMENT,
    `id_company` INTEGER NOT NULL,
    `id_unit` INTEGER NOT NULL,
    `id_category` INTEGER NOT NULL,
    `serial_number` VARCHAR(50) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `desc` TEXT NOT NULL,
    `quantity` FLOAT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `id_category`(`id_category`),
    INDEX `id_unit`(`id_unit`),
    INDEX `id_user`(`id_company`),
    PRIMARY KEY (`id_item`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `d_item_detail` (
    `id_item_detail` INTEGER NOT NULL AUTO_INCREMENT,
    `id_item` INTEGER NOT NULL,
    `id_po_detail` INTEGER NOT NULL,

    INDEX `id_item`(`id_item`),
    INDEX `id_po_detail`(`id_po_detail`),
    PRIMARY KEY (`id_item_detail`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `d_order` (
    `id_order` INTEGER NOT NULL AUTO_INCREMENT,
    `order_from` INTEGER NOT NULL,
    `order_to` INTEGER NOT NULL,
    `id_item` INTEGER NOT NULL,
    `order_number` VARCHAR(50) NOT NULL,
    `quantity` FLOAT NOT NULL,
    `processed` BOOLEAN NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `id_item`(`id_item`),
    INDEX `order_from`(`order_from`),
    INDEX `order_to`(`order_to`),
    PRIMARY KEY (`id_order`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `d_po` (
    `id_po` INTEGER NOT NULL AUTO_INCREMENT,
    `id_doc` INTEGER NOT NULL,
    `order_from` INTEGER NOT NULL,
    `order_to` INTEGER NOT NULL,
    `po_number` VARCHAR(50) NOT NULL,
    `status` TINYINT NOT NULL,
    `deadline` DATE NOT NULL,
    `finished_at` DATETIME(0) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `id_doc`(`id_doc`),
    INDEX `order_from`(`order_from`),
    INDEX `order_to`(`order_to`),
    PRIMARY KEY (`id_po`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `d_po_detail` (
    `id_po_detail` INTEGER NOT NULL AUTO_INCREMENT,
    `id_po` INTEGER NOT NULL,
    `id_order` INTEGER NOT NULL,
    `quantity` FLOAT NOT NULL,
    `note` TEXT NULL,
    `note_po` VARCHAR(50) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `id_order`(`id_order`),
    INDEX `id_po`(`id_po`),
    PRIMARY KEY (`id_po_detail`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `s_company` (
    `id_company` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `address` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `id_user`(`id_user`),
    PRIMARY KEY (`id_company`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `d_doc` (
    `id_doc` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NULL,
    `original_name` VARCHAR(50) NULL,
    `mime` VARCHAR(75) NULL,
    `path` VARCHAR(200) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    PRIMARY KEY (`id_doc`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ref_category` (
    `id_category` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    PRIMARY KEY (`id_category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ref_unit` (
    `id_unit` INTEGER NOT NULL AUTO_INCREMENT,
    `id_company` INTEGER NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `id_company`(`id_company`),
    PRIMARY KEY (`id_unit`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `d_dn` ADD CONSTRAINT `d_dn_ibfk_1` FOREIGN KEY (`id_doc`) REFERENCES `d_doc`(`id_doc`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `d_dn` ADD CONSTRAINT `d_dn_ibfk_2` FOREIGN KEY (`id_po`) REFERENCES `d_po`(`id_po`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `d_dn_detail` ADD CONSTRAINT `d_dn_detail_ibfk_2` FOREIGN KEY (`id_dn`) REFERENCES `d_dn`(`id_dn`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `d_dn_detail` ADD CONSTRAINT `d_dn_detail_ibfk_3` FOREIGN KEY (`id_order`) REFERENCES `d_order`(`id_order`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `d_item` ADD CONSTRAINT `d_item_ibfk_1` FOREIGN KEY (`id_company`) REFERENCES `s_company`(`id_company`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `d_item` ADD CONSTRAINT `d_item_ibfk_2` FOREIGN KEY (`id_unit`) REFERENCES `ref_unit`(`id_unit`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `d_item` ADD CONSTRAINT `d_item_ibfk_3` FOREIGN KEY (`id_category`) REFERENCES `ref_category`(`id_category`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `d_item_detail` ADD CONSTRAINT `d_item_detail_ibfk_1` FOREIGN KEY (`id_item`) REFERENCES `d_item`(`id_item`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `d_item_detail` ADD CONSTRAINT `d_item_detail_ibfk_2` FOREIGN KEY (`id_po_detail`) REFERENCES `d_po_detail`(`id_po_detail`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `d_order` ADD CONSTRAINT `d_order_ibfk_1` FOREIGN KEY (`id_item`) REFERENCES `d_item`(`id_item`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `d_order` ADD CONSTRAINT `d_order_ibfk_2` FOREIGN KEY (`order_from`) REFERENCES `s_company`(`id_company`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `d_order` ADD CONSTRAINT `d_order_ibfk_3` FOREIGN KEY (`order_to`) REFERENCES `s_company`(`id_company`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `d_po` ADD CONSTRAINT `d_po_ibfk_2` FOREIGN KEY (`id_doc`) REFERENCES `d_doc`(`id_doc`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `d_po` ADD CONSTRAINT `d_po_ibfk_3` FOREIGN KEY (`order_from`) REFERENCES `s_company`(`id_company`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `d_po` ADD CONSTRAINT `d_po_ibfk_4` FOREIGN KEY (`order_to`) REFERENCES `s_company`(`id_company`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `d_po_detail` ADD CONSTRAINT `d_po_detail_ibfk_1` FOREIGN KEY (`id_po`) REFERENCES `d_po`(`id_po`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `d_po_detail` ADD CONSTRAINT `d_po_detail_ibfk_3` FOREIGN KEY (`id_order`) REFERENCES `d_order`(`id_order`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `s_company` ADD CONSTRAINT `s_company_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `auth_user`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ref_unit` ADD CONSTRAINT `ref_unit_ibfk_1` FOREIGN KEY (`id_company`) REFERENCES `s_company`(`id_company`) ON DELETE CASCADE ON UPDATE CASCADE;
