import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './modules/role/role.module';
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
  ],
})
export class AppModule {}
