import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createContactDto: CreateContactDto) {
    return this.prisma.contact.create({
      data: createContactDto,
    });
  }

  async findAll() {
    return this.prisma.contact.findMany();
  }

  async findOne(id: string) {
    const contact = await this.prisma.contact.findFirst({
      where: { id },
    });
    if (!contact)
      throw new NotFoundException(`Contact with id ${id} not found`);
    return contact;
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const contact = await this.prisma.contact.findFirst({ where: { id } });
    if (!contact)
      throw new NotFoundException(`Contact with id ${id} not found`);

    return this.prisma.contact.update({
      where: { id },
      data: updateContactDto,
    });
  }

  async remove(id: string) {
    const contact = await this.prisma.contact.findFirst({ where: { id } });
    if (!contact)
      throw new NotFoundException(`Contact with id ${id} not found`);

    return this.prisma.contact.delete({
      where: { id },
    });
  }
}
