-- CreateTable
CREATE TABLE `d_notification_object` (
    `id_notification_object` INTEGER NOT NULL AUTO_INCREMENT,
    `entity_type` INTEGER NOT NULL,
    `entity_id` INTEGER NOT NULL,
    `status` TINYINT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id_notification_object`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `d_notification_change` (
    `id_notification_change` INTEGER NOT NULL AUTO_INCREMENT,
    `id_notification_object` INTEGER NOT NULL,
    `id_company` INTEGER NOT NULL,
    `status` TINYINT NOT NULL,

    INDEX `id_notification_object`(`id_notification_object`),
    INDEX `id_company`(`id_company`),
    PRIMARY KEY (`id_notification_change`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `d_notification` (
    `id_notification` INTEGER NOT NULL AUTO_INCREMENT,
    `id_notification_object` INTEGER NOT NULL,
    `id_company` INTEGER NOT NULL,
    `status` TINYINT NOT NULL,

    INDEX `id_notification_object`(`id_notification_object`),
    INDEX `id_company`(`id_company`),
    PRIMARY KEY (`id_notification`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `d_notification_change` ADD CONSTRAINT `d_notification_change_ibfk_1` FOREIGN KEY (`id_notification_object`) REFERENCES `d_notification_object`(`id_notification_object`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `d_notification_change` ADD CONSTRAINT `d_notification_change_ibfk_2` FOREIGN KEY (`id_company`) REFERENCES `s_company`(`id_company`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `d_notification` ADD CONSTRAINT `d_notification_ibfk_1` FOREIGN KEY (`id_notification_object`) REFERENCES `d_notification_object`(`id_notification_object`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `d_notification` ADD CONSTRAINT `d_notification_ibfk_2` FOREIGN KEY (`id_company`) REFERENCES `s_company`(`id_company`) ON DELETE CASCADE ON UPDATE CASCADE;
