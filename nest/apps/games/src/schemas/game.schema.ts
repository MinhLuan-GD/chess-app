import { GameStatus } from '@app/common/constants';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'games', versionKey: false })
export class Game {
  _id: Types.ObjectId;

  @Prop({ default: new Date() })
  start_time: string;

  @Prop()
  end_time?: string;

  @Prop({ required: true })
  player_one: Types.ObjectId;

  @Prop({ required: true })
  player_two: Types.ObjectId;

  @Prop({ required: true })
  move_time_limit: number;

  @Prop({ required: true })
  game_time_limit: number;

  @Prop({ enum: GameStatus })
  status: GameStatus;
}

export const GameSchema = SchemaFactory.createForClass(Game);
