import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import { Clinic } from 'src/models';

@Injectable()
export class ClinicService {
  constructor(private db: DatabaseHelper) {}

  async createClinic(
    newClinic: Clinic,
  ): Promise<any> {
    try {
      const procedureName = 'CreateClinic';
      await this.db.callProcedure(procedureName, [
        newClinic.name,
        newClinic.description,
        newClinic.location,
        newClinic.avatar,
        newClinic.coverImage,
      ]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async updateClinicViews(
    clinicId: number,
  ): Promise<any> {
    try {
      const procedureName = 'UpdateViewsClinic';
      await this.db.callProcedure(procedureName, [
        clinicId,
      ]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async updateClinic(clinic: Clinic) {
    try {
      const procedureName = 'UpdateClinic';
      await this.db.callProcedure(procedureName, [
        clinic.id,
        clinic.name,
        clinic.description,
        clinic.location,
        clinic.avatar,
        clinic.coverImage,
        clinic.createdAt,
      ]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async deleteClinic(
    clinicId: number,
  ): Promise<any> {
    try {
      const procedureName = 'DeleteClinic';
      await this.db.callProcedure(procedureName, [
        clinicId,
      ]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async viewClinic(
    pageIndex: number,
    pageSize: number,
    location: string | null,
    name: string | null,
  ): Promise<Clinic[] | null> {
    try {
      const procedureName = 'GetClinicView';
      const results: Clinic[] =
        await this.db.callProcedure(
          procedureName,
          [pageIndex, pageSize, location, name],
        );
      if (
        Array.isArray(results) &&
        results.length > 0
      ) {
        return results;
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getClinicById(
    id: number,
  ): Promise<Clinic | null> {
    try {
      const procedureName = 'GetClinicById';
      const results = await this.db.callProcedure(
        procedureName,
        [id],
      );
      if (
        Array.isArray(results) &&
        results.length > 0
      ) {
        return results[0];
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getCommonClinic(): Promise<
    Clinic[] | null
  > {
    try {
      const procedureName = 'GetCommonClinic';
      const results = await this.db.callProcedure(
        procedureName,
        [],
      );
      if (
        Array.isArray(results) &&
        results.length > 0
      ) {
        return results;
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
