import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMaterialDto: CreateMaterialDto) {
    return this.prisma.material.create({
      data: createMaterialDto,
    });
  }

  async findAll() {
    return this.prisma.material.findMany({
      include: {
        product: true,
      },
    });
  }

  async findOne(id: string) {
    const material = await this.prisma.material.findFirst({
      where: { id },
      include: { product: true },
    });
    if (!material) {
      throw new NotFoundException(`Material with id ${id} not found`);
    }
    return material;
  }

  async update(id: string, updateMaterialDto: UpdateMaterialDto) {
    await this.findOne(id);
    return this.prisma.material.update({
      where: { id },
      data: updateMaterialDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.material.delete({ where: { id } });
    return { message: `Material with id ${id} deleted successfully` };
  }
}
