import { Injectable } from '@nestjs/common';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Claim } from './entities/claim.entity';
import { MongoRepository, Repository } from 'typeorm';
import { ApiResponseStatus } from 'src/shared/common';
import { zeroRes } from 'src/shared/manualResponse';

@Injectable()
export class ClaimsService {
  constructor(@InjectRepository(Claim) private claimsRepository: MongoRepository<Claim>) { }

  async create(createClaimDto) {
    const claims = new Claim()
    claims.claimsYear = createClaimDto.policy_period
    claims.clientName = createClaimDto.insured_name
    claims.claimsEstimate = createClaimDto.InitialestimateofLoss//not having
    claims.settledAmount = createClaimDto.FinalSettlementAmountinINR
    claims.pendingAmount = createClaimDto.BalanceamountSettled === "NULL" ? 0 : createClaimDto.BalanceamountSettled
    claims.rejectedAount = 0 /* createClaimDto.rejectedAount//not having */
    claims.productType = createClaimDto.productType
    claims.tmbibaslClaimNo = createClaimDto.TMIBASL_No
    claims.policyNumber = createClaimDto.policy_id
    claims.insurerName = createClaimDto.insurer_name
    claims.lobCategory = createClaimDto.lobCategory
    claims.policyType = createClaimDto.type_of_policy
    claims.lineOfBusiness = createClaimDto.line_of_business
    claims.outstandingAmount = createClaimDto.OutstandingReserve
    claims.surveyor = createClaimDto.surveyor///not having
    claims.estimatedLoss = createClaimDto.loss_estimation
    claims.natureOfLoss = createClaimDto.nature_cause_of_Loss
    claims.dateOfLoss = createClaimDto.date_of_loss
    claims.dateOfIntimationToTmibasl = createClaimDto.date_of_intimation_TMIBASL
    claims.inceptionDate = createClaimDto.inception_date
    claims.expiryDate = createClaimDto.expiry_date
    claims.ClaimStatus = createClaimDto.ClaimStatus
    claims.status = createClaimDto.status
    claims.FinalSettlementDate = createClaimDto.FinalSettlementDate
    return await this.claimsRepository.save(claims);

  }
  // async claimPerfomance(payload) {
  //   const { startDate, endDate, lobCategory } = payload
  //   const allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  //   let getClaimsPerformance = await this.claimsRepository.aggregate([
  //     {
  //       $match: {
  //         inceptionDate: {
  //           $gte: `${startDate}-01-01`,
  //           $lt: `${endDate}-01-01`
  //         },
  //         lobCategory: lobCategory,
  //         // FinalSettlementDate: {
  //         //   $gte: `${startDate}-01-01`,
  //         //   $lt: `${endDate}-01-01`
  //         // },

  //         // $or: [
  //         //   {
  //         //     inceptionDate: {
  //         //       $gte: policyYear.startDate,
  //         //       $lt: policyYear.endDate,
  //         //     },
  //         //   },
  //         //   {
  //         //     expiryDate: {
  //         //       $gte: policyYear.startDate,
  //         //       $lt: policyYear.endDate,
  //         //     },
  //         //   },
  //         // ],
  //       },
  //     },
  //     {
  //       $group: {
  //         _id: {
  //           month: { $substr: ["$inceptionDate", 5, 2] },
  //           year: { $substr: ["$inceptionDate", 0, 4] },
  //           // FinalSettlementmonth:{ $substr: ["$FinalSettlementDate", 5, 2] },
  //           // FinalSettlementyear: { $substr: ["$FinalSettlementDate", 0, 4] },

  //         },
  //         count: { $sum: 1 }
  //       }
  //     },
  //     {
  //       $project: {
  //         _id: 1,
  //         month: {
  //           $concat: [
  //             {
  //               $switch: {
  //                 branches: [
  //                   { case: { $eq: ["$_id.month", "01"] }, then: "January" },
  //                   { case: { $eq: ["$_id.month", "02"] }, then: "February" },
  //                   { case: { $eq: ["$_id.month", "03"] }, then: "March" },
  //                   { case: { $eq: ["$_id.month", "04"] }, then: "April" },
  //                   { case: { $eq: ["$_id.month", "05"] }, then: "May" },
  //                   { case: { $eq: ["$_id.month", "06"] }, then: "June" },
  //                   { case: { $eq: ["$_id.month", "07"] }, then: "July" },
  //                   { case: { $eq: ["$_id.month", "08"] }, then: "August" },
  //                   { case: { $eq: ["$_id.month", "09"] }, then: "September" },
  //                   { case: { $eq: ["$_id.month", "10"] }, then: "October" },
  //                   { case: { $eq: ["$_id.month", "11"] }, then: "November" },
  //                   { case: { $eq: ["$_id.month", "12"] }, then: "December" },
  //                   { case: { $eq: ["$_id.month", "Unknown"] }, then: "Unknown" }
  //                 ],
  //                 default: 0
  //               }
  //             },
  //           ]

