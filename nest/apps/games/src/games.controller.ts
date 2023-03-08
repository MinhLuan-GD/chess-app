import { Routes, Services } from '@app/common/constants';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateGameDto } from './dtos/create-game.dto';
import { IGamesService } from './games.interface';
import { Game } from './schemas/game.schema';

@Controller(Routes.GAMES)
export class GamesController {
  constructor(
    @Inject(Services.GAMES) private readonly gamesService: IGamesService,
  ) {}

  @Get()
  async getGames(): Promise<Game[]> {
    return this.gamesService.getGames();
  }

  @Post()
  async createGame(@Body() body: CreateGameDto): Promise<Game> {
    return this.gamesService.createGame(body);
  }

  @Get(':id')
  async getGame(@Param('id') id: string): Promise<Game> {
    return this.gamesService.getGame(id);
  }

  @Get(':id/fen')
  async getFenGame(@Param('id') id: string): Promise<string | undefined> {
    return this.gamesService.getFenGame(id);
  }
}
