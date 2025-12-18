import { PartialType } from '@nestjs/swagger';
import { CreateXususiyatDto } from './create-xususiyat.dto';

export class UpdateXususiyatDto extends PartialType(CreateXususiyatDto) {}
