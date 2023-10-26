import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../service/prisma.service";
import { UserDto } from "./dto/user.dto";
import { plainToInstance } from "class-transformer";
import { USER_NOT_FOUND } from "../lib/error-messages";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<UserDto | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND("email"));
    }

    return plainToInstance(UserDto, user);
  }
}
