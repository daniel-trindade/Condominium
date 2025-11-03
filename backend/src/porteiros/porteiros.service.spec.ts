import { Test, TestingModule } from '@nestjs/testing';
import { PorteirosService } from './porteiros.service';

describe('PorteirosService', () => {
  let service: PorteirosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PorteirosService],
    }).compile();

    service = module.get<PorteirosService>(PorteirosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
