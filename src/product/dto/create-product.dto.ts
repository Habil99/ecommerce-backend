import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(15)
  @MaxLength(300)
  description: string;
}
