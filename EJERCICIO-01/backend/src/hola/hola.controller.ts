import { Controller, Get } from '@nestjs/common';

@Controller('hola')
export class HolaController {

    @Get("/")
    saludar(){
        return "Curso DAM"
    }
}
