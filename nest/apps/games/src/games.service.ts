import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CreateGameDto } from './dtos/create-game.dto';
import { IGamesService } from './games.interface';
import { GamesRepository } from './games.repository';
import { Game } from './schemas/game.schema';
import { Position } from 'kokopu';

@Injectable()
export class GamesService implements IGamesService {
  constructor(
    private readonly gamesRepository: GamesRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async getGame(id: string): Promise<Game> {
    return this.gamesRepository.getOne({ _id: id });
  }

  getGames(): Promise<Game[]> {
    return this.gamesRepository.find({});
  }

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    const gameClient = new Position();
    const game = await this.gamesRepository.create({
      ...createGameDto,
      fen: gameClient.fen(),
    });
    this.cacheManager.set(
      `games:${game._id.toString()}`,
      gameClient.fen(),
      Date.parse('1d'),
    );
    return game;
  }

  updateGame(id: string, game: Game): Promise<Game> {
    return this.gamesRepository.updateOne({ _id: id }, game);
  }

  deleteGame(id: string): void {
    this.gamesRepository.deleteOne({ _id: id });
    return;
  }

  getFenGame(id: string): Promise<string | undefined> {
    return this.cacheManager.get(`games:${id}`);
  }
}
