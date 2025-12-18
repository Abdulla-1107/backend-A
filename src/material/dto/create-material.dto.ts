import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateMaterialDto {
  @ApiProperty({ description: 'Mahsulot ID (UUID)' })
  @IsUUID()
  productId: string;

  @ApiProperty({ description: 'Material nomi (Oʻzbekcha)' })
  @IsString()
  name_uz: string;

  @ApiProperty({ description: 'Material nomi (Ruscha)' })
  @IsString()
  name_ru: string;

  @ApiProperty({ description: 'Material nomi (Inglizcha)' })
  @IsString()
  name_en: string;
}
