import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: any, @CurrentUser() user: any) {
    return this.ordersService.create({
      ...createOrderDto,
      user: user.userId,
    });
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.ordersService.findAll(user.role === 'admin' ? null : user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: any) {
    return this.ordersService.updateStatus(id, body.status);
  }

  @Put(':id/pay')
  markAsPaid(@Param('id') id: string) {
    return this.ordersService.markAsPaid(id);
  }

  @Put(':id/deliver')
  markAsDelivered(@Param('id') id: string) {
    return this.ordersService.markAsDelivered(id);
  }
}
