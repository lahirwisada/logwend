import { Test, TestingModule } from '@nestjs/testing';
import { DaftardbService } from './daftardb.service';

describe('DaftardbService', () => {
  let service: DaftardbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DaftardbService],
    }).compile();

    service = module.get<DaftardbService>(DaftardbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
