import { UserDto } from "../user/dto/user.dto";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

export interface SignInResponse {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
}

export interface SignUpResponse extends UserDto {}

export interface ConfirmEmailResponse {
  success: boolean;
  message: string;
}

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;
