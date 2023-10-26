import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "../lib/prisma.service";

@Module({
  providers: [PrismaService, UserService],
  controllers: [UserController],
})
export class UserModule {}
