import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query() filters: any) {
    return this.productsService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: any, @CurrentUser() user: any) {
    return this.productsService.create({
      ...createProductDto,
      seller: user.userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: any) {
    return this.productsService.update(id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/reviews')
  addReview(
    @Param('id') id: string,
    @Body() reviewDto: any,
    @CurrentUser() user: any,
  ) {
    return this.productsService.addReview(id, {
      ...reviewDto,
      user: user.userId,
      createdAt: new Date(),
    });
  }
}
