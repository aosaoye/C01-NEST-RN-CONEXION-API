import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { CriaturasService } from './criaturas.service.js';

@Controller('criaturas')
export class CriaturasController {
  constructor(
    private readonly criaturasService: CriaturasService,
  ) {}

  @Get()
  findAll() {
    return this.criaturasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const criatura = this.criaturasService.findOne(Number(id));
    if (!criatura) {
      throw new NotFoundException('Criatura no encontrada');
    }
    return criatura;
  }

  @Patch(':id/like')
  darLike(@Param('id') id: string) {
    const criatura = this.criaturasService.darLike(Number(id));
    if (!criatura) {
      throw new NotFoundException('Criatura no encontrada');
    }
    return criatura;
  }
}
