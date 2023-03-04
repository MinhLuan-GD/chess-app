import { Injectable } from '@nestjs/common';

@Injectable()
export class MovesService {
  getHello(): string {
    return 'Hello World!';
  }
}
