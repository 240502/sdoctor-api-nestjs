import { Module } from '@nestjs/common';
import { MajorService } from './major.service';
import { MajorController } from './major.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Major } from 'src/models';
import { DatabaseHelper } from 'src/common/database/helper';

@Module({
  imports: [TypeOrmModule.forFeature([Major])],
  providers: [MajorService, DatabaseHelper],
  controllers: [MajorController],
})
export class MajorModule {}
