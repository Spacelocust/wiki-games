/*
  Warnings:

  - Added the required column `userId` to the `FavoriteLeague` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `FavoriteTeam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FavoriteLeague` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `FavoriteTeam` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `FavoriteTeam` ADD CONSTRAINT `FavoriteTeam_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteLeague` ADD CONSTRAINT `FavoriteLeague_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
