import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../lib/prisma.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import * as bcrypt from "bcrypt";
import { User as UserModel } from "@prisma/client";
import { RuntimeException } from "@nestjs/core/errors/exceptions";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "../user/dto/user.dto";
import { plainToInstance } from "class-transformer";
import { UserService } from "../user/user.service";
import {
  INVALID_AUTH_CREDENTIALS,
  RUNTIME_EXCEPTION,
  USER_ALREADY_EXISTS,
} from "../lib/error-messages";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{
    user: UserDto;
    accessToken: string;
    refreshToken: string;
  }> {
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

    const tokens = await this.generateTokens(user);

    if (!tokens) {
      throw new RuntimeException(RUNTIME_EXCEPTION);
    }

    return {
      user: plainToInstance(UserDto, user),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<UserDto | null> {
    const { firstName, lastName, email, password } = signUpDto;

    const passwordHash = await this.generatePasswordHash(password);

    //   TODO: send confirmation email
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

  async generateTokens(user: UserModel): Promise<
    | {
        accessToken: string;
        refreshToken: string;
      }
    | undefined
  > {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    try {
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: "3d",
      });

      return { accessToken, refreshToken: refreshToken };
    } catch {
      return undefined;
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
