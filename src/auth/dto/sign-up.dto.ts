import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
  @ApiProperty({
    example: "John",
  })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  firstName: string;

  @ApiProperty({
    example: "Doe",
  })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  lastName: string;

  @ApiProperty({
    example: "johndoe01@gmail.com",
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "Password123!",
  })
  @IsStrongPassword({
    minLength: 8,
  })
  password: string;
}
