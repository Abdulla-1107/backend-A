import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsInt, Min } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({ description: 'Mahsulot ID (UUID)' })
  @IsUUID()
  productId: string;

  @ApiProperty({ description: 'Mahsulot miqdori', default: 1 })
  @IsInt()
  @Min(1)
  quantity: number;
}
