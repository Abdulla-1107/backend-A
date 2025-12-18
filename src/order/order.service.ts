import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createOrderDto: CreateOrderDto) {
    const { orderItems, ...orderData } = createOrderDto;

    return this.prisma.$transaction(async (prisma) => {
      for (const item of orderItems) {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });
        if (!product)
          throw new NotFoundException(
            `Product with id ${item.productId} not found`,
          );
        if (product.amount < item.quantity)
          throw new BadRequestException(
            `Product ${product.name_uz}da yetarli miqdor yo'q. Mavjud: ${product.amount}`,
          );
      }

      // 2. TotalPrice hisoblash
      const productIds = orderItems.map((item) => item.productId);
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, name_uz: true, price: true },
      });

      const totalPrice = orderItems.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return sum;
        return sum + Number(product.price) * item.quantity;
      }, 0);

      const order = await prisma.order.create({
        data: {
          ...orderData,
          totalPrice,
          orderItems: { create: orderItems },
        },
        include: {
          orderItems: { include: { product: true } },
        },
      });

      for (const item of orderItems) {
        await prisma.product.update({
          where: { id: item.productId },
          data: { amount: { decrement: item.quantity } },
        });
      }

      const BOT_TOKEN = '8343583901:AAEsIhsOr2DgLfNszyoeCli8b_X0UUaYxxo';
      const CHAT_ID = '-5067484177';

      const productList = order.orderItems
        .map((item) => `🧵 ${item.product.name_uz} — ${item.quantity} dona`)
        .join('\n');

      const message = `
  🆕 *Yangi buyurtma keldi!*
  ━━━━━━━━━━━━━━
  👤 Ism: ${order.fullName}
  📞 Telefon: ${order.phoneNumber}
  📍 Manzil: ${order.location}
  📦 Mahsulotlar:
  ${productList}
  💰 Jami: ${totalPrice.toLocaleString('uz-UZ')} so'm
  Oferta: ${order.oferta ? 'Ha' : 'Yo‘q'}
  ━━━━━━━━━━━━━━
  🕒 Sana: ${new Date().toLocaleString('uz-UZ')}
  `;

      try {
        await axios.post(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
          {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'Markdown',
          },
        );
      } catch (err) {
        console.error('Telegramga xabar yuborishda xatolik:', err.message);
      }

      return order;
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: { orderItems: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { orderItems: { include: { product: true } } },
    });

    if (!order) throw new NotFoundException(`Order with id ${id} not found`);

    return order;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.order.delete({ where: { id } });
    return { message: `Order with id ${id} deleted successfully` };
  }
}
