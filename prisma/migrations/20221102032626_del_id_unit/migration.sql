/*
  Warnings:

  - You are about to drop the column `id_unit` on the `d_item` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `id_unit` ON `d_item`;

-- AlterTable
ALTER TABLE `d_item` DROP COLUMN `id_unit`;
