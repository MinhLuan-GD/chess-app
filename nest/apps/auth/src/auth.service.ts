import { PlayerDetails } from '@app/common/types/player';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

export interface TokenPayload {
  playerId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   *
   * @param player PlayerDetails
   * @param response Response
   */
  async login(player: PlayerDetails, response: Response) {
    const tokenPayload: TokenPayload = {
      playerId: player._id,
    };

    const expires = new Date();

    const expiration = this.configService.get('JWT_EXPIRATION') ?? '7d';

    expires.setDate(expires.getDate() + 7);

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}
