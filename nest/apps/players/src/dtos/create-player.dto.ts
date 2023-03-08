import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;

  @IsNotEmpty()
  @IsString()
  nickname: string;
}
