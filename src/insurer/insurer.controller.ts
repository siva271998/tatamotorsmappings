import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InsurerService } from './insurer.service';
import { CreateInsurerDto } from './dto/create-insurer.dto';
import { UpdateInsurerDto } from './dto/update-insurer.dto';

@Controller('insurer')
export class InsurerController {
  constructor(private readonly insurerService: InsurerService) { }

  @Post('create')
  create(@Body() createInsurerDto: CreateInsurerDto) {
    return this.insurerService.create(createInsurerDto);
  }

  @Post('create')
  findAll() {
    return this.insurerService.findAll();
  }

  @Post('findOne')
  findOne(@Body("insurerName") insurerName: string) {
    return this.insurerService.findOne(insurerName);
  }

  @Post('update')
  update(@Body() updateInsurerDto: UpdateInsurerDto) {
    return this.insurerService.update(updateInsurerDto);
  }

  @Post('remove')
  remove(@Body() createInsurerDto: CreateInsurerDto) {
    return this.insurerService.remove(createInsurerDto);
  }
}
