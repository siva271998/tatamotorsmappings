import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DummyService } from './dummy.service';
import { CreateDummyDto } from './dto/create-dummy.dto';
import { UpdateDummyDto } from './dto/update-dummy.dto';

@Controller('dummy')
export class DummyController {
  constructor(private readonly dummyService: DummyService) {}

  @Post("create")
  create(@Body() createDummyDto: CreateDummyDto) {
    return this.dummyService.create(createDummyDto);
  }
  
  @Post("agg")
  agg(@Body() createDummyDto) {
    return this.dummyService.agg(createDummyDto);
  }

  @Post()
  findAll() {
    return this.dummyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dummyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDummyDto: UpdateDummyDto) {
    return this.dummyService.update(+id, updateDummyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dummyService.remove(+id);
  }
}
