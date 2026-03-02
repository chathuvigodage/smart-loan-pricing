// Mock data matching the expected Spring Boot backend response shape for the loan result.

export interface PricingOption {
    interestRate: number
    acceptanceProbability: number
    expectedProfit: number
    currency: string
    status: "recommended" | "alternative"
}

export interface LoanResult {
    applicationId: string
    recommendedRate: number
    acceptanceProbability: number
    expectedProfit: number
    currency: string
    rationale: string
    pricingOptions: PricingOption[]
}

export const mockLoanResult: LoanResult = {
    applicationId: "#LP-88372",
    recommendedRate: 12.4,
    acceptanceProbability: 72,
    expectedProfit: 28500,
    currency: "Rs.",
    rationale:
        "The recommended rate is optimized based on the applicant's credit score of 780, a low debt-to-income ratio, and current market conditions. This rate balances a high probability of acceptance with a strong projected profit margin for the institution.",
    pricingOptions: [
        { interestRate: 12.4, acceptanceProbability: 72, expectedProfit: 28500, currency: "Rs.", status: "recommended" },
        { interestRate: 12.8, acceptanceProbability: 65, expectedProfit: 31200, currency: "Rs.", status: "alternative" },
        { interestRate: 13.2, acceptanceProbability: 58, expectedProfit: 33800, currency: "Rs.", status: "alternative" },
        { interestRate: 11.9, acceptanceProbability: 81, expectedProfit: 25100, currency: "Rs.", status: "alternative" },
    ],
}
