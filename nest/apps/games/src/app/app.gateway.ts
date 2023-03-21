import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CACHE_MANAGER, Inject, Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { GamesRepository } from '../games.repository';
import { Cache } from 'cache-manager';
import { Position } from 'kokopu';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    transports: ['websocket', 'polling'],
    credentials: true,
  },
  allowEIO3: true,
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  constructor(
    private readonly gamesRepository: GamesRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @SubscribeMessage('move')
  async move(_client: Socket, payload: any) {
    const fen = await this.getFenGame(payload.game);
    if (fen) {
      const position = new Position(fen);
      position.play(payload.move);
      this.cacheManager.set(
        `games:${payload.game}`,
        position.fen(),
        Date.parse('1d'),
      );
      this.server.emit(
        `game:${payload.game}:turn:${position.turn()}`,
        payload.move,
      );
      this.gamesRepository.updateOne(
        { _id: payload.game },
        {
          $set: {
            fen: position.fen(),
          },
          $push: {
            moves: payload.move,
          },
        },
      );
    } else {
      const game = await this.gamesRepository.findOne({ _id: payload.game });
      if (game) {
        const position = new Position(game.fen);
        position.play(payload.move);
        this.cacheManager.set(
          `games:${payload.game}`,
          position.fen(),
          Date.parse('1d'),
        );
        this.server.emit(
          `game:${payload.game}:turn:${position.turn()}`,
          payload.move,
        );
        this.gamesRepository.updateOne(
          { _id: payload.game },
          {
            $set: {
              fen: position.fen(),
            },
            $push: {
              moves: payload.move,
            },
          },
        );
      }
    }
  }

  @SubscribeMessage('message')
  async message(_client: Socket, payload: any) {
    this.server.emit(`game:${payload.game}:message`, payload.message);
    this.gamesRepository.updateOne(
      { _id: payload.game },
      {
        $push: {
          messages: payload.message,
        },
      },
    );
  }

  @SubscribeMessage('join')
  async handleJoin(_client: Socket, payload: any) {
    const userWatchedGames = (await this.cacheManager.get(
      'user:watched',
    )) as string;
    if (userWatchedGames) {
      const gameClient = new Position();
      const game = await this.gamesRepository.create({
        whitePlayerId: payload.userId,
        blackPlayerId: userWatchedGames,
        game_time_limit: '2m',
        move_time_limit: '30m',
        fen: gameClient.fen(),
      });
      this.cacheManager.set(
        `games:${game._id.toString()}`,
        gameClient.fen(),
        Date.parse('1d'),
      );
      this.cacheManager.del('user:watched');
      this.server.emit(`games:${payload.userId}:created`, game._id);
      this.server.emit(`games:${userWatchedGames}:created`, game._id);
    } else {
      this.cacheManager.set('user:watched', payload.userId, 900000);
    }
  }

  @SubscribeMessage('cancel')
  async joinCancel(_client: Socket, _payload: any) {
    this.cacheManager.del('user:watched');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(_server: Server) {
    this.logger.log('Init');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: Socket, ..._args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  getFenGame(id: string): Promise<string | undefined> {
    return this.cacheManager.get(`games:${id}`);
  }
}
