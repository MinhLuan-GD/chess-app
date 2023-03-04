import { Test, TestingModule } from '@nestjs/testing';
import { MovesController } from './moves.controller';
import { MovesService } from './moves.service';

describe('MovesController', () => {
  let movesController: MovesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MovesController],
      providers: [MovesService],
    }).compile();

    movesController = app.get<MovesController>(MovesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(movesController.getHello()).toBe('Hello World!');
    });
  });
});
