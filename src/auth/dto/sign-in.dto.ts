import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
  @ApiProperty({
    example: "johndoe02@gmail.com",
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "Password123!",
  })
  @IsString()
  @IsStrongPassword({
    minLength: 8,
  })
  password: string;
}
