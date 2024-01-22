import { Injectable } from '@nestjs/common';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { Policy } from './entities/policy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class PoliciesService {
  constructor(@InjectRepository(Policy) private policiesRepository: MongoRepository<Policy>) { }


  async create(createPolicyDto: CreatePolicyDto) {
    const policy = new Policy()
    policy.relationshipManager = createPolicyDto.relationship_manager
    policy.controlNumber = createPolicyDto.control_number
    policy.customerCode = createPolicyDto.customer_code
    policy.insuredName = createPolicyDto.insured_name
    policy.policyNumber = createPolicyDto.policy_number
    policy.lobCategory = createPolicyDto.lob_category
    policy.lobType = createPolicyDto.lob_type
    policy.lobTypeOfPolicy = createPolicyDto.lob_type_of_policy
    policy.insurerName = createPolicyDto.insurer_name
    policy.insurerBranch = createPolicyDto.insurer_branch
    policy.tmibaslBranch = createPolicyDto.TMIBASL_branch
    policy.inceptionDate = createPolicyDto.inception_date
    policy.expiryDate = createPolicyDto.expiry_date
    policy.policyTerm = createPolicyDto.policy_term
    policy.premiumAmount = createPolicyDto.premium_amount
    policy.sumInsuredLimit = createPolicyDto.sum_insured_limit
    policy.status = createPolicyDto.status
    policy.totalSumInsured = createPolicyDto.total_sum_insured
    policy.totalPremiumAmount = createPolicyDto.total_premium_amount
    // console.log(policy)
    return await this.policiesRepository.save(policy);
  }

  async getAllpolicies() {
    return await this.policiesRepository.find()
  }
  /* const policiesData = await this.policiesRepository.aggregate([
    {
      $match: {
        inceptionDate: {
          $gte: policyYear.startDate,
          $lt: policyYear.endDate
        },
      },
    },
    {
      $lookup: {
        from: "tata_client",
        localField: "insuredName",
        foreignField: "_id",
        as: "insuredName"
      }
    },
    {
      $unwind: "$insuredName"
    },
    {
      $lookup: {
        from: "tata_lob_cat",
        localField: "lobCategory",
        foreignField: "_id",
        as: "lobCategoryInfo"
      }
    },
    {
      $unwind: "$lobCategoryInfo"
    },
    {
      $group: {
        _id: {
          insuredName: "$insuredName.insuredName",
          lobCategory: "$lobCategoryInfo.lobCategory",
          lobType: "$lobType",
        },
        numOfPolicies: { $sum: 1 },
        sumInsured: { $sum: "$sumInsuredLimit" },
        premiumAmt: { $sum: "$premiumAmount" },
      }
    },
    {
      $project: {
        _id: 0,
        policyYear: { $concat: [policyYear.startDate, "-", policyYear.endDate] },
        customerName: "$_id.insuredName",
        numOfPolicies: 1,
        sumInsured: { $concat: ["₹", { $toString: "$sumInsured" }] },
        premiumAmt: { $concat: ["₹", { $toString: "$premiumAmt" }] },
        data: {
          lobCategory: "$_id.lobCategory",
          lobType: "$_id.lobType",
          numOfPolicies: "$numOfPolicies",
          sumInsured: "$sumInsured",
          premiumAmt: "$premiumAmt"
        },
      }
    },
    {
      $group: {
        _id: {
          policyYear: "$policyYear",
          customerName: "$customerName",
          lobCategory: "$data.lobCategory",
        },
        data: {
          $push: "$data"
        },
        numOfPolicies: { $sum: "$numOfPolicies" },
        sumInsured: { $sum: "$sumInsured" },
        premiumAmt: { $sum: "$premiumAmt" },
      }
    },
    {
      $project: {
        _id: 0,
        policyYear: "$_id.policyYear",
        customerName: "$_id.customerName",
        numOfPolicies: "$numOfPolicies",
        sumInsured: { $concat: ["₹", { $toString: "$sumInsured" }] },
        premiumAmt: { $concat: ["₹", { $toString: "$premiumAmt" }] },
        data: "$data",
      }
    },
  ]).toArray(); */
  async policies(policyYear) {
    const policiesData = await this.policiesRepository.aggregate([
      {
        $match: {
          // inceptionDate: {
          //   $gte: policyYear.startDate,
          //   $lt: policyYear.endDate
          // },
          $or: [
            {
              inceptionDate: {
                $gte: policyYear.startDate,
                $lt: policyYear.endDate,
              },
            },
            {
              expiryDate: {
                $gte: policyYear.startDate,
                $lt: policyYear.endDate,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "tata_client",
          localField: "insuredName",
          foreignField: "_id",
          as: "insuredName"
        }
      },
      {
        $unwind: "$insuredName"
      },
      {
        $lookup: {
          from: "tata_lob_cat",
          localField: "lobCategory",
          foreignField: "_id",
          as: "lobCategoryInfo"
        }
      },
      {
        $unwind: "$lobCategoryInfo"
      },
      {
        $group: {
          _id: {
            inceptionDate: { $year: { $dateFromString: { dateString: "$inceptionDate" } } },
            expiryDate: { $year: { $dateFromString: { dateString: "$expiryDate" } } },
            insuredName: "$insuredName.insuredName",
            lobCategory: "$lobCategoryInfo.lobCategory",
            lobType: "$lobType",
          },
          numOfPolicies: { $sum: 1 },
          estimatedLoss: { $sum: "$sumInsuredLimit" },
          premiumAmt: { $sum: "$premiumAmount" },
        }
      },
      {
        $project: {
          _id: 0,
          // inceptionDate: "$_id.inceptionDate",
          // expiryDate: "$_id.expiryDate",
          policyYear: { $concat: [{ $toString: "$_id.inceptionDate" }, "-", { $toString: "$_id.expiryDate" }] },
          customerName: "$_id.insuredName",
          numOfPolicies: 1,
          sumInsured: { $concat: ["₹", { $toString: "$sumInsured" }] },
          premiumAmt: { $concat: ["₹", { $toString: "$premiumAmt" }] },
          data: {
            lobCategory: "$_id.lobCategory",
            lobType: "$_id.lobType",
            numOfPolicies: "$numOfPolicies",
            sumInsured: "$sumInsured",
            premiumAmt: "$premiumAmt"
          },
        }
      },
      {
        $group: {
          _id: {
            // inceptionDate: "$inceptionDate",
            // expiryDate: "$expiryDate",
            policyYear: "$policyYear",
            customerName: "$customerName",
            // sumInsured:"$sumInsured",
            lobCategory: "$data.lobCategory",
          },
          data: {
            $push: {
              lobType: "$data.lobType",
              numOfPolicies: "$data.numOfPolicies",
              // sumInsured: "$data.sumInsured",
              sumInsured: { $concat: ["₹", { $toString: "$data.sumInsured" }] },
              premiumAmt: { $concat: ["₹", { $toString: "$data.premiumAmt" }] },
              // premiumAmt: "$data.premiumAmt",
            },
          },
          numOfPolicies: { $sum: "$numOfPolicies" },
          sumInsured: { $sum: "$data.sumInsured" },
          premiumAmt: { $sum: "$data.premiumAmt" },
        }
      },
      {
        $group: {
          _id: {
            // inceptionDate: "$_id.inceptionDate",
            // expiryDate: "$_id.expiryDate",
            policyYear: "$_id.policyYear",
            customerName: "$_id.customerName",
          },
          data: {
            $push: {
              lobCategory: "$_id.lobCategory",
              details: "$data",
            },
          },
          numOfPolicies: { $sum: "$numOfPolicies" },
          sumInsured: { $sum: "$sumInsured" },
          premiumAmt: { $sum: "$premiumAmt" },
        },
      },
      {
        $project: {
          _id: 0,
          // inceptionDate: "$_id.inceptionDate",
          // expiryDate: "$_id.expiryDate",
          policyYear: "$_id.policyYear",
          customerName: "$_id.customerName",
          numOfPolicies: "$numOfPolicies",
          sumInsured: { $concat: ["₹", { $toString: "$sumInsured" }] },
          premiumAmt: { $concat: ["₹", { $toString: "$premiumAmt" }] },
          data: {
            $arrayToObject: {
              $map: {
                input: "$data",
                as: "item",
                in: {
                  k: { $toString: "$$item.lobCategory" },
                  v: "$$item.details",
                },
              },
            },
          },
        }
      },
    ]).toArray();
    return policiesData;
  }

  // async demo(policyYear) {
  //   const policiesData = await this.policiesRepository.aggregate([
  //     {
  //       $facet: {
  //         total: [
  //         ],
  //         bifurcation: [
  //         ]
  //       }
  //     }
  //   ]).toArray();
  //   return policiesData;
  // }

  async snapShotDropDown(payload) {
    const res = await this.policiesRepository.aggregate([
      {
        $facet: {
          clientDropDown: [
            // {
            //   $match:{

            //   }
            {
              $group: {
                _id: "$insuredName",
              }
            },
            {
              $lookup: {
                from: "tata_client",
                localField: "_id",
                foreignField: "_id",
                as: "clientName"
              }
            },
            {
              $unwind: "$clientName"
            },
            {
              $project: {
                _id: 0,
                clientName: 1
              }
            }
          ],
          insurerDropDown: [
            // {
            //   $match:{

            //   }
            {
              $group: {
                _id: "$insurerName",
              }
            },
            {
              $lookup: {
                from: "tata_insurer",
                localField: "_id",
                foreignField: "_id",
                as: "insurerName"
              }
            },
            {
              $unwind: "$insurerName"
            },
            {
              $project: {
                _id: 0,
                insurerName: 1
              }
            }
          ],
          ProductTypeDropDown: [
            // {
            //   $match:{

            //   }
            // },
            {
              $group: {
                _id: {
                  lobType: "$lobType"

                },
                // count: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 0,
                lobType: "$_id.lobType"
              }
            }
          ]
        }
      }
    ]).toArray()

    return res
  }


  async policySnapShot(payload) {
    const { insuredName, insurerName, lobType, inceptionDate } = payload
    // console.log(payload)
    // const whereCondition: any = {
    //   insuredName: new ObjectId(insuredName),
    //   lobType: lobType,
    // };
    // // "inceptionDate": "2019-05-19",

    // if (insurerName) {
    //   // Only include insurerName in the query if it is provided and not empty.
    //   whereCondition.insurerName = new ObjectId(insurerName);
    // } else if (inceptionDate) {
    //   whereCondition.inceptionDate = inceptionDate;
    // } else {
    //   whereCondition.insurerName = new ObjectId(insurerName);
    //   whereCondition.inceptionDate = inceptionDate;
    // }

    // const res = await this.policiesRepository.find({
    //   where: whereCondition,
    // });
    // console.log(res.length)
    const pipeline = [
      {
        $match: {
          // insuredName: new ObjectId(insuredName),
          // lobType: lobType,
          ...(insuredName ? { insuredName: new ObjectId(insuredName) } : {}),
          ...(lobType ? { lobType: lobType } : {}),
          ...(insurerName ? { insurerName: new ObjectId(insurerName) } : {}),
        },
      },
      {
        $lookup: {
          from: "tata_client",
          localField: "insuredName",
          foreignField: "_id",
          as: "insuredName"
        }
      },
      {
        $lookup: {
          from: "tata_insurer",
          localField: "insurerName",
          foreignField: "_id",
          as: "insurerName"
        }
      },
      {
        $project:{  
          "policyNumber": 1,
          "lobTypeOfPolicy": 1,
          "insuredName": 1,
          "insurerName": 1,
          "inceptionDate": 1,
          "expiryDate": 1,
          // "lobCategory": "659bad82e9cd725a68288eb7",
          // "lobType": "Marine Cargo",
          // "insurerBranch": "2ND FLOOR, CITY TOWER, NEXT TO MAHATMA GANDHI HOSPITAL, DR. S.S. RAO ROAD, PAREL EAST, MUMBAI-400012",
          // "tmibaslBranch": "Mumbai",
          // "policyTerm": 1,
          // "premiumAmount": 172085.54,
          // "sumInsuredLimit": 1041680000,
          // "status": 0,
          // "totalSumInsured": 5208400000,
          // "totalPremiumAmount": 860427.68
        }
      }
      // Additional stages in your pipeline if needed
    ];

    const res = await this.policiesRepository.aggregate(pipeline).toArray();

    return res
  }

  findOne(createPolicyDto: CreatePolicyDto) {
    return
  }

  update(updatePolicyDto: UpdatePolicyDto) {
    return
  }

  remove(createPolicyDto: CreatePolicyDto) {
    return
  }
}
