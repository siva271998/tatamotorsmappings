import { Injectable } from '@nestjs/common';
import { CreateDummyDto } from './dto/create-dummy.dto';
import { UpdateDummyDto } from './dto/update-dummy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Dummy } from './entities/dummy.entity';

@Injectable()
export class DummyService {
  constructor(@InjectRepository(Dummy) private dummysRepository: MongoRepository<Dummy>) { }

  async create(createDummyDto) {
    return await this.dummysRepository.save(createDummyDto);
  }

  async findAll() {
    return await this.dummysRepository.find();
  }

  async agg(createDummyDto) {
    const allMonths = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const res = await this.dummysRepository.aggregate([
      {
        $facet: {
          inceptionDateCounts: [
            {
              $group: {
                _id: { $month: { $toDate: "$inceptionDate" } },
                count: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 0,
                month: {
                  $switch: {
                    branches: allMonths.map((monthName, index) => ({
                      case: { $eq: ["$_id", index + 1] },
                      then: monthName
                    })),
                    default: "Unknown"
                  }
                },
                count: 1
              }
            }
          ],
          finalSettelmentDateCounts: [
            {
              $group: {
                _id: { $month: { $toDate: "$finalSettelmentDate" } },
                count: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 0,
                month: {
                  $switch: {
                    branches: allMonths.map((monthName, index) => ({
                      case: { $eq: ["$_id", index + 1] },
                      then: monthName
                    })),
                    default: "Unknown"
                  }
                },
                count: 1
              }
            }
          ]
        }
      },
      {
        $project: {
          data: {
            $map: {
              input: allMonths,
              as: "month",
              in: {
                month: "$$month",
                inceptionDateCount: {
                  $ifNull: [
                    {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$inceptionDateCounts",
                            cond: { $eq: ["$$this.month", "$$month"] }
                          }
                        },
                        0
                      ]
                    },
                    { count: 0 }
                  ]
                },
                finalSettelmentDateCount: {
                  $ifNull: [
                    {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$finalSettelmentDateCounts",
                            cond: { $eq: ["$$this.month", "$$month"] }
                          }
                        },
                        0
                      ]
                    },
                    { count: 0 }
                  ]
                }
              }
            }
          }
        }
      },
      {
        $unwind: "$data"
      },
      {
        $replaceRoot: { newRoot: "$data" }
      }
    ]).toArray();
    

    return res;
  }


  findOne(id: number) {
    return `This action returns a #${id} dummy`;
  }

  update(id: number, updateDummyDto: UpdateDummyDto) {
    return `This action updates a #${id} dummy`;
  }

  remove(id: number) {
    return `This action removes a #${id} dummy`;
  }
}
