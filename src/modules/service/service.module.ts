import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { DatabaseHelper } from 'src/common/database/helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'src/models';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  providers: [ServiceService, DatabaseHelper],
  controllers: [ServiceController],
})
export class ServiceModule {}
