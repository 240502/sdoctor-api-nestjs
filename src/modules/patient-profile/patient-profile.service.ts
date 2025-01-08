import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import { PatientProfile } from 'src/models';
import { v4 as uuidv4 } from 'uuid';
import {
  PatientProfileCreateDto,
  PatientProfileResponse,
  PatientProfileUpdateDto,
} from './dto';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class PatientProfileService {
  constructor(private db: DatabaseHelper) {}

  async getProfileByPhoneOrEmail(
    searchContent: string,
  ): Promise<PatientProfileResponse> {
    try {
      const procedureName = 'GetProfileByPhoneOrEmail';
      const results = await this.db.callProcedure(procedureName, [
        searchContent,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(PatientProfileResponse, results[0]);
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getRecentProfile(): Promise<PatientProfileResponse> {
    try {
      const procedureName = 'GetRecentPatient';
      const results = await this.db.callProcedure(procedureName, []);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(PatientProfileResponse, results[0]);
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async createPatientProfile(
    profile: PatientProfileCreateDto,
  ): Promise<PatientProfileResponse> {
    try {
      const uuid = uuidv4();
      const recentPatient: PatientProfileResponse | null =
        await this.getRecentProfile();
      if (recentPatient) {
        const recentPatientId = recentPatient.id;
        const recentPatientIdNumber = Number(
          recentPatientId.slice(1, recentPatient.id.length),
        );
        const newPatientIdNumber = recentPatientIdNumber + 1;
        let newPatientId = newPatientIdNumber.toString();
        if (newPatientId.length < 3) {
          for (let i = 0; i <= 3 - newPatientId.length; i++) {
            newPatientId = '0' + newPatientId;
          }
        }
        newPatientId = 'P' + newPatientId;
        const procedureName = 'CreatePatientProfile';
        await this.db.callProcedure(procedureName, [
          newPatientId,
          profile.patientName,
          profile.gender,
          profile.patientPhone,
          profile.patientEmail,
          profile.birthday,
          profile.province,
          profile.district,
          profile.commune,
          uuid,
        ]);
        const newPatientProfile: PatientProfileResponse = {
          id: newPatientId,
          uuid: uuid,
          patientName: profile.patientName,
          gender: profile.gender,
          patientPhone: profile.patientPhone,
          patientEmail: profile.patientEmail,
          birthday: profile.birthday,
          province: profile.province,
          district: profile.district,
          commune: profile.commune,
          createdAt: null,
          updatedAt: null,
        };
        return newPatientProfile;
      } else {
        const procedureName = 'CreatePatientProfile';
        await this.db.callProcedure(procedureName, [
          'P001',
          profile.patientName,
          profile.gender,
          profile.patientPhone,
          profile.patientEmail,
          profile.birthday,
          profile.province,
          profile.district,
          profile.commune,
          uuid,
        ]);
        const newPatientProfile: PatientProfileResponse = {
          id: 'P001',
          uuid: uuid,
          patientName: profile.patientName,
          gender: profile.gender,
          patientPhone: profile.patientPhone,
          patientEmail: profile.patientEmail,
          birthday: profile.birthday,
          province: profile.province,
          district: profile.district,
          commune: profile.commune,
          createdAt: null,
          updatedAt: null,
        };
        return newPatientProfile;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async updatePatientProfile(
    profile: PatientProfileUpdateDto,
  ): Promise<any> {
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
  ): Promise<PatientProfileResponse> {
    try {
      const procedureName = 'GetPatientProfileByUuid';
      const results: any = await this.db.callProcedure(
        procedureName,
        [uuid],
      );
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(PatientProfileResponse, results[0]);
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
