
export class CreatePolicyDto {
    relationship_manager: string;
    control_number: string;
    customer_code: string;
    insured_name: string;
    policy_number: string;
    lob_category: string;
    lob_type: string;
    lob_type_of_policy: string;
    insurer_name: string;
    insurer_branch: string;
    TMIBASL_branch: string;
    inception_date: Date;
    expiry_date: Date;
    policy_term: string;
    premium_amount: string;
    sum_insured_limit: string;
    status: string;
    total_sum_insured: string;
    total_premium_amount: string;
}
