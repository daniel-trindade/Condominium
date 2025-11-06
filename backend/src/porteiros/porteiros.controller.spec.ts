import { Test, TestingModule } from '@nestjs/testing';
import { PorteirosController } from './porteiros.controller';

describe('PorteirosController', () => {
  let controller: PorteirosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PorteirosController],
    }).compile();

    controller = module.get<PorteirosController>(PorteirosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
