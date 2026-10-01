import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HeroesController } from './heroes/heroes.controller.js';
import { HeroesService } from './heroes/heroes.service.js';

@Module({
  imports: [],
  controllers: [AppController, HeroesController],
  providers: [AppService, HeroesService],
})
export class AppModule {}
