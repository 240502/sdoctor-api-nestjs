import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { DatabaseHelper } from 'src/common/database/helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/models/Role';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleService, DatabaseHelper],
  controllers: [RoleController],
})
export class RoleModule {}
