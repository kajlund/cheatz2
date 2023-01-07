-- DropForeignKey
ALTER TABLE "CacheComment" DROP CONSTRAINT "CacheComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Geocache" DROP CONSTRAINT "Geocache_userId_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- AlterTable
ALTER TABLE "CacheComment" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Geocache" ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Geocache" ADD CONSTRAINT "Geocache_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CacheComment" ADD CONSTRAINT "CacheComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
