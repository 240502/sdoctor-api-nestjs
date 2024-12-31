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
@Controller('patient-profile')
export class PatientProfileController {
  constructor(private patientService: PatientProfileService) {}

  @Post('get-by-phone-or-email')
  async getProfileByPhoneOrEmail(
    @Body() body: { searchContent: string },
  ): Promise<any> {
    try {
      const { searchContent } = body;
      const result =
        await this.patientService.getProfileByPhoneOrEmail(
          searchContent,
        );
      if (result) {
        return result;
      } else
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Không tồn tại bản ghi nào!',
          },
          HttpStatus.NOT_FOUND,
        );
    } catch (err: any) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Không tồn tại bản ghi nào!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('create')
  async createPatientProfile(@Body() patientProfile: PatientProfile) {
    try {
      await this.patientService.createPatientProfile(patientProfile);
      return { message: 'created successfully' };
    } catch (err: any) {
      throw new HttpException(
        { message: err.message, statusCode: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('update')
  async updatePatientProfile(
    @Body() patientProfile: PatientProfile,
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
  @Get('delete/:uuid')
  async getPatientProfileByUuid(
    @Param('uuid') uuid: string,
  ): Promise<any> {
    try {
      const result =
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
