import {
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(15)
  @MaxLength(300)
  description: string;

  @IsDecimal({
    decimal_digits: "8,2",
  })
  @Min(0)
  price: number;

  @IsDecimal({
    decimal_digits: "8,2",
  })
  @Min(0)
  @IsOptional()
  discount?: number;
}
