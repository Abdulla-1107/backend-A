import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateXususiyatDto } from './dto/create-xususiyat.dto';
import { UpdateXususiyatDto } from './dto/update-xususiyat.dto';

@Injectable()
export class XususiyatService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createXususiyatDto: CreateXususiyatDto) {
    return this.prisma.xususiyat.create({
      data: createXususiyatDto,
    });
  }

  async findAll() {
    return this.prisma.xususiyat.findMany({
      include: { product: true }, // mahsulot ma'lumotlari bilan
    });
  }

  async findOne(id: string) {
    const xususiyat = await this.prisma.xususiyat.findFirst({
      where: { id },
      include: { product: true },
    });
    if (!xususiyat) {
      throw new NotFoundException(`Xususiyat with id ${id} not found`);
    }
    return xususiyat;
  }

  async update(id: string, updateXususiyatDto: UpdateXususiyatDto) {
    await this.findOne(id);
    return this.prisma.xususiyat.update({
      where: { id },
      data: updateXususiyatDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.xususiyat.delete({ where: { id } });
    return { message: `Xususiyat with id ${id} deleted successfully` };
  }
}
