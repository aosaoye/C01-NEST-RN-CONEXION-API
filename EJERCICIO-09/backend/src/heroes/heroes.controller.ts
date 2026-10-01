import { Controller, Get, Param } from '@nestjs/common';
import { HeroesService, type Heroe } from './heroes.service.js';

@Controller('heroes')
export class HeroesController {
  constructor(
    private readonly heroesService: HeroesService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string): Heroe {
    return this.heroesService.findOne(Number(id));
  }
}
