import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './schemas/player.schema';

export interface IPlayersService {
  createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player>;
  getPlayerByEmail(email: string): Promise<Player>;
  getPlayerById(id: string): Promise<Player>;
  updatePlayer(id: string, updatePlayerDto: Player): Promise<Player>;
  deletePlayer(id: string): Promise<void>;
  findPlayer(query: any): Promise<Player>;
  validatePlayer(email: string, password: string): Promise<any>;
}
