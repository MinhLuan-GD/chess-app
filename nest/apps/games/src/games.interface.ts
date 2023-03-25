import { FilterQuery } from 'mongoose';
import { CreateGameDto } from './dtos/create-game.dto';
import { Game } from './schemas/game.schema';

export interface IGamesService {
  getGame(id: string): Promise<Game>;
  getGames(query?: FilterQuery<Game>): Promise<Game[]>;
  getCurrentGames(query?: FilterQuery<Game>, page?: number): Promise<Game[]>;
  createGame(game: CreateGameDto): Promise<Game>;
  updateGame(id: string, game: Game): Promise<Game>;
  deleteGame(id: string): void;
  getFenGame(id: string): Promise<string | undefined>;
}
