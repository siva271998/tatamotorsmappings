import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) { }

  @Post('create')
  create(@Body() createClaimDto) {
    return this.claimsService.create(createClaimDto);
  }


  @Post("claimperfomance")
  claimPerfomance(@Body() payload) {
    return this.claimsService.claimPerfomance(payload);
  }

  @Post("getClaimsTable")
  getClaimsTable(@Body() payload) {
    return this.claimsService.getClaimsTable(payload);

  }

  @Post()
  findAll() {
    return this.claimsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.claimsService.findOne(+id);
  }

  @Post('update')
  update(@Body() updateClaimDto: UpdateClaimDto) {
    return this.claimsService.update(updateClaimDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.claimsService.remove(+id);
  }
}
