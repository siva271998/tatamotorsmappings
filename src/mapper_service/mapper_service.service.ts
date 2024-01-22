import { Injectable } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';
import { InsurerService } from 'src/insurer/insurer.service';
import * as XLSX from 'xlsx';
import { parentPort, workerData } from 'worker_threads';
import { LobCatService } from 'src/lob_cat/lob_cat.service';
import { PoliciesService } from 'src/policies/policies.service';
import { InjectRepository } from '@nestjs/typeorm';
import { LobCat } from 'src/lob_cat/entities/lob_cat.entity';
import { MongoRepository } from 'typeorm';
import async from 'async';
import { ClaimsService } from 'src/claims/claims.service';

@Injectable()
export class MapperServiceService {
    constructor(
        private clientsService: ClientsService,
        private insurerService: InsurerService,
        private lobCatService: LobCatService,
        private policiesService: PoliciesService,
        private claimsService: ClaimsService,
        @InjectRepository(LobCat) private lobCatRepository: MongoRepository<LobCat>
    ) { }

    async uploadAndProcessFile(file: Express.Multer.File): Promise<void> {
        const workbook = XLSX.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        const policies = sheet.map((row) => {
            return row

        });
        const data = policies
        const batchSize = 100;
        const batches = [];
        for (let i = 0; i < data.length; i += batchSize) {
            batches.push(data.slice(i, i + batchSize));
        }

        async.each(batches, async (batch) => {
            await Promise.all(batch.map(async (record) => {
                // await this.toCheckClients(record.insured_name, false)
                // await this.toCheckInsurer(record.insurer_name, false)
                // await this.toCheckLob(record.lob_category, false)
                // await this.createPolicies(record)
                await this.createClaims(record)

            }));
        });

        // let policy: any
        // for (policy of policies) {
        //     await this.toCheckClients(policy.insured_name, false)
        //     await this.toCheckInsurer(policy.insurer_name, false)
        //     await this.toCheckLob(policy.lob_category, false)
        //     await this.createPolicies(policy)
        // }
    }

    async toCheckClients(insuredName: string, isfind: boolean) {
        // console.log(insuredName)
        const findClient = await this.clientsService.findOne(insuredName)
        // console.log(findClient)
        if (isfind) {
            return findClient;
        } else if (!findClient) {
            await this.clientsService.create({ insuredName })
        }
    }

    async toCheckInsurer(insurerName: string, isfind: boolean) {
        const findInsurer = await this.insurerService.findOne(insurerName)
        if (isfind) {
            return findInsurer;
        } else if (!findInsurer) {
            await this.insurerService.create({ insurerName })
        }

    }
    async toCheckLob(lobCategory: string, isfind: boolean) {
        const findLobCat = await this.lobCatService.findOne(lobCategory)
        if (isfind) {
            return findLobCat;
        } else if (!findLobCat) {
            await this.lobCatService.create({ lobCategory })
        }
    }
    // {
    //     relationship_manager: 'VINEET',
    //     control_number: 33262,
    //     customer_code: 51,
    //     insured_name: 'TATA COMMUNICATION PAYMENT SOLUTIONS LIMITED',
    //     policy_number: '112300/48/2023/383 ',
    //     lob_category: 'Non EB',
    //     lob_type: 'Health',
    //     lob_type_of_policy: 'Mediclaim - Group',
    //     insurer_name: 'The Oriental Insurance Company Limited',
    //     insurer_branch: 'Magnet House, 2nd Floor, N.M. Marg, Ballard Estate, Mumbai 400 001',
    //     TMIBASL_branch: 'Pune',
    //     inception_date: 44652, 
    //     expiry_date: 45016,
    //     policy_term: 1,
    //     premium_amount: 2101369.84,
    //     sum_insured_limit: 56500000,
    //     status: 0,
    //     total_sum_insured: 56500000,
    //     total_premium_amount: 2334855.38
    //   }

