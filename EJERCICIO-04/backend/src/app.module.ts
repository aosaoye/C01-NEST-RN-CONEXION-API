import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { JuegosController } from './juegos/juegos.controller.js';
import { JuegosService } from './juegos/juegos.service.js';

@Module({
  imports: [],
  controllers: [AppController, JuegosController],
  providers: [AppService, JuegosService],
})
export class AppModule {}
