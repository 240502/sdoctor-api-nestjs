import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { ClinicController } from './clinic.controller';
import { DatabaseHelper } from 'src/common/database/helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from 'src/models';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic]), AuthModule],
  providers: [ClinicService, DatabaseHelper],
  controllers: [ClinicController],
})
export class ClinicModule {}
