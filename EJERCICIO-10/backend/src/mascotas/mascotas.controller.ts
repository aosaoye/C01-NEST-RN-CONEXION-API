import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { MascotasService } from './mascotas.service.js';

@Controller('mascotas')
export class MascotasController {
  constructor(
    private readonly mascotasService: MascotasService,
  ) {}

  @Get()
  findAll() {
    return this.mascotasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const mascota = this.mascotasService.findOne(Number(id));
    if (!mascota) {
      throw new NotFoundException('Mascota no encontrada');
    }
    return mascota;
  }

  @Patch(':id/like')
  darLike(@Param('id') id: string) {
    const mascota = this.mascotasService.darLike(Number(id));
    if (!mascota) {
      throw new NotFoundException('Mascota no encontrada');
    }
    return mascota;
  }
}
