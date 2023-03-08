import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, tap } from 'rxjs';
import { Services } from '../constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(Services.AUTH) private authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authentication = this.getAuthentication(context);
    return this.authClient
      .send('validate-player', {
        Authentication: authentication,
      })
      .pipe(
        tap((res) => {
          this.addPlayer(res, context);
        }),
        catchError((err) => {
          console.log(err);
          throw new UnauthorizedException();
        }),
      );
  }

  private getAuthentication(context: ExecutionContext) {
    let authentication = '';
    if (context.getType() === 'rpc') {
      authentication = context.switchToRpc().getData().Authentication;
    } else if (context.getType() === 'http') {
      authentication = context
        .switchToHttp()
        .getRequest()
        .headers.cookie?.split('Authentication=')[1];
    }
    if (!authentication) {
      throw new UnauthorizedException(
        'No value was provided for Authentication',
      );
    }
    return authentication;
  }

  private addPlayer(player: any, context: ExecutionContext) {
    console.log('player', player);
    if (context.getType() === 'rpc') {
      context.switchToRpc().getData().player = player;
    } else if (context.getType() === 'http') {
      context.switchToHttp().getRequest().player = player;
    }
  }
}
