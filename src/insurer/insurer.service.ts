import { Injectable } from '@nestjs/common';
import { CreateInsurerDto } from './dto/create-insurer.dto';
import { UpdateInsurerDto } from './dto/update-insurer.dto';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Insurer } from './entities/insurer.entity';

@Injectable()
export class InsurerService {
  constructor(@InjectRepository(Insurer) private insurerRepository: MongoRepository<Insurer>) { }


  async create(createInsurerDto: CreateInsurerDto) {
    const insurer = new Insurer()
    insurer.insurerName = createInsurerDto.insurerName
    return await this.insurerRepository.save(insurer);
  }

  async findAll() {
    return await this.insurerRepository.find();
  }


  async findOne(insurerName: string) {
    return await this.insurerRepository.findOne({ where: { insurerName: insurerName } })
  }

  update(updateInsurerDto: UpdateInsurerDto) {
    return
  }

  remove(createInsurerDto: CreateInsurerDto) {
    return
  }
}