    //claims data
    // {
    //     id: 21210,
    //     policy_id: '0600018902 00 00',
    //     relationship_manager_id: 212,
    //     rm_manager_id: 'NULL',
    //     control_number: 31955,
    //     Periodic: 'NULL',
    //     FormType: 'NULL',
    //     TMIBASL_No: 'TMIB10234340',
    //     Temp_TMIBASL_No: 'NULL',
    //     insured_name: 'TATA COMMUNICATION PAYMENT SOLUTIONS LIMITED',   
    //     BrokerOnRecord: 'Yes',
    //     JurisdictionClaimMade: 'NULL',
    //     AssetmentDocumentFileName: 'NULL',
    //     Complexity: 'No',
    //     EmailNotfication: 'NULL',
    //     EmailNotficationId: 'NULL',
    //     LORIntimationToClientEmail: 'NULL',
    //     EmailSendDate: 'NULL',
    //     SendEmail: 'NULL',
    //     client_claim_contact: 'NULL',
    //     client_claims_contact_id: 'NULL',
    //     SentAcknowledgementDate: 'NULL',
    //     client_claim_email: 'NULL',
    //     client_division_business_unit: 'NULL',
    //     DateFSR: 'NULL',
    //     insurer_name: 'Tata AIG General Insurance Company Limited',     
    //     line_of_business: 13,
    //     type_of_policy: 69,
    //     policy_period: '2021 - 2022',
    //     policy_year: 'NULL',
    //     TMIBASL_branch_name: 'Mumbai',
    //     claim_FY_quarter: 'Q3 2023 - 2024',
    //     date_of_loss: 44554,
    //     loss_location: 'NULL',
    //     nature_cause_of_Loss: 57,
    //     loss_estimation: 850000,
    //     survey_location: 'NULL',
    //     site_contact_detail: 'NULL',
    //     date_of_intimation_TMIBASL: 44566,
    //     date_of_intimation_insurer: 44566,
    //     TMIBASL_claim_handler: 213,
    //     TMIBASL_claim_reviewer: 'NULL',
    //     attachment: 'NULL',
    //     description: 'Theft Due to Vandalism using Gas Cutter',
    //     ReinstatementExtensionApproval: 'NULL',
    //     ReinstatementExtension: 'NULL',
    //     ConsentReceivedDate: 'NULL',
    //     PaymentDetails: '22031001532GN00184',
    //     FinalSettlementDate: 44630,
    //     FinalSettlementAmountinINR: 779000,
    //     OutstandingReserve: 850000,
    //     TotalOnAccountPaymentTotal: 'NULL',
    //     TotalamountSettledFinal: 'NULL',
    //     BalanceamountSettled: 'NULL',
    //     Reinstatementpremiumdeducted: 'NULL',
    //     OnAccountpaymentmadeifany: 'NULL',
    //     AmountconsideredbytheInsurer: 'NULL',
    //     NonStandardDeductionsifany: 'NULL',
    //     AmountrecommendedtoInsurer: 'NULL',
    //     NetLossassessedbythesurveyor: 'NULL',
    //     Policydeductibleexcess: 'NULL',
    //     Underinsurancedeductionifany: 'NULL',
    //     Deductionforsalvagescrapifany: 'NULL',
    //     Depreciationdeductedifany: 'NULL',
    //     GrossLossAssessed: 'NULL',
    //     Disallowances: 'NULL',
    //     FinalClaimSubmitted: 'NULL',
    //     InitialestimateofLoss: 850000,
    //     TMIBASLRemarks: 'NULL',
    //     ClaimStatus: 'Settled',
    //     date_closed: 'NULL',
    //     date_repudiated: 'NULL',
    //     PendencyBucket: 'Claim Concluded',
    //     ClaimIssues: 'NULL',
    //     reject_reason: 'NULL',
    //     approval_date: 'NULL',
    //     DateofIntimationInsurer: 'NULL',
    //     SentAcknowledgement: 'NULL',
    //     InsuredClaimNumber: 'NULL',
    //     InsurerClaimNumber: '0822107016A ',
    //     Ifothers: 'NULL',
    //     expiry_date: 44823,
    //     inception_date: 44459,
    //     LR_BL_CN_Docket_AWB_RR_No: 'NULL',
    //     LR_BL_CN_Docket_AWB_RR_date: 'NULL',
    //     FinalClarificationsDocumentsSubmissionDate: 'NULL',
    //     DateofAssessment: 'NULL',
    //     AllDocumentsSubmissionDate: 'NULL',
    //     AllDocumentsSubmissionEmail: 'NULL',
    //     FinalClarificationsDocumentsSubmissionEmail: 'NULL',
    //     LORIntimationToClientDate: 'NULL',
    //     invoice_stm_no: 'NULL',
    //     Type_of_Liability: 'NULL',
    //     Whether_Summons_Legal_notice_received: 'NULL',
    //     Narration_of_liability_incident: 'NULL',
    //     Serial_No: 'NULL',
    //     Contact_person_at_loss_location: 'NULL',
    //     Contact_Person_Mobile_number: 'NULL',
    //     Contact_Person_Email_ID: 'NULL',
    //     TransitDetails: 'NULL',
    //     ConsignmentNoteNo: 'NULL',
    //     ConsignmentNoteDate: 'NULL',
    //     Reason_for_delay_in_intimation: 'NULL',
    //     Invoice_No: 'NULL',
    //     InvoiceDate: 'NULL',
    //     InvoiceValue: 'NULL',
    //     Additional_information: 'NULL',
    //     Claim_Initiator_Email: 'NULL',
    //     Initiator_Name: 'NULL',
    //     Initiator_Division: 'NULL',
    //     InitiatorBU: 'NULL',
    //     Company: 'NULL',
    //     Company_Code: 'NULL',
    //     invoice_stm_date: 'NULL',
    //     place_of_origin: 'NULL',
    //     place_of_destination: 'NULL',
    //     consignee_customer_contact_detail: 'NULL',
    //     affected_item_make_model: 'NULL',
    //     affected_item_serial_number: 'NULL',
    //     employee_name: 'NULL',
    //     claimant_name: 'NULL',
    //     status: 1,
    //     ClaimInternalApproval: 'NULL',
    //     created_by: 213,
    //     updated_by: 213,
    //     updated_at: 45225.529861111114,
    //     created_at: 45225.529861111114,
    //     emailtoAdditionalRecipients: 'NULL',
    //     reference_id: 4437,
    //     policy_number_T: 'NULL',
    //     is_delete: 'NULL'
    //   }
    async createClaims(payload: any) {
        const getClientId = await this.toCheckClients(payload.insured_name, true)
        const getInsurerId = await this.toCheckInsurer(payload.insurer_name, true)
        const getLobId = await this.toCheckLob("Non EB", true)
        console.log(getLobId)
        const millisecondsInDay = 24 * 60 * 60 * 1000;
        const updateClaimsDetails = {
            ...payload,
            policy_id: "0600018902 00 00",
            lobCategory: getLobId.id,
            productType: "Money Insurance ",
            FinalSettlementDate: new Date((payload.FinalSettlementDate - 1) * millisecondsInDay + Date.UTC(1900, 0, 1)).toISOString().split('T')[0],
            insured_name: getClientId.id,
            status: Number(payload.status),
            insurer_name: getInsurerId.id,
            InitialestimateofLoss: Number(payload.InitialestimateofLoss),
            type_of_policy: "Mediclaim - Group Top-Up",
            line_of_business: Number(payload.line_of_business),
            OutstandingReserve: Number(payload.OutstandingReserve),
            loss_estimation: Number(payload.loss_estimation),
            inception_date: new Date((payload.inception_date - 1) * millisecondsInDay + Date.UTC(1900, 0, 1)).toISOString().split('T')[0],
            expiry_date: new Date((payload.expiry_date - 1) * millisecondsInDay + Date.UTC(1900, 0, 1)).toISOString().split('T')[0],
            nature_cause_of_Loss: Number(payload.nature_cause_of_Loss),
            date_of_intimation_TMIBASL: new Date((payload.date_of_intimation_TMIBASL - 1) * millisecondsInDay + Date.UTC(1900, 0, 1)).toISOString().split('T')[0],
            date_of_loss: new Date((payload.date_of_loss - 1) * millisecondsInDay + Date.UTC(1900, 0, 1)).toISOString().split('T')[0],

        }
        await this.claimsService.create(updateClaimsDetails)
        // console.log(updateClaimsDetails)
        // up
    }

