/*
  Warnings:

  - You are about to drop the `_FavoriteToAlbum` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoriteToArtist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoriteToTrack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `albums` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `artists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `favorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tracks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FavoriteToAlbum" DROP CONSTRAINT "_FavoriteToAlbum_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteToAlbum" DROP CONSTRAINT "_FavoriteToAlbum_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteToArtist" DROP CONSTRAINT "_FavoriteToArtist_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteToArtist" DROP CONSTRAINT "_FavoriteToArtist_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteToTrack" DROP CONSTRAINT "_FavoriteToTrack_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteToTrack" DROP CONSTRAINT "_FavoriteToTrack_B_fkey";

-- DropForeignKey
ALTER TABLE "albums" DROP CONSTRAINT "albums_artistId_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_userId_fkey";

-- DropForeignKey
ALTER TABLE "tracks" DROP CONSTRAINT "tracks_albumId_fkey";

-- DropForeignKey
ALTER TABLE "tracks" DROP CONSTRAINT "tracks_artistId_fkey";

-- DropTable
DROP TABLE "_FavoriteToAlbum";

-- DropTable
DROP TABLE "_FavoriteToArtist";

-- DropTable
DROP TABLE "_FavoriteToTrack";

-- DropTable
DROP TABLE "albums";

-- DropTable
DROP TABLE "artists";

-- DropTable
DROP TABLE "favorites";

-- DropTable
DROP TABLE "tracks";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "artistId" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "artistId" TEXT,
    "albumId" TEXT,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "favoriteId" TEXT NOT NULL,
    "artists" TEXT[],
    "albums" TEXT[],
    "tracks" TEXT[],

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("favoriteId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;
