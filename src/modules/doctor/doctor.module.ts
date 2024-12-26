import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/models/Doctor';
import { DatabaseHelper } from 'src/common/database/helper';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
  controllers: [DoctorController],
  providers: [DoctorService, DatabaseHelper],
})
export class DoctorModule {}
