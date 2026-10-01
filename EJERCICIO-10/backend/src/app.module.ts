import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MascotasController } from './mascotas/mascotas.controller.js';
import { MascotasService } from './mascotas/mascotas.service.js';

@Module({
  imports: [],
  controllers: [AppController, MascotasController],
  providers: [AppService, MascotasService],
})
export class AppModule {}
