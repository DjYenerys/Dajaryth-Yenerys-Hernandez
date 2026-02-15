import { Injectable } from 'Taller-4/src/auth/node_modules/@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
