// TypeScript interfaces for the New Application form, matching future Spring Boot backend payloads.

// Backend response item from POST /loan/send-details
export interface LoanRateOption {
    probability_rate: string
    profit: string
    rate: string
    status: "Recommended" | "Alternative"
}

export interface CustomerDetails {
    fullName: string
    age: string
    employmentType: string
    annualIncome: string
    residentialLocation: string
    educationLevel: string
    maritalStatus: string
}

export interface LoanDetails {
    requestedAmount: string
    loanDuration: string
    savingsBalance: string
    totalLiabilities: string
    dtiRatio: string
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
