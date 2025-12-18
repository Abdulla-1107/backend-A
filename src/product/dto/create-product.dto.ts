import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsBoolean, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Mahsulot nomi (Oʻzbekcha)' })
  @IsString()
  name_uz: string;

  @ApiProperty({ description: 'Mahsulot nomi (Ruscha)' })
  @IsString()
  name_ru: string;

  @ApiProperty({ description: 'Mahsulot nomi (Inglizcha)' })
  @IsString()
  name_en: string;

  @ApiProperty({ description: 'Mavjud miqdor', minimum: 0 })
  @IsInt()
  @Min(0)
  amount: number;

  @ApiProperty({ description: 'Mahsulot narxi', minimum: 0 })
  @IsInt()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Mahsulot tavsifi' })
  @IsString()
  describtion: string;

  @ApiProperty({ description: 'Qoʻllanma mavjudligi', default: true })
  @IsBoolean()
  @IsOptional()
  has_manual?: boolean;

  @ApiProperty({ description: 'Mahsulot oʻlchami' })
  @IsInt()
  size: number;

  @ApiProperty({ description: 'Rangi (Oʻzbekcha)' })
  @IsString()
  color_uz: string;

  @ApiProperty({ description: 'Rangi (Ruscha)' })
  @IsString()
  color_ru: string;

  @ApiProperty({ description: 'Rangi (Inglizcha)' })
  @IsString()
  color_en: string;
}
