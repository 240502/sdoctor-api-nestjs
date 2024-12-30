import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import { Service } from 'src/models';

@Injectable()
export class ServiceService {
  constructor(private db: DatabaseHelper) {}
  async createService(
    service: Service,
  ): Promise<any> {
    try {
      const procedureName = 'CreateService';
      const results = await this.db.callProcedure(
        procedureName,
        [
          service.name,
          service.summary,
          service.price,
          service.clinicId,
          service.categoryId,
          service.image,
          service.preparationProcess,
          service.serviceDetail,
        ],
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
  async updateService(
    service: Service,
  ): Promise<any> {
    try {
      const procedureName = 'UpdateService';
      const results = await this.db.callProcedure(
        procedureName,
        [
          service.id,
          service.name,
          service.summary,
          service.price,
          service.clinicId,
          service.categoryId,
          service.image,
          service.preparationProcess,
          service.serviceDetail,
        ],
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

  async deleteService(id: number): Promise<any> {
    try {
      const procedureName = 'DeleteService';
      await this.db.callProcedure(procedureName, [
        id,
      ]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async updateServiceViews(
    id: number,
  ): Promise<any> {
    try {
      const procedureName = 'UpdateServiceViews';
      await this.db.callProcedure(procedureName, [
        id,
      ]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getServiceById(id: number): Promise<any> {
    try {
      const procedureName = 'GetServiceById';
      const results = await this.db.callProcedure(
        procedureName,
        [id],
      );
      if (
        Array.isArray(results) &&
        results.length > 0
      ) {
        return results[0];
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async viewService(
    pageIndex: number,
    pageSize: number,
    clinicId: number,
    categoryId: number,
    startPrice: number,
    endPrice: number,
    name: string,
  ): Promise<any> {
    try {
      const procedureName = 'ViewService';
      const results = await this.db.callProcedure(
        procedureName,
        [
          pageIndex,
          pageSize,
          clinicId,
          categoryId,
          startPrice,
          endPrice,
          name,
        ],
      );
      if (
        Array.isArray(results) &&
        results.length > 0
      ) {
        return results;
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getCommonService(): Promise<any> {
    try {
      const procedureName = 'GetCommonService';
      const results = await this.db.callProcedure(
        procedureName,
        [],
      );
      if (
        Array.isArray(results) &&
        results.length > 0
      ) {
        return results;
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
