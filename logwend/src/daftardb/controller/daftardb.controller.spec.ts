import { Test, TestingModule } from '@nestjs/testing';
import { DaftardbController } from './daftardb.controller';

describe('DaftardbController', () => {
  let controller: DaftardbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DaftardbController],
    }).compile();

    controller = module.get<DaftardbController>(DaftardbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
