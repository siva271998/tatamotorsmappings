import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LobCatService } from './lob_cat.service';
import { CreateLobCatDto } from './dto/create-lob_cat.dto';
import { UpdateLobCatDto } from './dto/update-lob_cat.dto';

@Controller('lob-cat')
export class LobCatController {
  constructor(private readonly lobCatService: LobCatService) {}

  @Post('create')
  create(@Body() createLobCatDto: CreateLobCatDto) {
    return this.lobCatService.create(createLobCatDto);
  }

  @Post('create')
  findAll() {
    return this.lobCatService.findAll();
  }

  @Post('findOne')
  findOne(@Body("lobCategory") lobCategory: string) {
    return this.lobCatService.findOne(lobCategory);
  }

  @Post('update')
  update( @Body() updateLobCatDto: UpdateLobCatDto) {
    return this.lobCatService.update( updateLobCatDto);
  }

  @Post('remove')
  remove(@Body() createLobCatDto: CreateLobCatDto) {
    return this.lobCatService.remove(createLobCatDto);
  }
}
