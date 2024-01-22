import { Test, TestingModule } from '@nestjs/testing';
import { InsurerController } from './insurer.controller';
import { InsurerService } from './insurer.service';

describe('InsurerController', () => {
  let controller: InsurerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InsurerController],
      providers: [InsurerService],
    }).compile();

    controller = module.get<InsurerController>(InsurerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
