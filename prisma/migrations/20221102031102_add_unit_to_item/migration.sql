/*
  Warnings:

  - You are about to drop the `ref_unit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `unit` to the `d_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `d_item` DROP FOREIGN KEY `d_item_ibfk_2`;

-- DropForeignKey
ALTER TABLE `ref_unit` DROP FOREIGN KEY `ref_unit_ibfk_1`;

-- AlterTable
ALTER TABLE `d_item` ADD COLUMN `unit` VARCHAR(50) NOT NULL;

-- DropTable
DROP TABLE `ref_unit`;
