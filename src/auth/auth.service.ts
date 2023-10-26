import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../service/prisma.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import * as bcrypt from "bcrypt";
import { RuntimeException } from "@nestjs/core/errors/exceptions";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "../user/dto/user.dto";
import { plainToInstance } from "class-transformer";
import { UserService } from "../user/user.service";
import {
  EMAIL_CONFIRMED,
  INVALID_AUTH_CREDENTIALS,
  INVALID_OTP,
  INVALID_TOKEN,
  OTP_NOT_FOUND,
  USER_ALREADY_EXISTS,
} from "../lib/error-messages";
import { TokenProvider } from "../provider/token.provider";
import {
  ConfirmEmailResponse,
  SignInResponse,
  SignUpResponse,
} from "../model/response.model";
import { MailService } from "../service/mail.service";
import { OtpService } from "../service/otp.service";
import { EmailConfirmationDto } from "./dto/email-confirmation.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tokenProvider: TokenProvider,
    private readonly mailService: MailService,
    private readonly otpService: OtpService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<SignInResponse> {
    const { email, password } = signInDto;

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException(INVALID_AUTH_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException(INVALID_AUTH_CREDENTIALS);
    }

    const { accessToken, refreshToken } =
      this.tokenProvider.generateTokens(user);

    return {
      user: plainToInstance(UserDto, user),
      accessToken,
      refreshToken,
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<SignUpResponse> {
    const { firstName, lastName, email, password } = signUpDto;

    const passwordHash = await this.generatePasswordHash(password);

    // TODO: send confirmation email
    // TODO: otp verification
    const existUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (existUser) {
      throw new BadRequestException(USER_ALREADY_EXISTS);
    }

    try {
      const user = await this.prismaService.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: passwordHash,
        },
      });

      const emailToken = this.tokenProvider.signEmailToken(user.id);

      await this.mailService.sendUserConfirmation(user, emailToken);

      await this.otpService.createEmailConfirmationOtp(user.id);

      return plainToInstance(UserDto, user);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async confirmEmail(
    emailConfirmationDto: EmailConfirmationDto,
  ): Promise<ConfirmEmailResponse> {
    const { emailToken, otpCode } = emailConfirmationDto;
    const { userId } = this.tokenProvider.verifyEmailToken(emailToken);

    if (!userId) {
      throw new BadRequestException(INVALID_TOKEN);
    }

    const emailConfirmationOtp =
      await this.otpService.getEmailConfirmationOtp(userId);

    if (!emailConfirmationOtp) {
      throw new BadRequestException(OTP_NOT_FOUND);
    }

    const emailIsConfirmed = await this.otpService.verifyEmailConfirmationOtp(
      otpCode,
      emailConfirmationOtp,
    );

    if (!emailIsConfirmed) {
      throw new BadRequestException(INVALID_OTP);
    }

    await this.userService.confirmEmail(userId);
    await this.otpService.deleteEmailConfirmationOtp(userId);

    return {
      success: true,
      message: EMAIL_CONFIRMED,
    };
  }

  async generatePasswordHash(password: string): Promise<string> {
    try {
      const passwordSalt = await bcrypt.genSalt();
      return await bcrypt.hash(password, passwordSalt);
    } catch (e) {
      throw new RuntimeException(e);
    }
  }
}
