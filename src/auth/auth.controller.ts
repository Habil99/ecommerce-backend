import { Body, Controller, Get, Post } from "@nestjs/common";
import { SignInDto } from "./dto/sign-in.dto";
import { AuthService } from "./auth.service";
import { Public } from "../decorators/public-route.decorator";
import { SignUpDto } from "./dto/sign-up.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("sign-in")
  async signIn(@Body() signInDto: SignInDto): Promise<any> {
    return await this.authService.signIn(signInDto);
  }

  @Public()
  @Post("sign-up")
  async signUp(@Body() signUpDto: SignUpDto): Promise<any> {
    return await this.authService.signUp(signUpDto);
  }
}
