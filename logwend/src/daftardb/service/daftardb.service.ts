import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth/auth.service';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { DaftardbEntity } from '../models/daftardb.entity';

@Injectable()
export class DaftardbService extends BaseService<DaftardbEntity> {
    constructor(
        @InjectRepository(DaftardbEntity) private readonly daftardbRepository: Repository<DaftardbEntity>,
        private authService: AuthService
    ){
        super(daftardbRepository);
    }
}
