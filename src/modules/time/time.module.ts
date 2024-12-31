import { Module } from '@nestjs/common';
import { TimeService } from './time.service';
import { TimeController } from './time.controller';
import { DatabaseHelper } from 'src/common/database/helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Time } from 'src/models';
@Module({
  imports: [TypeOrmModule.forFeature([Time])],
  providers: [TimeService, DatabaseHelper],
  controllers: [TimeController],
})
export class TimeModule {}