  //         },
  //         count: 1
  //       }
  //     },
  //     {
  //       $group: {
  //         _id: null,
  //         data: { $push: "$$ROOT" }
  //       }
  //     },
  //     {
  //       $project: {
  //         _id: 0,
  //         // data:"$data"
  //         data: {
  //           $map: {
  //             input: allMonths,
  //             as: "month",
  //             in: {
  //               month: "$$month",
  //               count: {
  //                 $ifNull: [
  //                   { $arrayElemAt: [{ $filter: { input: "$data", cond: { $eq: ["$$this.month", "$$month"] } } }, 0] },
  //                   { count: 0 }
  //                 ]
  //               }
  //             }
  //           }
  //         }
  //       }
  //     },
  //     {
  //       $unwind: "$data"
  //     },
  //     {
  //       $replaceRoot: { newRoot: "$data" }
  //     },
  //     {
  //       $project: {
  //         month: "$$ROOT.month",
  //         count: "$$ROOT.count.count"
  //       }
  //     }
  //   ]).toArray()
  //   const response = {
  //     getClaimsPerformance,
  //   }
  //   return response
  // }

  async claimPerfomance(payload) {
    ///want to map the lobCategory
    const allMonths = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const { startDate, endDate, lobCategory } = payload

    const res = await this.claimsRepository.aggregate([
      {
        $facet: {
          inceptionDateCounts: [
            {
              $match: {
                inceptionDate: {
                  $gte: `${startDate}-01-01`,
                  $lt: `${endDate}-01-01`
                },
                // lobCategory: lobCategory,
                // FinalSettlementDate: {
                //   $gte: `${startDate}-01-01`,
                //   $lt: `${endDate}-01-01`
                // },

                // $or: [
                //   {
                //     inceptionDate: {
                //       $gte: policyYear.startDate,
                //       $lt: policyYear.endDate,
                //     },
                //   },
                //   {
                //     expiryDate: {
                //       $gte: policyYear.startDate,
                //       $lt: policyYear.endDate,
                //     },
                //   },
                // ],
              },
            },
            // {
            //   $group: {
            //     _id: {
            //       $month: { $toDate: "$inceptionDate" },
            //       $year: { $toDate: ["$inceptionDate"] },
            //     },
            //     count: { $sum: 1 }
            //   }
            // },
            {
              $group: {
                _id: {
                  $month: { $toDate: "$inceptionDate" },

                  // month: { $substr: ["$inceptionDate", 5, 2] },
                  // year: { $substr: ["$inceptionDate", 0, 4] },
                  // FinalSettlementmonth:{ $substr: ["$FinalSettlementDate", 5, 2] },
                  // FinalSettlementyear: { $substr: ["$FinalSettlementDate", 0, 4] },

                },
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
              $match: {
                // inceptionDate: {
                //   $gte: `${startDate}-01-01`,
                //   $lt: `${endDate}-01-01`
                // },
                // lobCategory: lobCategory,
                FinalSettlementDate: {
                  $gte: `${startDate}-01-01`,
                  $lt: `${endDate}-01-01`
                },

                // $or: [
                //   {
                //     inceptionDate: {
                //       $gte: policyYear.startDate,
                //       $lt: policyYear.endDate,
                //     },
                //   },
                //   {
                //     expiryDate: {
                //       $gte: policyYear.startDate,
                //       $lt: policyYear.endDate,
                //     },
                //   },
                // ],
              },
            },
            {
              $group: {
                _id: { $month: { $toDate: "$FinalSettlementDate" } },
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
      },
      {
        $project: {
          month: "$$ROOT.month",
          "Report Claims": "$$ROOT.inceptionDateCount.count",
          "Settled Claims": "$$ROOT.finalSettelmentDateCount.count"
        }
      }
    ]).toArray();

    const sendRes = {
      status: ApiResponseStatus.SUCCESS,
      data: res ? res : zeroRes
    }
    return sendRes
  }

  async getClaimsTable(payload) {
    const { startDate, endDate } = payload

    const res = await this.claimsRepository.aggregate([
      {
        $match: {
          $or: [
            {
              inceptionDate: {
                $gte: startDate,
                $lt: endDate,
              },
            },
            {
              expiryDate: {
                $gte: startDate,
                $lt: endDate,
              },
            },
          ],
        }
      },
      {
        $lookup: {
          from: "tata_client",
          localField: "clientName",
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
            lobType: "$productType",
          },
          numOfClaims: { $sum: 1 },
          claimsEstimate: { $sum: "$claimsEstimate" },
          settledAmount: { $sum: "$settledAmount" },
        }
      },
      {
        $project: {
          _id: 0,
          // inceptionDate: "$_id.inceptionDate",
          // expiryDate: "$_id.expiryDate",
          ClaimYear: { $concat: [{ $toString: "$_id.inceptionDate" }, "-", { $toString: "$_id.expiryDate" }] },
          customerName: "$_id.insuredName",
          numOfClaims: 1,
          claimsEstimate: { $concat: ["₹", { $toString: "$claimsEstimate" }] },
          settledAmount: { $concat: ["₹", { $toString: "$settledAmount" }] },
          data: {
            lobCategory: "$_id.lobCategory",
            lobType: "$_id.lobType",
            numOfClaims: "$numOfClaims",
            claimsEstimate: "$claimsEstimate",
            settledAmount: "$settledAmount"
          },
        }
      },
      {
        $group: {
          _id: {
            // inceptionDate: "$inceptionDate",
            // expiryDate: "$expiryDate",
            ClaimYear: "$ClaimYear",
            customerName: "$customerName",
            // sumInsured:"$sumInsured",
            lobCategory: "$data.lobCategory",
          },
          data: {
            $push: {
              lobType: "$data.lobType",
              numOfClaims: "$data.numOfClaims",
              // sumInsured: "$data.sumInsured",
              claimsEstimate: { $concat: ["₹", { $toString: "$data.claimsEstimate" }] },
              settledAmount: { $concat: ["₹", { $toString: "$data.settledAmount" }] },
              // premiumAmt: "$data.premiumAmt",
            },
          },
          numOfClaims: { $sum: "$numOfClaims" },
          claimsEstimate: { $sum: "$data.claimsEstimate" },
          settledAmount: { $sum: "$data.settledAmount" },
        }
      },
      {
        $group: {
          _id: {
            // inceptionDate: "$_id.inceptionDate",
            // expiryDate: "$_id.expiryDate",
            ClaimYear: "$_id.ClaimYear",
            customerName: "$_id.customerName",
          },
          data: {
            $push: {
              lobCategory: "$_id.lobCategory",
              details: "$data",
            },
          },
          numOfClaims: { $sum: "$numOfClaims" },
          claimsEstimate: { $sum: "$claimsEstimate" },
          settledAmount: { $sum: "$settledAmount" },
        },
      },
      {
        $project: {
          _id: 0,
          // inceptionDate: "$_id.inceptionDate",
          // expiryDate: "$_id.expiryDate",
          ClaimYear: "$_id.ClaimYear",
          customerName: "$_id.customerName",
          numOfPolicies: "$numOfPolicies",
          claimsEstimate: { $concat: ["₹", { $toString: "$claimsEstimate" }] },
          settledAmount: { $concat: ["₹", { $toString: "$settledAmount" }] },
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
    ]).toArray()

    return res;
  }

  async findAll() {
    return await this.claimsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} claim`;
  }

  update(updateClaimDto: UpdateClaimDto) {
    return
  }

  remove(id: number) {
    return `This action removes a #${id} claim`;
  }
}

// {
//   "count": 0,
//   "month": "January, 2021"
// },
// {
//   "count": 0,
//   "month": "February, 2021"
// },
// {
//   "count": 0,
//   "month": "March, 2021"
// },
// {
//   "count": 0,
//   "month": "April, 2021"
// },
// {
//   "count": 0,
//   "month": "May, 2021"
// },
// {
//   "count": 0,
//   "month": "June, 2021"
// },
// {
//   "count": 0,
//   "month": "July, 2021"
// },
// {
//   "count": 0,
//   "month": "August, 2021"
// },
// {
//   "count": 26,
//   "month": "September, 2021"
// },
// {
//   "count": 0,
//   "month": "October, 2021"
// },
// {
//   "count": 0,
//   "month": "November, 2021"
// },