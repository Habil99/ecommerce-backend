import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../service/prisma.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import * as bcrypt from "bcrypt";
import { UserDto } from "../user/dto/user.dto";
import { plainToInstance } from "class-transformer";
import { UserService } from "../user/user.service";
import {
  EMAIL_CONFIRMED,
  INVALID_AUTH_CREDENTIALS,
  INVALID_OTP,
  INVALID_REFRESH_TOKEN,
  INVALID_TOKEN,
  OTP_NOT_FOUND,
  USER_ALREADY_EXISTS,
  USER_NOT_ACTIVE,
  USER_NOT_CONFIRMED_EMAIL,
  USER_NOT_FOUND,
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
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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

    if (!user.isActive) {
      throw new BadRequestException(USER_NOT_ACTIVE);
    }

    if (!user.isConfirmed) {
      throw new BadRequestException(USER_NOT_CONFIRMED_EMAIL);
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

      const { otpCode } = await this.otpService.createEmailConfirmationOtp(
        user.id,
      );

      await this.mailService.sendUserConfirmation(user, emailToken, otpCode);

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

  async refresh(refreshToken: string) {
    const { id: userId } = this.jwtService.verify(refreshToken);

    if (!userId) {
      return new UnauthorizedException(INVALID_REFRESH_TOKEN);
    }

    try {
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
      });

      const tokens = this.tokenProvider.generateTokens(user);

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    } catch (e) {
      throw new NotFoundException(USER_NOT_FOUND("token"));
    }
  }

  async generatePasswordHash(password: string): Promise<string> {
    try {
      const passwordSalt = await bcrypt.genSalt();
      return await bcrypt.hash(password, passwordSalt);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
