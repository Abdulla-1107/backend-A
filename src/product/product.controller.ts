import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Name bo‘yicha izlash',
  })
  @ApiQuery({
    name: 'size',
    required: false,
    description: 'O‘lcham bo‘yicha filter',
  })
  @ApiQuery({
    name: 'color',
    required: false,
    description: 'Rang bo‘yicha filter',
  })
  @ApiQuery({ name: 'priceFrom', required: false, description: 'Minimal narx' })
  @ApiQuery({ name: 'priceTo', required: false, description: 'Maksimal narx' })
  findAll(
    @Query('search') search?: string,
    @Query('size') size?: string,
    @Query('color') color?: string,
    @Query('priceFrom') priceFrom?: string,
    @Query('priceTo') priceTo?: string,
  ) {
    return this.productService.findAll({
      search,
      size: size ? parseInt(size, 10) : undefined,
      color,
      priceFrom: priceFrom ? parseInt(priceFrom, 10) : undefined,
      priceTo: priceTo ? parseInt(priceTo, 10) : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
