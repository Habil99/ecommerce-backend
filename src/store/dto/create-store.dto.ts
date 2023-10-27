import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateStoreDto {
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  banner?: string;
}
