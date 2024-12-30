import { Module } from '@nestjs/common';
import { DoctorServiceService } from './doctor-service.service';
import { DoctorServiceController } from './doctor-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorService } from 'src/models';
import { DatabaseHelper } from 'src/common/database/helper';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorService])],
  providers: [DoctorServiceService, DatabaseHelper],
  controllers: [DoctorServiceController],
})
export class DoctorServiceModule {}
