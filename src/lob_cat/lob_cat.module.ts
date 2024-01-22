import { Module } from '@nestjs/common';
import { LobCatService } from './lob_cat.service';
import { LobCatController } from './lob_cat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LobCat } from './entities/lob_cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LobCat])],
  providers: [LobCatService],
  controllers: [LobCatController],
  exports: [LobCatService]
})
export class LobCatModule { }
