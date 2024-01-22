import { Module } from '@nestjs/common';
import { InsurerService } from './insurer.service';
import { InsurerController } from './insurer.controller';
import { Insurer } from './entities/insurer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Insurer])],
  controllers: [InsurerController],
  providers: [InsurerService],
  exports:[InsurerService]
})
export class InsurerModule { }
