import { AbstractRepository } from '@app/common';
import { Models } from '@app/common/constants';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Player } from './schemas/player.schema';

@Injectable()
export class PlayersRepository extends AbstractRepository<Player> {
  protected readonly logger = new Logger(PlayersRepository.name);

  constructor(
    @InjectModel(Models.PLAYER) playerModel: Model<Player>,
    @InjectConnection() connection: Connection,
  ) {
    super(playerModel, connection);
  }
}
