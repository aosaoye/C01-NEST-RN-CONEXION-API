import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { ProductosService } from './productos.service.js';

@Controller('productos')
export class ProductosController {
  constructor(
    private readonly productosService: ProductosService,
  ) {}

  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @Post()
  crear(
    @Body()
    producto: {
      nombre: string;
      precio: number;
    },
  ) {
    if (!producto || !producto.nombre || producto.precio === undefined) {
      throw new BadRequestException('El nombre y el precio son obligatorios');
    }
    return this.productosService.crear(producto);
  }
}
