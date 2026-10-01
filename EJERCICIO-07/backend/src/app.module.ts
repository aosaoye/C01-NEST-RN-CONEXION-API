import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MensajeController } from './mensaje/mensaje.controller.js';

@Module({
  imports: [],
  controllers: [AppController, MensajeController],
  providers: [AppService],
})
export class AppModule {}
