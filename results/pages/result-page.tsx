"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
    Percent, ThumbsUp, TrendingUp, Edit, Download, Send, PlusCircle, CheckCircle2
} from "lucide-react"
import { MetricCard } from "@/results/components/metric-card"
import { RationaleCard } from "@/results/components/rationale-card"
import { PricingTable } from "@/results/components/pricing-table"
import { mockLoanResult, PricingOption } from "@/lib/mock-data/resultMocks"
import { Button } from "@/shared/components/ui/button"
import { PageHeader } from "@/shared/components/layout/page-header"
import { cn } from "@/lib/utils"

export default function ResultPage() {
    const result = mockLoanResult
    const [selectedOption, setSelectedOption] = useState<PricingOption>(
        result.pricingOptions.find(o => o.status === "recommended")!
    )
    const [isOffered, setIsOffered] = useState(false)

    const handleOfferRate = () => setIsOffered(true)

    return (
        <div className="flex min-h-screen flex-col bg-[#F8F9FB] font-sans">
            <PageHeader />

            {/* Main Content */}
            <main className="flex-1 px-4 py-8 sm:px-8 lg:px-12 xl:px-16 max-w-[1200px] mx-auto w-full">

                {/* Page Title Row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 mb-3 border border-emerald-200">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                            <span className="text-[0.75rem] font-bold text-emerald-700 uppercase tracking-wider">Analysis Complete</span>
                        </div>
                        <h1 className="text-[1.85rem] sm:text-[2.2rem] font-bold tracking-tight text-slate-900 leading-tight">
                            Loan Pricing Recommendation
                        </h1>
                        <p className="mt-1.5 text-[0.925rem] font-medium text-slate-500">
                            Application ID: <span className="font-bold text-slate-700">{result.applicationId}</span>
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Link href="/new-application">
                            <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[0.875rem] font-semibold text-slate-600 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all">
                                <Edit className="h-4 w-4 text-slate-400" />
                                Back to Edit Details
                            </button>
                        </Link>
                        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[0.875rem] font-semibold text-slate-600 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all">
                            <Download className="h-4 w-4 text-slate-400" />
                            Download Report
                        </button>
                    </div>
                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 ease-out fill-mode-both">

                    {/* LEFT COLUMN: Metrics + Rationale + Offer Button */}
                    <div className="flex flex-col gap-5">
                        {/* Metric Cards */}
                        <MetricCard
                            icon={<Percent className="h-4 w-4" />}
                            label="Recommended Rate"
                            value={`${selectedOption.interestRate.toFixed(1)}%`}
                            subValue="Optimal risk-adjusted rate"
                            accent="blue"
                        />
                        <MetricCard
                            icon={<ThumbsUp className="h-4 w-4" />}
                            label="Acceptance Probability"
                            value={`${selectedOption.acceptanceProbability}%`}
                            subValue={selectedOption.acceptanceProbability >= 70 ? "High confidence level" : "Moderate confidence"}
                            accent="emerald"
                        />
                        <MetricCard
                            icon={<TrendingUp className="h-4 w-4" />}
                            label="Expected Profit"
                            value={`${selectedOption.currency} ${selectedOption.expectedProfit.toLocaleString()}`}
                            subValue="Projected institutional margin"
                            accent="violet"
                        />

                        {/* Rationale */}
                        <RationaleCard text={result.rationale} />

                        {/* CTA Buttons */}
                        <div className="flex flex-col gap-3">
                            {isOffered ? (
                                <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 px-5 py-4 animate-in fade-in zoom-in-95 duration-300">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold text-emerald-800">Rate Offered Successfully</p>
                                        <p className="text-[0.78rem] text-emerald-600 mt-0.5">{selectedOption.interestRate.toFixed(1)}% has been sent to the customer.</p>
                                    </div>
                                </div>
                            ) : (
                                <Button
                                    onClick={handleOfferRate}
                                    className="w-full h-12 text-[0.95rem] shadow-lg shadow-blue-500/20 group"
                                >
                                    <Send className="mr-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    Offer Rate to Customer
                                </Button>
                            )}
                            <Link href="/new-application" className="w-full">
                                <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-[0.875rem] font-semibold text-slate-600 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all">
                                    <PlusCircle className="h-4 w-4 text-slate-400" />
                                    Start New Application
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Pricing Table */}
                    <div>
                        <PricingTable
                            options={result.pricingOptions}
                            selectedRate={selectedOption.interestRate}
                            onSelect={(opt) => {
                                setSelectedOption(opt)
                                setIsOffered(false)
                            }}
                        />

                        {/* Selected option highlight card */}
                        <div className={cn(
                            "mt-5 rounded-2xl border p-5 transition-all duration-300 animate-in fade-in duration-300",
                            selectedOption.status === "recommended"
                                ? "bg-[#0A66C2]/5 border-[#0A66C2]/20"
                                : "bg-slate-50 border-slate-200"
                        )}>
                            <p className="text-[0.8rem] font-bold text-slate-500 uppercase tracking-widest mb-3">Selected Option Summary</p>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { label: "Rate", value: `${selectedOption.interestRate.toFixed(1)}%` },
                                    { label: "Acceptance", value: `${selectedOption.acceptanceProbability}%` },
                                    { label: "Est. Profit", value: `${selectedOption.currency} ${selectedOption.expectedProfit.toLocaleString()}` },
                                ].map(item => (
                                    <div key={item.label} className="text-center">
                                        <p className="text-[0.75rem] font-semibold text-slate-500 mb-1">{item.label}</p>
                                        <p className="text-[1.15rem] font-bold text-slate-900">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                            {/* Acceptance prob bar */}
                            <div className="mt-4">
                                <div className="flex justify-between text-[0.72rem] font-semibold text-slate-400 mb-1.5">
                                    <span>Customer Acceptance Likelihood</span>
                                    <span>{selectedOption.acceptanceProbability}%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                                    <div
                                        className={cn(
                                            "h-full rounded-full transition-all duration-700 ease-out",
                                            selectedOption.acceptanceProbability >= 70
                                                ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                                                : selectedOption.acceptanceProbability >= 60
                                                    ? "bg-gradient-to-r from-amber-400 to-amber-500"
                                                    : "bg-gradient-to-r from-rose-400 to-rose-500"
                                        )}
                                        style={{ width: `${selectedOption.acceptanceProbability}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200/60 py-5 text-center text-[0.8rem] font-medium text-slate-400">
                &copy; {new Date().getFullYear()} HyperLoan Inc. All rights reserved.
            </footer>
        </div>
    )
}
