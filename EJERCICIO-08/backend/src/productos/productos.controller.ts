import { Controller, Get } from '@nestjs/common';
import { ProductosService, type Producto } from './productos.service.js';

@Controller('productos')
export class ProductosController {
  constructor(
    private readonly productosService: ProductosService,
  ) {}

  @Get()
  findAll(): Producto[] {
    return this.productosService.findAll();
  }
}
