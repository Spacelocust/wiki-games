-- CreateTable
CREATE TABLE `FavoriteTeam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teamId` INTEGER NOT NULL,

    UNIQUE INDEX `FavoriteTeam_teamId_key`(`teamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FavoriteLeague` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `leagueId` INTEGER NOT NULL,

    UNIQUE INDEX `FavoriteLeague_leagueId_key`(`leagueId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
