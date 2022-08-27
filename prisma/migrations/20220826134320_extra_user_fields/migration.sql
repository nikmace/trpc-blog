-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "active" BOOLEAN DEFAULT true,
ADD COLUMN     "birthday" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "organization" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "role" "Role" DEFAULT 'USER',
ADD COLUMN     "verified" BOOLEAN DEFAULT false;
