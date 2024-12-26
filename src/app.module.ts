import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './modules/role/role.module';
import { DoctorService } from './modules/doctor/doctor.service';
import { DoctorModule } from './modules/doctor/doctor.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'sdoctor',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RoleModule,
    DoctorModule,
  ],
  providers: [],
})
export class AppModule {}
