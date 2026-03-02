"use client"

import React, { useState } from "react"
import { CustomerDetailsStep } from "@/applications/components/steps/customer-details-step"
import { LoanDetailsStep } from "@/applications/components/steps/loan-details-step"
import { ProcessingScreen } from "@/applications/components/processing-screen"
import { StepIndicator } from "@/applications/components/ui/step-indicator"
import { Button } from "@/shared/components/ui/button"
import { CustomerDetails, LoanDetails } from "@/types/application"
import { ArrowRight, ArrowLeft } from "lucide-react"

// ─────────────────────── Validators ──────────────────────────
const validateCustomer = (d: Partial<CustomerDetails>) => {
    const errors: Partial<Record<keyof CustomerDetails, string>> = {}
    if (!d.fullName?.trim()) errors.fullName = "Full name is required"
    const age = Number(d.age)
    if (!d.age) errors.age = "Age is required"
    else if (isNaN(age) || age < 18 || age > 85) errors.age = "Must be between 18 and 85"
    if (!d.employmentType) errors.employmentType = "Please select an employment type"
    if (!d.annualIncome) errors.annualIncome = "Annual income is required"
    else if (isNaN(Number(d.annualIncome))) errors.annualIncome = "Enter a valid numeric value"
    if (!d.residentialLocation?.trim()) errors.residentialLocation = "Location is required"
    return errors
}

const validateLoan = (d: Partial<LoanDetails>) => {
    const errors: Partial<Record<keyof LoanDetails, string>> = {}
    if (!d.requestedAmount) errors.requestedAmount = "Loan amount is required"
    else if (Number(d.requestedAmount) <= 0) errors.requestedAmount = "Amount must be greater than 0"
    if (!d.ficoScore) errors.ficoScore = "FICO score is required"
    else if (Number(d.ficoScore) < 300 || Number(d.ficoScore) > 850) errors.ficoScore = "Must be 300–850"
    if (!d.openCreditLines && d.openCreditLines !== "0") errors.openCreditLines = "Required"
    if (!d.paymentHistory) errors.paymentHistory = "Required"
    else if (Number(d.paymentHistory) < 0 || Number(d.paymentHistory) > 100) errors.paymentHistory = "Must be 0–100"
    return errors
}
// ─────────────────────────────────────────────────────────────

export default function NewApplicationPage() {
    // Step state: 1 | 2 | "processing"
    const [step, setStep] = useState<1 | 2 | "processing">(1)

    const [customerData, setCustomerData] = useState<Partial<CustomerDetails>>({})
    const [customerErrors, setCustomerErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({})

    const [loanData, setLoanData] = useState<Partial<LoanDetails>>({ loanDuration: "12 Months" })
    const [loanErrors, setLoanErrors] = useState<Partial<Record<keyof LoanDetails, string>>>({})

    // ── Customer field handlers
    const handleCustomerChange = (field: keyof CustomerDetails, value: string) => {
        setCustomerData(p => ({ ...p, [field]: value }))
        if (customerErrors[field]) setCustomerErrors(p => ({ ...p, [field]: undefined }))
    }
    const handleCustomerBlur = (field: keyof CustomerDetails) => {
        const e = validateCustomer({ ...customerData })
        if (e[field]) setCustomerErrors(p => ({ ...p, [field]: e[field] }))
    }

    // ── Loan field handlers
    const handleLoanChange = (field: keyof LoanDetails, value: string) => {
        setLoanData(p => ({ ...p, [field]: value }))
        if (loanErrors[field]) setLoanErrors(p => ({ ...p, [field]: undefined }))
    }
    const handleLoanBlur = (field: keyof LoanDetails) => {
        const e = validateLoan({ ...loanData })
        if (e[field]) setLoanErrors(p => ({ ...p, [field]: e[field] }))
    }

    // ── Step navigation
    const goNext = () => {
        if (step === 1) {
            const errors = validateCustomer(customerData)
            setCustomerErrors(errors)
            if (Object.keys(errors).length > 0) return
            setStep(2)
        } else if (step === 2) {
            const errors = validateLoan(loanData)
            setLoanErrors(errors)
            if (Object.keys(errors).length > 0) return
            setStep("processing")
        }
    }

    const goBack = () => {
        if (step === 2) setStep(1)
    }

    // ── Show processing screen (full-page overlay)
    if (step === "processing") return <ProcessingScreen />

    return (
        <div className="flex min-h-screen bg-[#F8F9FB] font-sans">
            {/* Sidebar - simplified top brand bar for this flow */}
            <div className="flex flex-1 flex-col">
                {/* Top App Bar */}
                <div className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-200/60 bg-white/80 backdrop-blur-md px-6 sm:px-10">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#0A66C2] to-[#004182] shadow-md">
                            <span className="text-white font-black text-xs">HL</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-800">HyperLoan</span>
                    </div>
                    {/* Step Indicator in Header */}
                    <div className="flex-1 max-w-xs mx-8 hidden sm:block">
                        <StepIndicator step={step as 1 | 2} />
                    </div>

                </div>

                {/* Mobile Step Indicator */}
                <div className="sm:hidden px-6 py-4 border-b border-slate-100 bg-white">
                    <StepIndicator step={step as 1 | 2} />
                </div>

                {/* Main content */}
                <main className="flex-1 px-4 py-8 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-48 max-w-4xl mx-auto w-full">
                    {step === 1 && (
                        <CustomerDetailsStep
                            data={customerData}
                            errors={customerErrors}
                            onChange={handleCustomerChange}
                            onBlur={handleCustomerBlur}
                        />
                    )}
                    {step === 2 && (
                        <LoanDetailsStep
                            data={loanData}
                            errors={loanErrors}
                            onChange={handleLoanChange}
                            onBlur={handleLoanBlur}
                        />
                    )}
                </main>

                {/* Sticky Footer Actions */}
                <div className="sticky bottom-0 z-20 border-t border-slate-200/70 bg-white/90 backdrop-blur-md px-6 sm:px-10 py-4">
                    <div className="flex items-center justify-between max-w-4xl mx-auto">
                        {step === 2 ? (
                            <button
                                onClick={goBack}
                                className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-[0.925rem] font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </button>
                        ) : (
                            <div />
                        )}

                        <div className="flex items-center gap-3">
                            <Button
                                type="button"
                                onClick={goNext}
                                className="h-11 px-6 text-[0.925rem] shadow-lg shadow-blue-500/20 group"
                            >
                                {step === 1 ? (
                                    <>Next <ArrowRight className="ml-2 h-4 w-4 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300" /></>
                                ) : (
                                    <>Continue to Documents <ArrowRight className="ml-2 h-4 w-4 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300" /></>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
