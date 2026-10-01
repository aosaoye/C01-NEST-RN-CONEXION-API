import { Controller, Get, Param, Query } from '@nestjs/common';
import { JuegosService, type Juego } from './juegos.service.js';

@Controller('juegos')
export class JuegosController {
    constructor(private readonly juegosService: JuegosService) {}

    @Get()
    findAll(@Query('genero') genero?: string): Juego[] {
        return this.juegosService.findAll(genero);
    }

    @Get(':genero')
    findByGenero(@Param('genero') genero: string): Juego[] {
        return this.juegosService.findAll(genero);
    }
}
