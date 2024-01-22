import { Injectable } from '@nestjs/common';
import { CreateLobCatDto } from './dto/create-lob_cat.dto';
import { UpdateLobCatDto } from './dto/update-lob_cat.dto';
import { LobCat } from './entities/lob_cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()
export class LobCatService {
  constructor(@InjectRepository(LobCat) private lobCatRepository: MongoRepository<LobCat>) { }

  async create(createLobCatDto: CreateLobCatDto) {
    const locCate = new LobCat()
    locCate.lobCategory = createLobCatDto.lobCategory
    return await this.lobCatRepository.save(locCate);
  }

  async findAll() {
    return await this.lobCatRepository.find();
  }


  async findOne(lobCategory: string) {
    // console.log(lobCategory)/
    return await this.lobCatRepository.findOne({ where: { lobCategory: lobCategory } })
  }

  update(updateLobCatDto: UpdateLobCatDto) {
    return
  }

  remove(createLobCatDto: CreateLobCatDto) {
    return
  }
}
