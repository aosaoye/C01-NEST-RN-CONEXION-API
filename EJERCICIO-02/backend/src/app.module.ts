import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PizzasController } from './pizzas/pizzas.controller.js';
import { PizzasService } from './pizzas/pizzas.service.js';

@Module({
  imports: [],
  controllers: [AppController, PizzasController],
  providers: [AppService, PizzasService],
})
export class AppModule {}
