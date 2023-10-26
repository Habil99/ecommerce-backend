import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfirmationOtp as EmailConfirmationOtpModel } from "@prisma/client";
import * as crypto from "crypto";
import { PrismaService } from "./prisma.service";
import { OTP_EXPIRED } from "../lib/error-messages";
import { RuntimeException } from "@nestjs/core/errors/exceptions";

@Injectable()
export class OtpService {
  constructor(private readonly prismaService: PrismaService) {}

  async createEmailConfirmationOtp(userId: number) {
    const otpCode = crypto.randomInt(100000, 999999);

    return this.prismaService.confirmationOtp.create({
      data: {
        userId,
        otpCode,
        expiryDate: new Date(Date.now() + 5 * 60 * 1000), // after 5 minutes
      },
    });
  }

  async getEmailConfirmationOtp(userId: number) {
    return this.prismaService.confirmationOtp.findUnique({
      where: {
        userId,
      },
    });
  }

  async createPasswordResetOtp(userId: number) {}

  async verifyEmailConfirmationOtp(
    otpCode: number,
    emailConfirmationOtp: EmailConfirmationOtpModel,
  ) {
    if (emailConfirmationOtp.expiryDate < new Date()) {
      throw new BadRequestException(OTP_EXPIRED);
    }

    return otpCode === emailConfirmationOtp.otpCode;
  }

  async deleteEmailConfirmationOtp(userId: number) {
    try {
      await this.prismaService.confirmationOtp.delete({
        where: {
          userId,
        },
      });
    } catch (e) {
      throw new RuntimeException(e);
    }
  }
}
