import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ versionKey: false })
export class Player {
  _id: Types.ObjectId;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  rating: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
