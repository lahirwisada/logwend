import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DaftardbModule } from './daftardb/daftardb.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
        host: process.env.MAIN_DB_HOST,
        port: parseInt(process.env.MAIN_DB_PORT) || 3306,
        username: process.env.MAIN_DB_USER,
        password: process.env.MAIN_DB_PASSWORD,
        database: process.env.MAIN_DB_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true
    }),
    UserModule,
    AuthModule,
    DaftardbModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
