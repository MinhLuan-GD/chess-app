import { Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { IPlayersService } from './players.interface';
import { PlayersRepository } from './players.repository';
import { Player } from './schemas/player.schema';

@Injectable()
export class PlayersService implements IPlayersService {
  constructor(private readonly playersRepository: PlayersRepository) {}

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const findPlayer = await this.playersRepository.findOne({
      email: createPlayerDto.email,
    });
    if (findPlayer) throw new Error('Player already exists');
    const password = hashSync(createPlayerDto.password, 10);
    return this.playersRepository.create({ ...createPlayerDto, password });
  }

  getPlayerByEmail(email: string): Promise<Player> {
    return this.playersRepository.getOne({ email }, '-password');
  }

  getPlayerById(id: string): Promise<Player> {
    return this.playersRepository.getOne({ _id: id }, '-password');
  }

  updatePlayer(id: string, updatePlayerDto: Player): Promise<Player> {
    throw new Error('Method not implemented.');
  }

  deletePlayer(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findPlayer(query: any): Promise<Player> {
    return this.playersRepository.findOne(query, '-password');
  }

  async validatePlayer(email: string, password: string): Promise<any> {
    const player = await this.playersRepository.findOne({ email });
    if (!player) return null;
    const { password: hashPass, ...rs } = player;
    return compareSync(password, hashPass) ? rs : null;
  }
}
