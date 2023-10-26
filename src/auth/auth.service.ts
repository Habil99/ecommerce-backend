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
  INVALID_AUTH_CREDENTIALS,
  USER_ALREADY_EXISTS,
} from "../lib/error-messages";
import { TokenProvider } from "../provider/token.provider";
import { SignInResponse, SignUpResponse } from "../model/response.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tokenProvider: TokenProvider,
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

      return plainToInstance(UserDto, user);
    } catch (e) {
      throw new BadRequestException(e);
    }
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
