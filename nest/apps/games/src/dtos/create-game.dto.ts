import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  player_one: string;

  @IsString()
  @IsNotEmpty()
  player_two: string;

  @IsString()
  @IsNotEmpty()
  move_time_limit: string;

  @IsString()
  @IsNotEmpty()
  game_time_limit: string;
}
