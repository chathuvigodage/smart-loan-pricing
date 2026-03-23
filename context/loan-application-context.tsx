"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { CustomerDetails, LoanDetails, LoanRateOption } from "@/types/application"

// ── Loan detail fetched from POST /loan/specific/id ──────────────────────────
export interface LoanDetailData {
    applicationId: string
    customerName: string
    loanAmount: string
    term: string
    interestRate: string
    monthlyPayment: string
}

interface LoanApplicationState {
    customerData: Partial<CustomerDetails>
    setCustomerData: (data: Partial<CustomerDetails>) => void
    loanData: Partial<LoanDetails>
    setLoanData: (data: Partial<LoanDetails>) => void
    loanResult: LoanRateOption[] | null
    setLoanResult: (result: LoanRateOption[]) => void
    apiMessage: string
    setApiMessage: (msg: string) => void
    resetForm: () => void
    // ── history update flow ──────────────────────────────────────────────────
    loanDetail: LoanDetailData | null
    setLoanDetail: (d: LoanDetailData | null) => void
}

const LoanApplicationContext = createContext<LoanApplicationState | undefined>(undefined)

export function LoanApplicationProvider({ children }: { children: ReactNode }) {
    const [customerData, setCustomerData] = useState<Partial<CustomerDetails>>({})
    const [loanData, setLoanData] = useState<Partial<LoanDetails>>({ loanDuration: "12 Months" })
    const [loanResult, setLoanResult] = useState<LoanRateOption[] | null>(null)
    const [apiMessage, setApiMessage] = useState<string>("")
    const [loanDetail, setLoanDetail] = useState<LoanDetailData | null>(null)

    const resetForm = () => {
        setCustomerData({})
        setLoanData({ loanDuration: "12 Months" })
    }

    return (
        <LoanApplicationContext.Provider
            value={{
                customerData,
                setCustomerData,
                loanData,
                setLoanData,
                loanResult,
                setLoanResult,
                apiMessage,
                setApiMessage,
                resetForm,
                loanDetail,
                setLoanDetail,
            }}
        >
            {children}
        </LoanApplicationContext.Provider>
    )
}

export function useLoanApplication(): LoanApplicationState {
    const ctx = useContext(LoanApplicationContext)
    if (!ctx) {
        throw new Error("useLoanApplication must be used within a LoanApplicationProvider")
    }
    return ctx
}
