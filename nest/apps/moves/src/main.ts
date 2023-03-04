import { NestFactory } from '@nestjs/core';
import { MovesModule } from './moves.module';

async function bootstrap() {
  const app = await NestFactory.create(MovesModule);
  await app.listen(3000);
}
bootstrap();
