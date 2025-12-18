import { Module } from '@nestjs/common';
import { XususiyatService } from './xususiyat.service';
import { XususiyatController } from './xususiyat.controller';

@Module({
  controllers: [XususiyatController],
  providers: [XususiyatService],
})
export class XususiyatModule {}
