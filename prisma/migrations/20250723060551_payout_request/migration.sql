/*
  Warnings:

  - Added the required column `bankAccount` to the `payoutrequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `payoutrequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `payoutrequest` DROP FOREIGN KEY `PayoutRequest_userId_fkey`;

-- AlterTable
ALTER TABLE `payoutrequest` ADD COLUMN `bankAccount` VARCHAR(191) NOT NULL,
    ADD COLUMN `fullName` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `payoutrequest` ADD CONSTRAINT `payoutrequest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
