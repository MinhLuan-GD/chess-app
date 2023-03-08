import { Routes, Services } from '@app/common/constants';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateGameDto } from './dtos/create-game.dto';
import { IGameService } from './games.interface';
import { Game } from './schemas/game.schema';

@Controller(Routes.GAMES)
export class GamesController {
  constructor(
    @Inject(Services.GAMES) private readonly gamesService: IGameService,
  ) {}

  // @Get('get-cache/:key')
  // async getCache(@Param('key') key: string): Promise<any> {
  //   return this.cacheManager.get(key);
  // }

  // @Get('set-cache/:key/:value')
  // async setCache(
  //   @Param('key') key: string,
  //   @Param('value') value: string,
  // ): Promise<any> {
  //   return this.cacheManager.set(key, value, 10000);
  // }

  @Get()
  async getGames(): Promise<Game[]> {
    return this.gamesService.getGames();
  }

  @Post()
  async createGame(@Body() body: CreateGameDto): Promise<Game> {
    return this.gamesService.createGame(body);
  }

  @Get('fen/:id')
  async getFenGame(@Param('id') id: string): Promise<string | undefined> {
    return this.gamesService.getFenGame(id);
  }

  @Get(':id')
  async getGame(@Param('id') id: string): Promise<Game> {
    return this.gamesService.getGame(id);
  }
}
