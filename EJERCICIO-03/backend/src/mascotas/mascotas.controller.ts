import { Controller, Get, Param } from '@nestjs/common';
import { MascotasService } from './mascotas.service.js';
import type { Pet } from './mascotas.service.js';

@Controller('mascotas')
export class MascotasController {
    constructor(private readonly mascotasService: MascotasService) {}

    @Get()
    findAll(): Promise<Pet[]> {
        return this.mascotasService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Pet> {
        return this.mascotasService.findOne(+id);
    }
}
