import { DatabaseModule, RmqModule } from '@app/common';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { GameSchema } from './schemas/game.schema';
import { Models, Services } from '@app/common/constants';
import { GamesRepository } from './games.repository';
import { AppGateway } from './app/app.gateway';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
        MONGO_HOST: Joi.string().required(),
        MONGO_DB: Joi.string().required(),
        MONGO_USER: Joi.string().required(),
        MONGO_PASS: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        ORIGIN: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Models.GAME, schema: GameSchema }]),
    CacheModule.register(),
    RmqModule,
  ],
  controllers: [GamesController],
  providers: [
    {
      provide: Services.GAMES,
      useClass: GamesService,
    },
    GamesRepository,
    AppGateway,
  ],
})
export class GamesModule {}
