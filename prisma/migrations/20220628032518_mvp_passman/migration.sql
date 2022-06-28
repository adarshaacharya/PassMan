/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Credential` table. All the data in the column will be lost.
  - You are about to drop the column `catgory` on the `Vault` table. All the data in the column will be lost.
  - Added the required column `category` to the `Credential` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initializationVector` to the `Credential` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Vault` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VaultCategory" AS ENUM ('PERSONAL', 'BUSINESS');

-- DropForeignKey
ALTER TABLE "Credential" DROP CONSTRAINT "Credential_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Credential" DROP CONSTRAINT "Credential_vaultId_fkey";

-- AlterTable
ALTER TABLE "Credential" DROP COLUMN "ownerId",
ADD COLUMN     "category" "VaultCategory" NOT NULL,
ADD COLUMN     "initializationVector" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Vault" DROP COLUMN "catgory",
ADD COLUMN     "category" "VaultCategory" NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- DropEnum
DROP TYPE "Category";

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_vaultId_fkey" FOREIGN KEY ("vaultId") REFERENCES "Vault"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
