import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Post('create')
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Post("findAll")
  findAll() {
    return this.clientsService.findAll();
  }

  @Post("findOne")
  findOne(@Body("insuredName") insuredName: string) {
    return this.clientsService.findOne(insuredName);
  }

  @Post("update")
  update(@Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(updateClientDto);
  }

  @Post("remove")
  remove(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.remove(createClientDto);
  }
}
