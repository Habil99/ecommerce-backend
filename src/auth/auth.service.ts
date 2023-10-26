import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../lib/prisma.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import bcrypt from "bcrypt";
import { User as UserModel } from "@prisma/client";
import { RuntimeException } from "@nestjs/core/errors/exceptions";
import { JwtService } from "@nestjs/jwt";

class UserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const { email, password } = signInDto;

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new NotFoundException(
        "Email or Password is incorrect, please provide valid credentials",
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new NotFoundException(
        "Email or Password is incorrect, please provide valid credentials",
      );
    }

    const tokens = await this.generateTokens(user);

    if (!tokens) {
      throw new RuntimeException("Please, try again. Something went wrong");
    }

    return {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<UserModel | null> {
    const { firstName, lastName, email, password } = signUpDto;

    try {
      const passwordSalt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, passwordSalt);

      //   TODO: send confirmation email

      const user = await this.prismaService.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: passwordHash,
        },
      });

      return user;
    } catch (e) {
      throw new RuntimeException(e);
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
}