    async createPolicies(payload: any) {
        const getClientId = await this.toCheckClients(payload.insured_name, true)
        const getInsurerId = await this.toCheckInsurer(payload.insurer_name, true)
        const getLobId = await this.toCheckLob(payload.lob_category, true)
        const millisecondsInDay = 24 * 60 * 60 * 1000;
        const updatedPoliciyWithId = { ...payload }
        updatedPoliciyWithId.relationship_manager = updatedPoliciyWithId.relationship_manager,
            updatedPoliciyWithId.control_number = Number(updatedPoliciyWithId.control_number),
            updatedPoliciyWithId.customer_code = Number(updatedPoliciyWithId.customer_code),
            updatedPoliciyWithId.insured_name = getClientId.id,
            updatedPoliciyWithId.policy_number = updatedPoliciyWithId.policy_number.toString(),
            updatedPoliciyWithId.lob_category = getLobId.id,
            updatedPoliciyWithId.lob_type = updatedPoliciyWithId.lob_type,
            updatedPoliciyWithId.lob_type_of_policy = updatedPoliciyWithId.lob_type_of_policy,
            updatedPoliciyWithId.insurer_name = getInsurerId.id,
            updatedPoliciyWithId.insurer_branch = updatedPoliciyWithId.insurer_branch,
            updatedPoliciyWithId.TMIBASL_branch = updatedPoliciyWithId.TMIBASL_branch,
            updatedPoliciyWithId.inception_date = new Date((updatedPoliciyWithId.inception_date - 1) * millisecondsInDay + Date.UTC(1900, 0, 1)).toISOString().split('T')[0],
            updatedPoliciyWithId.expiry_date = new Date((updatedPoliciyWithId.expiry_date - 1) * millisecondsInDay + Date.UTC(1900, 0, 1)).toISOString().split('T')[0],
            updatedPoliciyWithId.policy_term = updatedPoliciyWithId.policy_term,
            updatedPoliciyWithId.premium_amount = Number(updatedPoliciyWithId.premium_amount,)
        updatedPoliciyWithId.sum_insured_limit = Number(updatedPoliciyWithId.sum_insured_limit),
            updatedPoliciyWithId.status = updatedPoliciyWithId.status,
            updatedPoliciyWithId.total_sum_insured = Number(updatedPoliciyWithId.total_sum_insured),
            updatedPoliciyWithId.total_premium_amount = Number(updatedPoliciyWithId.total_premium_amount)
        await this.policiesService.create(updatedPoliciyWithId)
        return

    }
}
