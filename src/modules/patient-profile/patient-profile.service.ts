import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import { PatientProfile } from 'src/models';
@Injectable()
export class PatientProfileService {
  constructor(private db: DatabaseHelper) {}

  async getProfileByPhoneOrEmail(
    searchContent: string,
  ): Promise<any> {
    try {
      const procedureName = 'GetProfileByPhoneOrEmail';
      const results = await this.db.callProcedure(procedureName, [
        searchContent,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async createPatientProfile(profile: PatientProfile): Promise<any> {
    try {
      const procedureName = 'CreatePatientProfile';
      await this.db.callProcedure(procedureName, [
        profile.id,
        profile.patientName,
        profile.gender,
        profile.patientPhone,
        profile.patientEmail,
        profile.birthday,
        profile.province,
        profile.district,
        profile.commune,
        profile.uuid,
      ]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async updatePatientProfile(profile: PatientProfile): Promise<any> {
    try {
      const sql = 'UpdatePatientProfile';
      await this.db.callProcedure(sql, [
        profile.patientName,
        profile.gender,
        profile.patientPhone,
        profile.patientEmail,
        profile.birthday,
        profile.province,
        profile.district,
        profile.commune,
        profile.uuid,
      ]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async deletePatientProfile(uuid: string): Promise<any> {
    try {
      const sql = 'DeletePatientProfile';
      await this.db.callProcedure(sql, [uuid]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getPatientProfileByUuid(
    uuid: string,
  ): Promise<PatientProfile> {
    try {
      const procedureName = 'GetPatientProfileByUuid';
      const results = await this.db.callProcedure(procedureName, [
        uuid,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
