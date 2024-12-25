import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './modules/role/role.module';
import { DatabaseHelper } from './common/database/helper';
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
      synchronize: true, // Chỉ dùng trong môi trường phát triển
    }),
    RoleModule,
  ],
  providers: [DatabaseHelper],
  exports: [DatabaseHelper],
})
export class AppModule {}
