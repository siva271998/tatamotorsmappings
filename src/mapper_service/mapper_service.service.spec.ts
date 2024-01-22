import { Test, TestingModule } from '@nestjs/testing';
import { MapperServiceService } from './mapper_service.service';

describe('MapperServiceService', () => {
  let service: MapperServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapperServiceService],
    }).compile();

    service = module.get<MapperServiceService>(MapperServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
