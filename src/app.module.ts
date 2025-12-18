import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { MaterialModule } from './material/material.module';
import { XususiyatModule } from './xususiyat/xususiyat.module';
import { OrderModule } from './order/order.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [PrismaModule, ProductModule, MaterialModule, XususiyatModule, OrderModule, ContactModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
