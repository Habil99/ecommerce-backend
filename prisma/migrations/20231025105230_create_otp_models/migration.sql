-- CreateTable
CREATE TABLE "OtpConfirm" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "otp_code" INTEGER NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OtpConfirm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtpResetPassword" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "otp_code" INTEGER NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OtpResetPassword_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OtpConfirm" ADD CONSTRAINT "OtpConfirm_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtpResetPassword" ADD CONSTRAINT "OtpResetPassword_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
