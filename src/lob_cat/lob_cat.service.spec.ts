import { Test, TestingModule } from '@nestjs/testing';
import { LobCatService } from './lob_cat.service';

describe('LobCatService', () => {
  let service: LobCatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LobCatService],
    }).compile();

    service = module.get<LobCatService>(LobCatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
