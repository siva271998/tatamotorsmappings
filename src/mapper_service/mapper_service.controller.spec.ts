import { Test, TestingModule } from '@nestjs/testing';
import { MapperServiceController } from './mapper_service.controller';
import { MapperServiceService } from './mapper_service.service';

describe('MapperServiceController', () => {
  let controller: MapperServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MapperServiceController],
      providers: [MapperServiceService],
    }).compile();

    controller = module.get<MapperServiceController>(MapperServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
