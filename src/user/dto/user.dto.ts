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
  @Expose()
  id: number;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Expose()
  firstName: string | null;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Expose()
  lastName: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Expose()
  email: string;

  @Exclude()
  password: string;
}
