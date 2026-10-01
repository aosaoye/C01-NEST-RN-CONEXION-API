import { Controller, Get } from '@nestjs/common';

@Controller('mensaje')
export class MensajeController {
    @Get()
    saludos() {
        return {
            mensaje: "Conectado"
        }
    }
}
