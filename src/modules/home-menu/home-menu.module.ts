import { Module } from '@nestjs/common';
import { HomeMenuService } from './home-menu.service';
import { HomeMenuController } from './home-menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeMenu } from 'src/models';
import { DatabaseHelper } from 'src/common/database/helper';

@Module({
  imports: [TypeOrmModule.forFeature([HomeMenu])],
  providers: [HomeMenuService, DatabaseHelper],
  controllers: [HomeMenuController],
})
export class HomeMenuModule {}
