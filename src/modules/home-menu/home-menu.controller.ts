import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HomeMenuService } from './home-menu.service';
import { HomeMenuResDto } from './dto';

@Controller('home-menu')
export class HomeMenuController {
  constructor(private homeMenuService: HomeMenuService) {}

  @Get('get-all')
  async getHomeMenu(): Promise<any> {
    try {
      const results: HomeMenuResDto[] =
        await this.homeMenuService.getHomeMenu();
      if (results) {
        return results;
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
        { statusCode: HttpStatus.BAD_REQUEST, message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
