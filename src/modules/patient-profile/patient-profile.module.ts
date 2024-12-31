import { Module } from '@nestjs/common';
import { PatientProfileService } from './patient-profile.service';
import { PatientProfileController } from './patient-profile.controller';
import { PatientProfile } from 'src/models';
import { DatabaseHelper } from 'src/common/database/helper';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([PatientProfile])],
  providers: [PatientProfileService, DatabaseHelper],
  controllers: [PatientProfileController],
})
export class PatientProfileModule {}
