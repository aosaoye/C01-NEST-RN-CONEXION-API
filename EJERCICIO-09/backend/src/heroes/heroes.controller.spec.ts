import { Test, TestingModule } from '@nestjs/testing';
import { HeroesController } from './heroes.controller.js';
import { HeroesService } from './heroes.service.js';

describe('HeroesController', () => {
  let controller: HeroesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroesController],
      providers: [HeroesService],
    }).compile();

    controller = module.get<HeroesController>(HeroesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find hero by id', () => {
    const heroe = controller.findOne('1');
    expect(heroe.nombre).toBe('Nova');
    expect(heroe.poder).toBe(80);
  });
});
