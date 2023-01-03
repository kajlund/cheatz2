-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('PROSPECT', 'USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "CACHE_TYPE" AS ENUM ('TRADITIONAL', 'MYSTERY', 'MULTI', 'EARTH', 'LETTERBOX', 'EVENT', 'CITO', 'MEGA', 'GIGA', 'WHERIGO', 'HQ', 'LAB', 'VIRTUAL', 'WEBCAM');

-- CreateTable
CREATE TABLE "Geocache" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "gc" TEXT NOT NULL,
    "kind" "CACHE_TYPE" NOT NULL DEFAULT 'TRADITIONAL',
    "name" TEXT NOT NULL,
    "coords" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "municipalityId" TEXT NOT NULL,

    CONSTRAINT "Geocache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CacheComment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "body" TEXT NOT NULL,
    "cacheId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CacheComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "USER_ROLE" NOT NULL DEFAULT 'PROSPECT',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Municipality" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Municipality_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Geocache_gc_key" ON "Geocache"("gc");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Municipality_code_key" ON "Municipality"("code");

-- AddForeignKey
ALTER TABLE "Geocache" ADD CONSTRAINT "Geocache_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CacheComment" ADD CONSTRAINT "CacheComment_cacheId_fkey" FOREIGN KEY ("cacheId") REFERENCES "Geocache"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CacheComment" ADD CONSTRAINT "CacheComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
