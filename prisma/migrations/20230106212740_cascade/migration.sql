/*
  Warnings:

  - Added the required column `userId` to the `Geocache` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CacheComment" DROP CONSTRAINT "CacheComment_cacheId_fkey";

-- AlterTable
ALTER TABLE "Geocache" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Geocache" ADD CONSTRAINT "Geocache_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CacheComment" ADD CONSTRAINT "CacheComment_cacheId_fkey" FOREIGN KEY ("cacheId") REFERENCES "Geocache"("id") ON DELETE CASCADE ON UPDATE CASCADE;
