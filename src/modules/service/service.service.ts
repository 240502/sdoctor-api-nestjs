import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import {
  ServiceCreateDto,
  ServiceResDto,
  ServiceUpdateDto,
  ServiceFilterDto,
} from './dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ServiceService {
  constructor(private db: DatabaseHelper) {}
  async createService(
    service: ServiceCreateDto,
  ): Promise<ServiceResDto> {
    try {
      const procedureName = 'CreateService';
      const results = await this.db.callProcedure(procedureName, [
        service.name,
        service.summary,
        service.price,
        service.clinicId,
        service.categoryId,
        service.image,
        service.preparationProcess,
        service.serviceDetail,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(ServiceResDto, results[0]);
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async updateService(
    service: ServiceUpdateDto,
  ): Promise<ServiceResDto> {
    try {
      const procedureName = 'UpdateService';
      const results = await this.db.callProcedure(procedureName, [
        service.id,
        service.name,
        service.summary,
        service.price,
        service.clinicId,
        service.categoryId,
        service.image,
        service.preparationProcess,
        service.serviceDetail,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(ServiceResDto, results[0]);
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
      await this.db.callProcedure(procedureName, [id]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async updateServiceViews(id: number): Promise<any> {
    try {
      const procedureName = 'UpdateViewService';
      await this.db.callProcedure(procedureName, [id]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getServiceById(id: number): Promise<ServiceResDto | null> {
    try {
      const procedureName = 'GetServiceById';
      const results = await this.db.callProcedure(procedureName, [
        id,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(ServiceResDto, results[0]);
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async viewService(
    body: ServiceFilterDto,
  ): Promise<ServiceResDto[] | null> {
    try {
      const procedureName = 'ViewService';
      const results = await this.db.callProcedure(procedureName, [
        body.pageIndex,
        body.pageSize,
        body.clinicId,
        body.categoryId,
        body.startPrice,
        body.endPrice,
        body.name,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(ServiceResDto, results);
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getCommonService(): Promise<ServiceResDto[] | null> {
    try {
      const procedureName = 'GetCommonService';
      const results = await this.db.callProcedure(procedureName, []);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(ServiceResDto, results);
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
