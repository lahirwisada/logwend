import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DaftardbController } from './controller/daftardb.controller';
import { DaftardbEntity } from './models/daftardb.entity';
import { DaftardbService } from './service/daftardb.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([DaftardbEntity]),
        AuthModule
    ],
  providers: [DaftardbService],
  controllers: [DaftardbController],
  exports: [DaftardbService]
})
export class DaftardbModule {}
