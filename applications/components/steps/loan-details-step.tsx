"use client"

import React from "react"
import { CreditCard, BarChart2, Percent, ArrowLeft, MessageCircle, Wallet } from "lucide-react"
import { LoanDetails } from "@/types/application"
import { FormField, baseInputClass, baseSelectClass, errorInputClass } from "@/applications/components/ui/form-field"
import { CurrencyInput, PercentageInput } from "@/applications/components/ui/currency-input"
import { cn } from "@/lib/utils"

type LoanErrors = Partial<Record<keyof LoanDetails, string>>

interface LoanDetailsStepProps {
    data: Partial<LoanDetails>
    errors: LoanErrors
    onChange: (field: keyof LoanDetails, value: string) => void
    onBlur: (field: keyof LoanDetails) => void
}

const LOAN_DURATIONS = ["12 Months", "24 Months", "36 Months", "48 Months", "60 Months", "84 Months", "120 Months"]

const SectionCard = ({ icon: Icon, title, subtitle, children }: {
    icon: React.ElementType, title: string, subtitle?: string, children: React.ReactNode
}) => (
    <div className="rounded-2xl bg-white border border-slate-200/70 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A66C2]/10 text-[#0A66C2]">
                <Icon className="h-4 w-4" />
            </div>
            <div>
                <h3 className="text-[0.925rem] font-bold text-slate-800 tracking-tight">{title}</h3>
                {subtitle && <p className="text-[0.775rem] text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
        </div>
        <div className="p-6 space-y-5">{children}</div>
    </div>
)

export function LoanDetailsStep({ data, errors, onChange, onBlur }: LoanDetailsStepProps) {
    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 ease-out fill-mode-both">
            <div className="mb-8">
                <h2 className="text-[1.75rem] font-bold tracking-tight text-slate-900">Loan Details</h2>
                <p className="mt-1.5 text-[0.975rem] font-medium text-slate-500">
                    Please provide the specific financial parameters and credit indicators for your loan request.
                </p>
            </div>

            <div className="space-y-5">
                {/* Loan Basics */}
                <SectionCard icon={CreditCard} title="Loan Basics">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormField label="Requested Loan Amount" htmlFor="requestedAmount" error={errors.requestedAmount} required>
                            <CurrencyInput
                                id="requestedAmount"
                                name="requestedAmount"
                                value={data.requestedAmount ?? ""}
                                onChange={v => onChange("requestedAmount", v)}
                                onBlur={() => onBlur("requestedAmount")}
                                hasError={!!errors.requestedAmount}
                            />
                        </FormField>
                        <FormField label="Loan Duration" htmlFor="loanDuration" error={errors.loanDuration} required>
                            <select
                                id="loanDuration"
                                name="loanDuration"
                                value={data.loanDuration ?? "12 Months"}
                                onChange={e => onChange("loanDuration", e.target.value)}
                                className={cn(baseSelectClass)}
                            >
                                {LOAN_DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </FormField>
                    </div>
                </SectionCard>

                {/* Financial Assessment */}
                <SectionCard icon={Wallet} title="Financial Assessment">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <FormField label="Savings Account Balance" htmlFor="savingsBalance" error={errors.savingsBalance}>
                            <CurrencyInput
                                id="savingsBalance"
                                name="savingsBalance"
                                value={data.savingsBalance ?? ""}
                                onChange={v => onChange("savingsBalance", v)}
                                onBlur={() => onBlur("savingsBalance")}
                                hasError={!!errors.savingsBalance}
                            />
                        </FormField>
                        <FormField label="Total Liabilities" htmlFor="totalLiabilities" error={errors.totalLiabilities}>
                            <CurrencyInput
                                id="totalLiabilities"
                                name="totalLiabilities"
                                value={data.totalLiabilities ?? ""}
                                onChange={v => onChange("totalLiabilities", v)}
                                onBlur={() => onBlur("totalLiabilities")}
                                hasError={!!errors.totalLiabilities}
                            />
                        </FormField>
                        <FormField label="Total Debt to Income Ratio" htmlFor="dtiRatio" error={errors.dtiRatio} hint="Percentage (%)">
                            <PercentageInput
                                id="dtiRatio"
                                name="dtiRatio"
                                value={data.dtiRatio ?? ""}
                                onChange={v => onChange("dtiRatio", v)}
                                placeholder="0.00"
                            />
                        </FormField>
                    </div>
                </SectionCard>

                {/* Credit Profile */}
                <SectionCard icon={BarChart2} title="Credit Profile">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <FormField label="FICO Credit Score" htmlFor="ficoScore" error={errors.ficoScore} hint="300–850" required>
                            <input
                                id="ficoScore"
                                name="ficoScore"
                                type="number"
                                inputMode="numeric"
                                placeholder="e.g. 720"
                                min={300} max={850}
                                value={data.ficoScore ?? ""}
                                onChange={e => onChange("ficoScore", e.target.value)}
                                onBlur={() => onBlur("ficoScore")}
                                className={cn(baseInputClass, errors.ficoScore && errorInputClass)}
                            />
                        </FormField>
                        <FormField label="Open Credit Lines" htmlFor="openCreditLines" error={errors.openCreditLines} required>
                            <input
                                id="openCreditLines"
                                name="openCreditLines"
                                type="number"
                                inputMode="numeric"
                                placeholder="0"
                                min={0}
                                value={data.openCreditLines ?? ""}
                                onChange={e => onChange("openCreditLines", e.target.value)}
                                onBlur={() => onBlur("openCreditLines")}
                                className={cn(baseInputClass, errors.openCreditLines && errorInputClass)}
                            />
                        </FormField>
                        <FormField label="Payment History (%)" htmlFor="paymentHistory" error={errors.paymentHistory} hint="0–100" required>
                            <input
                                id="paymentHistory"
                                name="paymentHistory"
                                type="number"
                                inputMode="decimal"
                                placeholder="e.g. 99"
                                min={0} max={100}
                                value={data.paymentHistory ?? ""}
                                onChange={e => onChange("paymentHistory", e.target.value)}
                                onBlur={() => onBlur("paymentHistory")}
                                className={cn(baseInputClass, errors.paymentHistory && errorInputClass)}
                            />
                        </FormField>
                    </div>
                </SectionCard>

                {/* Interest Rate Configuration */}
                <SectionCard
                    icon={Percent}
                    title="Interest Rate Configuration"
                    subtitle="Configure the rate tiers based on the applicant's profile and current promotional offers."
                >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {(["rateTier1", "rateTier2", "rateTier3", "rateTier4"] as const).map((tier, idx) => (
                            <FormField key={tier} label={`Tier ${idx + 1} Rate`} htmlFor={tier}>
                                <PercentageInput
                                    id={tier}
                                    name={tier}
                                    value={data[tier] ?? ""}
                                    onChange={v => onChange(tier, v)}
                                    placeholder="0.00"
                                />
                            </FormField>
                        ))}
                    </div>
                </SectionCard>

                {/* Support Banner */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-[#111827] px-6 py-5 shadow-lg">
                    <div>
                        <h4 className="text-[0.95rem] font-bold text-white">Need assistance?</h4>
                        <p className="text-[0.825rem] text-slate-400 mt-0.5">
                            Our loan specialists are available 24/7 to help with your application.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 rounded-xl bg-[#0A66C2] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#004182] transition-colors flex-shrink-0">
                        <MessageCircle className="h-4 w-4" />
                        Chat with us
                    </button>
                </div>
            </div>
        </div>
    )
}
