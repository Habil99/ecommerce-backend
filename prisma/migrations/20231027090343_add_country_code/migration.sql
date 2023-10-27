/*
  Warnings:

  - You are about to drop the column `flag` on the `countries` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[country_code]` on the table `countries` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `country_code` to the `countries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "countries" DROP COLUMN "flag",
ADD COLUMN     "country_code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "countries_country_code_key" ON "countries"("country_code");
