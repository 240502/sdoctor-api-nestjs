import { Injectable, Query } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import { Doctor } from 'src/models/Doctor';
@Injectable()
export class DoctorService {
  constructor(private db: DatabaseHelper) {}
  async createDoctor(doctor: Doctor): Promise<any> {
    try {
      const procedureName = 'CreateDoctor';
      await this.db.callProcedure(procedureName, [
        doctor.clinicId,
        doctor.majorId,
        doctor.summary,
        doctor.title,
        doctor.introduction,
        doctor.user.email,
        doctor.user.gender,
        doctor.user.phone,
        doctor.user.image,
        doctor.user.fullName,
        doctor.user.birthday,
        doctor.serviceId,
        doctor.user.city,
        doctor.user.district,
        doctor.user.commune,
      ]);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async viewDoctor(
    pageIndex: number,
    pageSize: number,
    majorId: number,
    name: string,
    clinicId: number,
  ): Promise<Doctor[] | null> {
    try {
      const procedureName = 'GetDoctorView';
      const results = await this.db.callProcedure(procedureName, [
        pageIndex,
        pageSize,
        majorId,
        name,
        clinicId,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        console.log(results);
        return results;
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

  async getDoctorById(id: number): Promise<Doctor | null> {
    try {
      const procedureName = 'GetDoctorById';
      const results = await this.db.callProcedure(procedureName, [id]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
