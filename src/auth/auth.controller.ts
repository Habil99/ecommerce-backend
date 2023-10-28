import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { SignInDto } from "./dto/sign-in.dto";
import { AuthService } from "./auth.service";
import { Public } from "../decorator/public-route.decorator";
import { SignUpDto } from "./dto/sign-up.dto";
import {
  ConfirmEmailResponse,
  SignInResponse,
  SignUpResponse,
} from "../model/response.model";
import { EmailConfirmationDto } from "./dto/email-confirmation.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto): Promise<SignInResponse> {
    return await this.authService.signIn(signInDto);
  }

  @Public()
  @Post("sign-up")
  async signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResponse> {
    return await this.authService.signUp(signUpDto);
  }

  @Public()
  @Post("confirm-email")
  @HttpCode(HttpStatus.OK)
  async confirmEmail(
    @Body() emailConfirmationDto: EmailConfirmationDto,
  ): Promise<ConfirmEmailResponse> {
    return await this.authService.confirmEmail(emailConfirmationDto);
  }

  @Public()
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refresh(refreshTokenDto.refreshToken);
  }
}
