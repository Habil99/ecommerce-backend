import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
  @ApiProperty({
    example: "abiyevhabil3@gmail.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "Habil1410.",
  })
  @IsStrongPassword({
    minLength: 8,
  })
  password: string;
}
