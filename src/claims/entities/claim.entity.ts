import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({
    name: "claims"
})
export class Claim {
    @ObjectIdColumn({
        name: "_id"
    })
    id: string;

    @Column({
        name: "claimsYear"
    })
    claimsYear: string;

    @Column({
        name: "clientName"
    })
    clientName: string;

    @Column({
        name:"ClaimStatus"
    })
    ClaimStatus:string

    // @Column({
    //     name: "noOfClaims"
    // })
    // noOfClaims: string;

    @Column({
        name: "claimsYear"
    })
    claimsEstimate: string;

    @Column({
        name: "settledAmount"
    })
    settledAmount: string;

    @Column({
        name: "pendingAmount"
    })
    pendingAmount: string;

    @Column({
        name: "rejectedAount"
    })
    rejectedAount: Number;

    @Column({
        name: "productType"
    })
    productType: string;

    @Column({
        name: "tmbibaslClaimNo"
    })
    tmbibaslClaimNo: string;

    @Column({
        name: "policyNumber"
    })
    policyNumber: string;

    @Column({
        name: "insurerName"
    })
    insurerName: string;

    @Column({
        name: "lobCategory"
    })
    lobCategory :any
    @Column({
        name: "policyType"
    })
    policyType: string;

    @Column({
        name: "lineOfBusiness"
    })
    lineOfBusiness: string;

    @Column({
        name: "outstandingAmount"
    })
    outstandingAmount: Number;

    @Column({
        name: "surveyor"
    })
    surveyor: string;

    @Column({
        name: "estimatedLoss"
    })
    estimatedLoss: Number;

    @Column({
        name: "natureOfLoss"
    })
    natureOfLoss: Number;

    @Column({
        name: "dateOfLoss"
    })
    dateOfLoss: string;

    @Column({
        name: "dateOfIntimationToTmibasl"
    })
    dateOfIntimationToTmibasl: string;

    @Column({
        name: "inceptionDate"
    })
    inceptionDate: Date;

    @Column({
        name: "expiryDate"
    })
    expiryDate: Date;

    @Column({
        name: "FinalSettlementDate"
    })
    FinalSettlementDate:string;

    @Column({
        name: "status"
    })
    status:string
}
