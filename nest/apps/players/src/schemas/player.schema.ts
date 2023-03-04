import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  collection: 'players',
  versionKey: false,
  toJSON: {
    transform: (_doc, ret) => {
      delete ret.password;
      return ret;
    },
  },
})
export class Player {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email?: string;

  @Prop({ required: true })
  password?: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ default: 0 })
  rating: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
