import { RmqService } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GamesModule } from './games.module';

async function bootstrap() {
  const app = await NestFactory.create(GamesModule);
  const rmqService = app.get(RmqService);
  app.connectMicroservice(rmqService.getOptions('games', true));
  app.enableVersioning();
  app.enableCors({
    origin: (process.env.ORIGIN as string).split(' '),
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  await app.listen(process.env.PORT as string);
}
bootstrap();
