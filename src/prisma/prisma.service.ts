import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import 'dotenv/config'; // .env ni yuklaydi (ConfigModule bilan birgalikda – majburiy!)
import { PrismaClient } from '../generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Neon WebSocket konfiguratsiyasi (majburiy – connection parse uchun)
neonConfig.webSocketConstructor = ws;

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    console.log(
      'DATABASE_URL loaded:',
      !!connectionString
        ? 'Yes (length: ' + connectionString.length + ')'
        : 'No',
    ); // Debug
    if (
      !connectionString ||
      typeof connectionString !== 'string' ||
      connectionString.length < 50
    ) {
      throw new Error(
        `DATABASE_URL is missing or invalid: ${connectionString?.substring(0, 50) || 'undefined'}`,
      );
    }
    const adapter = new PrismaNeon({
      connectionString: connectionString as string, // Pooled URL ishlatadi
    });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('Connected to Neon DB successfully!'); // Test
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
