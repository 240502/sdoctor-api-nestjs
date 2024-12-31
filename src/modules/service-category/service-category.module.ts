import { Module } from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';
import { ServiceCategoryController } from './service-category.controller';
import { DatabaseHelper } from 'src/common/database/helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceCategory } from 'src/models';
@Module({
  imports: [TypeOrmModule.forFeature([ServiceCategory])],
  providers: [ServiceCategoryService, DatabaseHelper],
  controllers: [ServiceCategoryController],
})
export class ServiceCategoryModule {}
