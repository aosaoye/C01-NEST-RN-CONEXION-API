import { Controller, Get } from '@nestjs/common';

@Controller('mensaje')
export class MensajeController {
  @Get()
  obtenerMensaje() {
    return {
      texto: 'Backend disponible',
    };
  }
}
