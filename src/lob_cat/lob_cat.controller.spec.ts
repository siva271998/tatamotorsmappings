import { Test, TestingModule } from '@nestjs/testing';
import { LobCatController } from './lob_cat.controller';
import { LobCatService } from './lob_cat.service';

describe('LobCatController', () => {
  let controller: LobCatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LobCatController],
      providers: [LobCatService],
    }).compile();

    controller = module.get<LobCatController>(LobCatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
