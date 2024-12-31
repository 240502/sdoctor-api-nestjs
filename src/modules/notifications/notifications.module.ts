import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { DatabaseHelper } from 'src/common/database/helper';
import { Notifications } from 'src/models';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Notifications])],
  providers: [NotificationsService, DatabaseHelper],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
