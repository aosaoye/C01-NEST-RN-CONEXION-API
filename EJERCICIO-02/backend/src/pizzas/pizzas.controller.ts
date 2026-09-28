import { Controller, Get } from '@nestjs/common';
import { PizzasService } from './pizzas.service.js';

@Controller('pizzas')
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) { }

  @Get()
  findAll() {
    return this.pizzasService.findAll();
  }
}
