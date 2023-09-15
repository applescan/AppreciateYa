-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "address" TEXT NOT NULL DEFAULT 'Default Address',
ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'Default Country',
ADD COLUMN     "organizationType" TEXT NOT NULL DEFAULT 'Default Type';
