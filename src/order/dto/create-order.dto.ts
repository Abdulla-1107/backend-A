import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsOptional,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @ApiProperty({ description: 'Buyurtmachi to‘liq ismi' })
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Telefon raqam' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ description: 'Manzil' })
  @IsString()
  location: string;

  @ApiProperty({ description: 'Oferta qabul qilinganmi', default: false })
  @IsBoolean()
  @IsOptional()
  oferta?: boolean;

  @ApiProperty({
    type: [CreateOrderItemDto],
    description: 'Buyurtma tarkibidagi mahsulotlar',
  })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @ArrayMinSize(1)
  orderItems: CreateOrderItemDto[];
}
