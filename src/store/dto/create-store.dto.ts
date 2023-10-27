import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateStoreDto {
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsNumber()
  countryId: number;

  @IsNumber()
  cityId: number;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(300)
  address: string;

  @IsOptional()
  @IsString()
  logo: string;

  @IsOptional()
  @IsString()
  banner?: string;
}
