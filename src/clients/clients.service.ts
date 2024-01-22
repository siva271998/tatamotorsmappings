import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(@InjectRepository(Client) private clientRepository: MongoRepository<Client>) { }

  async create(createClientDto: CreateClientDto) {
   
    const client = new Client()
    client.insuredName = createClientDto.insuredName
    return await this.clientRepository.save(client);
  }

  async findAll() {
    return await this.clientRepository.find();
  }

  async findOne(insuredName: string) {
    // console.log(await this.clientRepository.findOne({ where: { insuredName: insuredName } }))
    return await this.clientRepository.findOne({ where: { insuredName: insuredName } })
  }

  async update(updateClientDto: UpdateClientDto) {

    // return await this.clientRepository.updateOne({ insuredName: updateClientDto.insuredName },
    //   {
    //     $set: {

    //     }
    //   }
    // )
  }

  remove(createClientDto: CreateClientDto) {
    return;
  }
}
