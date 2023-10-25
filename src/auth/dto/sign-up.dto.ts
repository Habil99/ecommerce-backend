import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from "class-validator";

export class SignUpDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  firstName: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
  })
  password: string;
}
