/*
  Warnings:

  - You are about to drop the `OtpConfirm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OtpResetPassword` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OtpConfirm" DROP CONSTRAINT "OtpConfirm_user_id_fkey";

-- DropForeignKey
ALTER TABLE "OtpResetPassword" DROP CONSTRAINT "OtpResetPassword_user_id_fkey";

-- DropTable
DROP TABLE "OtpConfirm";

-- DropTable
DROP TABLE "OtpResetPassword";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_active" BOOLEAN DEFAULT false,
    "is_confirmed" BOOLEAN DEFAULT false,
    "is_deleted" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "confirmation_otps" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "otp_code" INTEGER NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "confirmation_otps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reset_password_otps" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "otp_code" INTEGER NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reset_password_otps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "confirmation_otps_user_id_key" ON "confirmation_otps"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "reset_password_otps_user_id_key" ON "reset_password_otps"("user_id");

-- AddForeignKey
ALTER TABLE "confirmation_otps" ADD CONSTRAINT "confirmation_otps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reset_password_otps" ADD CONSTRAINT "reset_password_otps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
