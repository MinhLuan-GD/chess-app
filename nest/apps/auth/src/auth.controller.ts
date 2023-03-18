import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import { Routes } from '@app/common/constants';
import { CurrentPlayer } from './current-player.decorator';
@Controller(Routes.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentPlayer() player: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log(player);
    await this.authService.login(player, response);
    response.send(player);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate-player')
  @Get('current-player')
  async validateUser(@CurrentPlayer() player: any) {
    return player;
  }

  @Get('logout')
  logout(@Res() res: Response) {
    // FIXME: replace base url
    this.authService.logout(res);
    return res.redirect(`http://localhost:8080/login`);
  }
}
