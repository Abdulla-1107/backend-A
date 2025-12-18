import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: createProductDto,
    });
    return product;
  }

  async findAll(query: {
    search?: string;
    size?: number;
    color?: string;
    priceFrom?: number;
    priceTo?: number;
  }) {
    const { search, size, color, priceFrom, priceTo } = query;

    const products = await this.prisma.product.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { name_uz: { contains: search, mode: 'insensitive' } },
                  { name_ru: { contains: search, mode: 'insensitive' } },
                  { name_en: { contains: search, mode: 'insensitive' } },
                ],
              }
            : {},
          size ? { size } : {},
          color
            ? {
                OR: [
                  { color_uz: { contains: color, mode: 'insensitive' } },
                  { color_ru: { contains: color, mode: 'insensitive' } },
                  { color_en: { contains: color, mode: 'insensitive' } },
                ],
              }
            : {},
          priceFrom || priceTo
            ? {
                price: {
                  gte: priceFrom ?? 0,
                  lte: priceTo ?? Number.MAX_SAFE_INTEGER,
                },
              }
            : {},
        ],
      },
    });

    return products;
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findFirst({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
    return updatedProduct;
  }

  async remove(id: string) {
    await this.findOne(id); // mavjudligini tekshirish
    await this.prisma.product.delete({ where: { id } });
    return { message: `Product with id ${id} deleted successfully` };
  }
}
