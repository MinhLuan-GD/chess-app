import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Player, PlayerSchema } from './player.schema';

@Schema({ versionKey: false })
export class Message {
  _id: Types.ObjectId;

  @Prop({ required: true, type: PlayerSchema })
  player: Player;

  @Prop({ required: true })
  text: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
