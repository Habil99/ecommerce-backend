import { UserDto } from "../user/dto/user.dto";

export interface SignInResponse {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
}

export interface SignUpResponse extends UserDto {}
