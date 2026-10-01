import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductosController } from './productos/productos.controller.js';
import { ProductosService } from './productos/productos.service.js';

@Module({
  imports: [],
  controllers: [AppController, ProductosController],
  providers: [AppService, ProductosService],
})
export class AppModule {}
