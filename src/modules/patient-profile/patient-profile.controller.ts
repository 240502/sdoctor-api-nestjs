import {
  Controller,
  HttpException,
  HttpStatus,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PatientProfile } from 'src/models';
import { PatientProfileService } from './patient-profile.service';
import {
  PatientProfileCreateDto,
  PatientProfileResponse,
  PatientProfileUpdateDto,
} from './dto';
@Controller('patient-profile')
export class PatientProfileController {
  constructor(private patientService: PatientProfileService) {}

  @Post('get-by-phone-or-email')
  async getProfileByPhoneOrEmail(
    @Body() body: { searchContent: string },
  ): Promise<PatientProfileResponse> {
    try {
      const { searchContent } = body;
      const result: PatientProfileResponse =
        await this.patientService.getProfileByPhoneOrEmail(
          searchContent,
        );
      if (result) {
        return result;
      } else
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Not found!',
          },
          HttpStatus.NOT_FOUND,
        );
    } catch (err: any) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('create')
  async createPatientProfile(
    @Body() patientProfile: PatientProfileCreateDto,
  ): Promise<any> {
    try {
      const newProfile: PatientProfileResponse =
        await this.patientService.createPatientProfile(
          patientProfile,
        );
      return { message: 'created successfully', result: newProfile };
    } catch (err: any) {
      throw new HttpException(
        { message: err.message, statusCode: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('update')
  async updatePatientProfile(
    @Body() patientProfile: PatientProfileUpdateDto,
  ): Promise<any> {
    try {
      await this.patientService.updatePatientProfile(patientProfile);
      return { message: 'updated successfully' };
    } catch (err: any) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('delete/:uuid')
  async deletePatientProfile(
    @Param('uuid') uuid: string,
  ): Promise<any> {
    try {
      await this.patientService.deletePatientProfile(uuid);
    } catch (err: any) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Get('get-by-uuid/:uuid')
  async getPatientProfileByUuid(
    @Param('uuid') uuid: string,
  ): Promise<any> {
    try {
      const result: PatientProfileResponse =
        await this.patientService.getPatientProfileByUuid(uuid);
      if (result) {
        return result;
      } else {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Không tồn tại bản ghi nào!',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (err: any) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
