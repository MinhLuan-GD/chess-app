import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false, versionKey: false })
export class Player {
  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  rating: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
