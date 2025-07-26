/*
  Warnings:

  - Added the required column `correct` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionA` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionB` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionC` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionD` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `question` ADD COLUMN `correct` VARCHAR(191) NOT NULL,
    ADD COLUMN `optionA` VARCHAR(191) NOT NULL,
    ADD COLUMN `optionB` VARCHAR(191) NOT NULL,
    ADD COLUMN `optionC` VARCHAR(191) NOT NULL,
    ADD COLUMN `optionD` VARCHAR(191) NOT NULL;
