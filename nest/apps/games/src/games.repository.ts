import { AbstractRepository } from '@app/common';
import { Models } from '@app/common/constants';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Game } from './schemas/game.schema';

@Injectable()
export class GamesRepository extends AbstractRepository<Game> {
  protected readonly logger = new Logger(GamesRepository.name);

  constructor(
    @InjectModel(Models.GAME) gameModel: Model<Game>,
    @InjectConnection() connection: Connection,
  ) {
    super(gameModel, connection);
  }
}
