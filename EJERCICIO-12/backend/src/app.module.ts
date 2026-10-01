import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CriaturasController } from './criaturas/criaturas.controller.js';
import { CriaturasService } from './criaturas/criaturas.service.js';

@Module({
  imports: [],
  controllers: [AppController, CriaturasController],
  providers: [AppService, CriaturasService],
})
export class AppModule {}
