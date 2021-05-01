import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { DaftardbEntity } from '../models/daftardb.entity';
import { DaftardbService } from '../service/daftardb.service';

@Controller('daftardb')
export class DaftardbController extends BaseController<DaftardbEntity>{
    constructor(private readonly daftardbService: DaftardbService) {
        super(daftardbService);
    }
}
