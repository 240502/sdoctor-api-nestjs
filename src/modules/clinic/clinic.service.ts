import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import {
  ClinicCreateDto,
  ClinicResponseDto,
  ClinicUpdateDto,
} from './dto';
import { plainToInstance } from 'class-transformer';
import { ClinicFilterDto } from './dto/clinic-filter.dto';

@Injectable()
export class ClinicService {
  constructor(private db: DatabaseHelper) {}

  async createClinic(newClinic: ClinicCreateDto): Promise<any> {
    try {
      const procedureName = 'CreateClinic';
      const results = await this.db.callProcedure(procedureName, [
        newClinic.name,
        newClinic.description,
        newClinic.location,
        newClinic.avatar,
        newClinic.coverImage,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(ClinicResponseDto, results[0]);
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async updateClinicViews(clinicId: number): Promise<any> {
    try {
      const procedureName = 'UpdateViewsClinic';
      await this.db.callProcedure(procedureName, [clinicId]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async updateClinic(clinic: ClinicUpdateDto) {
    try {
      const procedureName = 'UpdateClinic';
      await this.db.callProcedure(procedureName, [
        clinic.id,
        clinic.name,
        clinic.description,
        clinic.location,
        clinic.avatar,
        clinic.coverImage,
      ]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async deleteClinic(clinicId: number): Promise<any> {
    try {
      const procedureName = 'DeleteClinic';
      await this.db.callProcedure(procedureName, [clinicId]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async viewClinic(
    body: ClinicFilterDto,
  ): Promise<ClinicResponseDto[] | null> {
    try {
      const procedureName = 'GetClinicView';
      const results: ClinicResponseDto[] =
        await this.db.callProcedure(procedureName, [
          body.pageIndex,
          body.pageSize,
          body.location,
          body.name,
        ]);
      if (Array.isArray(results) && results.length > 0) {
        const clinics = plainToInstance(ClinicResponseDto, results);
        return clinics;
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getClinicById(id: number): Promise<ClinicResponseDto | null> {
    try {
      const procedureName = 'GetClinicById';
      const results = await this.db.callProcedure(procedureName, [
        id,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(ClinicResponseDto, results[0]);
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getCommonClinic(): Promise<ClinicResponseDto[] | null> {
    try {
      const procedureName = 'GetCommonClinic';
      const results = await this.db.callProcedure(procedureName, []);
      if (Array.isArray(results) && results.length > 0) {
        const clinics = plainToInstance(ClinicResponseDto, results);
        return clinics;
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
