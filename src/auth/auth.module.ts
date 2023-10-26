import { Logger, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";
import { PrismaService } from "../service/prisma.service";
import { UserService } from "../user/user.service";
import { TokenProvider } from "../provider/token.provider";
import { MailService } from "../service/mail.service";
import { OtpService } from "../service/otp.service";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        algorithm: "HS256",
        expiresIn: jwtConstants.expiresIn,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    UserService,
    TokenProvider,
    MailService,
    OtpService,
    Logger,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
