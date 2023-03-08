import { CreateGameDto } from './dtos/create-game.dto';
import { Game } from './schemas/game.schema';

export interface IGameService {
  getGame(id: string): Promise<Game>;
  getGames(): Promise<Game[]>;
  createGame(game: CreateGameDto): Promise<Game>;
  updateGame(id: string, game: Game): Promise<Game>;
  deleteGame(id: string): void;
  getFenGame(id: string): Promise<string | undefined>;
}
