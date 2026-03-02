// TypeScript interfaces for the New Application form, matching future Spring Boot backend payloads.

export interface CustomerDetails {
    fullName: string
    age: string
    employmentType: string
    annualIncome: string
    residentialLocation: string
}

export interface LoanDetails {
    requestedAmount: string
    loanDuration: string
    // Credit Profile
    ficoScore: string
    openCreditLines: string
    paymentHistory: string
    // Interest Rate Configuration Tiers
    rateTier1: string
    rateTier2: string
    rateTier3: string
    rateTier4: string
}

export type ApplicationStep = "customer" | "loan" | "processing"

export interface ApplicationFormData {
    customer: Partial<CustomerDetails>
    loan: Partial<LoanDetails>
}
