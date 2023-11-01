import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";

@ApiBearerAuth("bearer-auth")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  findCurrentUser(): Promise<UserDto> {
    return this.userService.findCurrentUser();
  }
}
