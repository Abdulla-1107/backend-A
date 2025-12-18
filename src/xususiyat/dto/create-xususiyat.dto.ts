import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateXususiyatDto {
  @ApiProperty({ description: 'Xususiyat nomi (Oʻzbekcha)' })
  @IsString()
  name_uz: string;

  @ApiProperty({ description: 'Xususiyat nomi (Ruscha)' })
  @IsString()
  name_ru: string;

  @ApiProperty({ description: 'Xususiyat nomi (Inglizcha)' })
  @IsString()
  name_en: string;

  @ApiProperty({ description: 'Mahsulot ID (UUID)' })
  @IsUUID()
  productId: string;
}
