import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  whitePlayerId: string;

  @IsString()
  @IsNotEmpty()
  blackPlayerId: string;

  @IsString()
  @IsNotEmpty()
  move_time_limit: string;

  @IsString()
  @IsNotEmpty()
  game_time_limit: string;
}
