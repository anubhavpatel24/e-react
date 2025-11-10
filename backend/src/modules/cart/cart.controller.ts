import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@CurrentUser() user: any) {
    return this.cartService.getCart(user.userId);
  }

  @Post('items')
  addItem(@CurrentUser() user: any, @Body() item: any) {
    return this.cartService.addItem(user.userId, item);
  }

  @Put('items/:itemId')
  updateItem(
    @CurrentUser() user: any,
    @Param('itemId') itemId: string,
    @Body() body: any,
  ) {
    return this.cartService.updateItem(user.userId, itemId, body.quantity);
  }

  @Delete('items/:itemId')
  removeItem(@CurrentUser() user: any, @Param('itemId') itemId: string) {
    return this.cartService.removeItem(user.userId, itemId);
  }

  @Delete()
  clearCart(@CurrentUser() user: any) {
    return this.cartService.clearCart(user.userId);
  }
}
