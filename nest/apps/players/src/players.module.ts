import { DatabaseModule, RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { PlayerSchema } from './schemas/player.schema';
import * as Joi from 'joi';
import { Models, Services } from '@app/common/constants';
import { PlayersRepository } from './players.repository';

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
    MongooseModule.forFeature([{ name: Models.PLAYER, schema: PlayerSchema }]),
    RmqModule,
  ],
  controllers: [PlayersController],
  providers: [
    {
      provide: Services.PLAYERS,
      useClass: PlayersService,
    },
    PlayersRepository,
  ],
})
export class PlayersModule {}
