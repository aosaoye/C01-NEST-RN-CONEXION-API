import { Test, TestingModule } from '@nestjs/testing';
import { HolaController } from './hola.controller.js';

describe('HolaController', () => {
  let controller: HolaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HolaController],
    }).compile();

    controller = module.get<HolaController>(HolaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
