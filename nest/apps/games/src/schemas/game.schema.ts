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

  @Prop({ required: true, type: Types.ObjectId })
  whitePlayerId: Types.ObjectId | string;

  @Prop({ required: true, type: Types.ObjectId })
  blackPlayerId: Types.ObjectId | string;

  @Prop({ required: true })
  move_time_limit: string;

  @Prop({ required: true })
  game_time_limit: string;

  @Prop({ default: [] })
  moves: string[];

  @Prop({ default: '' })
  fen: string;

  @Prop({ enum: GameStatus, type: Number, default: GameStatus.IN_PROGRESS })
  status: GameStatus;
}

export const GameSchema = SchemaFactory.createForClass(Game);
