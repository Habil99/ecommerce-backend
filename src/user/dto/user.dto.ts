import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: number;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  firstName: string | null;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  lastName: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Exclude()
  password: string;
}
