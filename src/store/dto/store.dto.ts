import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { IsFile } from "../../decorator/class-validation.decorator";
import { Expose } from "class-transformer";

export class StoreDto {
  @Expose()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @Expose()
  @IsString()
  countryId: number;

  @Expose()
  @IsString()
  cityId: number;

  @Expose()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(300)
  address: string;

  @Expose()
  @IsOptional()
  @IsFile("Logo")
  logo: string;

  @Expose()
  @IsOptional()
  @IsFile("Banner")
  banner?: string;
}
