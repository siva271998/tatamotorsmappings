import { Entity, Column, PrimaryGeneratedColumn, ObjectIdColumn } from 'typeorm';

@Entity({
    name: 'policies'
})
export class Policy {

    @ObjectIdColumn()
    id: string;

    @Column({
        name: "relationshipManager"
    })
    relationshipManager: string;

    @Column({
        name: "controlNumber"
    })
    controlNumber: string;

    @Column({
        name: "customerCode"
    })
    customerCode: string;

    @Column({
        name: "insuredName"
    })
    insuredName: string;

    @Column({
        name: "policyNumber"
    })
    policyNumber: string;

    @Column({
        name: "lobCategory"
    })
    lobCategory: string;

    @Column({
        name: "lobType"
    })
    lobType: string;

    @Column({
        name: "lobTypeOfPolicy"
    })
    lobTypeOfPolicy: string;

    @Column({
        name: "insurerName"
    })
    insurerName: string;

    @Column({
        name: "insurerBranch"
    })
    insurerBranch: string;

    @Column({
        name: "tmibaslBranch"
    })
    tmibaslBranch: string;

    @Column({
        name: "inceptionDate"
    })
    inceptionDate: Date;

    @Column({
        name: "expiryDate"
    })
    expiryDate: Date;

    @Column({
        name: "policyTerm"
    })
    policyTerm: string;

    @Column({
        name: "premiumAmount"
    })
    premiumAmount: string;

    @Column({
        name: "sumInsuredLimit"
    })
    sumInsuredLimit: string;

    @Column({
        name: "status"
    })
    status: string;

    @Column({
        name: "totalSumInsured"
    })
    totalSumInsured: string;

    @Column({
        name: "totalPremiumAmount"
    })
    totalPremiumAmount: string;
}
