import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DatabaseHelper } from 'src/common/database/helper';
import {
  DoctorCreateDto,
  DoctorResponseDto,
  DoctorUpdateDto,
} from './dto';
@Injectable()
export class DoctorService {
  constructor(private db: DatabaseHelper) {}
  async createDoctor(doctor: DoctorCreateDto): Promise<any> {
    try {
      const procedureName = 'CreateDoctor';
      await this.db.callProcedure(procedureName, [
        doctor.clinicId,
        doctor.majorId,
        doctor.summary,
        doctor.title,
        doctor.introduction,
        doctor.email,
        doctor.gender,
        doctor.phone,
        doctor.image,
        doctor.fullName,
        doctor.birthday,
        doctor.serviceId,
        doctor.city,
        doctor.district,
        doctor.commune,
      ]);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async viewDoctorForClient(
    pageIndex: number,
    pageSize: number,
    majorId: number,
    name: string,
    clinicId: number,
  ): Promise<DoctorResponseDto[] | null> {
    try {
      const procedureName = 'ViewDoctorForClient';
      const results: DoctorResponseDto[] =
        await this.db.callProcedure(procedureName, [
          pageIndex,
          pageSize,
          majorId,
          name,
          clinicId,
        ]);
      if (Array.isArray(results) && results.length > 0) {
        const doctors: DoctorResponseDto[] = plainToInstance(
          DoctorResponseDto,
          results,
        );
        return doctors;
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async viewDoctorForAdmin(
    pageIndex: number,
    pageSize: number,
    majorId: number,
    name: string,
    clinicId: number,
  ): Promise<DoctorResponseDto[] | null> {
    try {
      const procedureName = 'ViewDoctorForAdmin';
      const results: DoctorResponseDto[] =
        await this.db.callProcedure(procedureName, [
          pageIndex,
          pageSize,
          majorId,
          name,
          clinicId,
        ]);
      if (Array.isArray(results) && results.length > 0) {
        const doctors: DoctorResponseDto[] = plainToInstance(
          DoctorResponseDto,
          results,
        );
        return doctors;
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async deleteDoctor(id: number): Promise<any> {
    try {
      const procedureName = 'DeleteDoctor';
      await this.db.callProcedure(procedureName, [id]);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async getDoctorById(id: number): Promise<DoctorResponseDto | null> {
    try {
      const procedureName = 'GetDoctorById';
      const results = await this.db.callProcedure(procedureName, [
        id,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        const doctor = plainToInstance(DoctorResponseDto, results[0]);
        return doctor;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async getDoctorByUserId(
    userId: number,
  ): Promise<DoctorResponseDto | null> {
    try {
      const procedureName = 'GetDoctorByUserId';
      const results = await this.db.callProcedure(procedureName, [
        userId,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        const doctor: DoctorResponseDto = plainToInstance(
          DoctorResponseDto,
          results[0],
        );
        return doctor;
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async updateDoctorViews(doctorId: number): Promise<any> {
    try {
      const procedureName = 'UpdateViewsDoctor';
      await this.db.callProcedure(procedureName, [doctorId]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async getCommonDoctor(
    pageIndex: number,
    pageSize: number,
  ): Promise<any> {
    try {
      const procedureName = 'GetCommonDoctor';
      const results = await this.db.callProcedure(procedureName, [
        pageIndex,
        pageSize,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        const doctors: DoctorResponseDto[] = plainToInstance(
          DoctorResponseDto,
          results,
        );
        return doctors;
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async updateAverageStars(doctorId: number): Promise<any> {
    try {
      const procedureName = 'UpdateAverageStarDoctor';
      await this.db.callProcedure(procedureName, [doctorId]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async updateDoctor(doctor: DoctorUpdateDto): Promise<any> {
    try {
      const procedureName = 'UpdateDoctor';
      await this.db.callProcedure(procedureName, [
        doctor.doctorId,
        doctor.userId,
        doctor.fullName,
        doctor.clinicId,
        doctor.majorId,
        doctor.summary,
        doctor.image,
        doctor.email,
        doctor.phone,
        doctor.gender,
        doctor.title,
        doctor.introduction,
        doctor.birthday,
        doctor.serviceId,
        doctor.city,
        doctor.district,
        doctor.commune,
      ]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
