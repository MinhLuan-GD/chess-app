import { CacheModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: (conf: ConfigService) => ({
        store: redisStore as any,
        host: conf.get('REDIS_HOST'),
        port: 6379,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class RedisModule {}
