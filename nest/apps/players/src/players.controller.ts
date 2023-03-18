import { Routes, Services } from '@app/common/constants';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { IPlayersService } from './players.interface';

@Controller(Routes.PLAYERS)
export class PlayersController {
  constructor(
    @Inject(Services.PLAYERS) private readonly playersService: IPlayersService,
  ) {}

  @Get()
  getPlayer(@Param('id') id: string) {
    return this.playersService.getPlayerById(id);
  }

  @Post()
  createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.createPlayer(createPlayerDto);
  }

  @MessagePattern('validate-player')
  async validatePlayer(player: any) {
    return this.playersService.validatePlayer(player.email, player.password);
  }

  @MessagePattern('get-player-by-id')
  async getPlayerById(playerId: string) {
    console.log('get-player-by-id', playerId);
    return this.playersService.findPlayer({ _id: playerId });
  }
}
