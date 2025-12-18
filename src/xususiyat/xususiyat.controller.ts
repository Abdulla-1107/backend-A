import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { XususiyatService } from './xususiyat.service';
import { CreateXususiyatDto } from './dto/create-xususiyat.dto';
import { UpdateXususiyatDto } from './dto/update-xususiyat.dto';

@Controller('xususiyat')
export class XususiyatController {
  constructor(private readonly xususiyatService: XususiyatService) {}

  @Post()
  create(@Body() createXususiyatDto: CreateXususiyatDto) {
    return this.xususiyatService.create(createXususiyatDto);
  }

  @Get()
  findAll() {
    return this.xususiyatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.xususiyatService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateXususiyatDto: UpdateXususiyatDto,
  ) {
    return this.xususiyatService.update(id, updateXususiyatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.xususiyatService.remove(id);
  }
}
