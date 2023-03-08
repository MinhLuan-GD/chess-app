import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../auth.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Services } from '@app/common/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    @Inject(Services.PLAYERS) private readonly playersClient: ClientProxy,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          if (request.Authentication) return request.Authentication;
          return request.headers.cookie?.split('Authentication=')[1];
        },
      ]),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate({ playerId }: TokenPayload) {
    const player = await lastValueFrom(
      this.playersClient.send('get-player-by-id', playerId),
    );
    if (player) return player;
    console.log('UnauthorizedException1-validate');
    throw new UnauthorizedException();
  }
}
