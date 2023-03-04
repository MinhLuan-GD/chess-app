import { Controller, Get } from '@nestjs/common';
import { MovesService } from './moves.service';

@Controller()
export class MovesController {
  constructor(private readonly movesService: MovesService) {}

  @Get()
  getHello(): string {
    return this.movesService.getHello();
  }
}
