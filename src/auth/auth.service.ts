import { Injectable } from "@nestjs/common";
import { PrismaService } from "../lib/prisma.service";

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signIn() {}

  async signUp() {}
}
