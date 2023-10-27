import { Controller } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth("bearer-auth")
@Controller("users")
export class UserController {}
