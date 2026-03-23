"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
    Percent, ThumbsUp, TrendingUp, Edit, PlusCircle, CheckCircle2, AlertCircle, LayoutDashboard
} from "lucide-react"
import { MetricCard } from "@/results/components/metric-card"
import { PricingTable } from "@/results/components/pricing-table"
import { Button } from "@/shared/components/ui/button"
import { PageHeader } from "@/shared/components/layout/page-header"
import { useLoanApplication } from "@/context/loan-application-context"
import { LoanRateOption } from "@/types/application"
import { cn } from "@/lib/utils"

export default function ResultPage() {
    const router = useRouter()
    const { loanResult, apiMessage, resetForm } = useLoanApplication()

    // Derive the recommended option (first one with status "Recommended", else first item)
    const recommended = loanResult?.find(o => o.status === "Recommended") ?? loanResult?.[0] ?? null

    const [selectedOption, setSelectedOption] = useState<LoanRateOption | null>(recommended)

    // ── No result available (e.g. direct navigation without submitting) ────────
    if (!loanResult || loanResult.length === 0) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F9FB] font-sans px-4">
                <div className="text-center max-w-md">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mx-auto mb-5">
                        <AlertCircle className="h-8 w-8 text-slate-400" />
                    </div>
                    <h2 className="text-[1.4rem] font-bold text-slate-800 mb-2">No Results Available</h2>
                    <p className="text-[0.95rem] text-slate-500 mb-7">
                        It looks like you arrived here directly. Please complete a loan application first.
                    </p>
                    <Link href="/new-application">
                        <button className="rounded-xl bg-[#0A66C2] px-6 py-3 text-sm font-semibold text-white hover:bg-[#004182] transition-colors">
                            Start New Application
                        </button>
                    </Link>
                </div>
            </div>
        )
    }

    const active = selectedOption ?? recommended!

    // Values are already full percentages from the backend (e.g. rate="22.0", probability_rate="99.97")
    const activeRate = parseFloat(active.rate)
    const activeProfit = parseFloat(active.profit)
    const activeProbability = parseFloat(active.probability_rate)

    const recommendedRate = parseFloat(recommended!.rate)
    const recommendedProfit = parseFloat(recommended!.profit)
    const recommendedProbability = parseFloat(recommended!.probability_rate)

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
                        {apiMessage && (
                            <p className="mt-1.5 text-[0.925rem] font-medium text-slate-500">
                                {apiMessage}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => router.push("/new-application")}
                            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[0.875rem] font-semibold text-slate-600 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
                        >
                            <Edit className="h-4 w-4 text-slate-400" />
                            Back to Edit Details
                        </button>
                        <button
                            onClick={() => router.push("/dashboard")}
                            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[0.875rem] font-semibold text-slate-600 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
                        >
                            <LayoutDashboard className="h-4 w-4 text-slate-400" />
                            Go to Dashboard
                        </button>
                    </div>
                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 ease-out fill-mode-both">

                    {/* LEFT COLUMN: Metrics + Offer Button */}
                    <div className="flex flex-col gap-5">
                        <MetricCard
                            icon={<Percent className="h-4 w-4" />}
                            label="Recommended Rate"
                            value={`${recommendedRate.toFixed(2)}%`}
                            subValue="Optimal risk-adjusted rate"
                            accent="blue"
                        />
                        <MetricCard
                            icon={<ThumbsUp className="h-4 w-4" />}
                            label="Acceptance Probability"
                            value={`${recommendedProbability}%`}
                            subValue={recommendedProbability >= 70 ? "High confidence level" : "Moderate confidence"}
                            accent="emerald"
                        />
                        <MetricCard
                            icon={<TrendingUp className="h-4 w-4" />}
                            label="Expected Profit"
                            value={`Rs. ${recommendedProfit.toLocaleString()}`}
                            subValue="Projected institutional margin"
                            accent="violet"
                        />

                        {/* CTA Buttons */}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => { resetForm(); router.push("/new-application") }}
                                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-[0.875rem] font-semibold text-slate-600 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
                            >
                                <PlusCircle className="h-4 w-4 text-slate-400" />
                                Start New Application
                            </button>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Pricing Table */}
                    <div>
                        <PricingTable
                            options={loanResult}
                            selectedRate={active.rate}
                            onSelect={(opt) => {
                                setSelectedOption(opt)
                            }}
                        />

                        {/* Selected option highlight card */}
                        <div className={cn(
                            "mt-5 rounded-2xl border p-5 transition-all duration-300 animate-in fade-in duration-300",
                            active.status === "Recommended"
                                ? "bg-[#0A66C2]/5 border-[#0A66C2]/20"
                                : "bg-slate-50 border-slate-200"
                        )}>
                            <p className="text-[0.8rem] font-bold text-slate-500 uppercase tracking-widest mb-3">Selected Option Summary</p>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { label: "Rate", value: `${activeRate.toFixed(2)}%` },
                                    { label: "Acceptance", value: `${activeProbability}%` },
                                    { label: "Est. Profit", value: `Rs. ${activeProfit.toLocaleString()}` },
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
                                    <span>{activeProbability}%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                                    <div
                                        className={cn(
                                            "h-full rounded-full transition-all duration-700 ease-out",
                                            activeProbability >= 70
                                                ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                                                : activeProbability >= 60
                                                    ? "bg-gradient-to-r from-amber-400 to-amber-500"
                                                    : "bg-gradient-to-r from-rose-400 to-rose-500"
                                        )}
                                        style={{ width: `${activeProbability}%` }}
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
