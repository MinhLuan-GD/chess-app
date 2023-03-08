import { Services } from '@app/common/constants';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(Services.PLAYERS) private readonly playersClient: ClientProxy,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const player = await lastValueFrom(
      this.playersClient.send('validate-player', {
        email,
        password,
      }),
    );
    if (player) return player;
    console.log('UnauthorizedException2-validate');
    throw new UnauthorizedException();
  }
}
