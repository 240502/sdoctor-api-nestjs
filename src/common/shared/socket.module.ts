import { Module, Global } from '@nestjs/common';
import { SocketGateway } from './base.gateway';

@Global()
@Module({
  providers: [SocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}
