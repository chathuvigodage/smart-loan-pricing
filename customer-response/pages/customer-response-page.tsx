"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Loader2, CheckCircle2, XCircle } from "lucide-react"
import { OfferDetailsSection } from "@/customer-response/components/offer-details-card"
import { DecisionSelector } from "@/customer-response/components/decision-selector"
import { SuccessToast } from "@/customer-response/components/success-toast"
import { Button } from "@/shared/components/ui/button"
import { PageHeader } from "@/shared/components/layout/page-header"
import { useLoanApplication } from "@/context/loan-application-context"
import { cn } from "@/lib/utils"
import { API_BASE } from "@/lib/api"

// ── Fallback shown when page is visited directly without context data ────────
const fallbackData = {
    applicationId: "APP-12345-CDE",
    displayId: "#12345",
    customerName: "Jane Doe",
    loanAmount: "$25,000.00",
    interestRate: "7.99%",
    term: "60 Months",
    monthlyPayment: "$507.23",
}

const JOURNEY_STEPS = ["Applied", "Pricing Done", "Offer Sent", "Decision"]

type DecisionType = "accepted" | "rejected" | null
type PageState = "form" | "submitting" | "done-accepted" | "done-rejected"

export default function CustomerResponsePage() {
    const { loanDetail } = useLoanApplication()

    // Prefer live context data; fall back to mock if navigated directly
    const liveData = loanDetail
        ? {
            applicationId: loanDetail.applicationId,
            displayId:     `#${loanDetail.applicationId}`,
            customerName:  loanDetail.customerName  || "—",
            loanAmount:    loanDetail.loanAmount     || "—",
            interestRate:  loanDetail.interestRate   || "—",
            term:          loanDetail.term           || "—",
            monthlyPayment: loanDetail.monthlyPayment || "—",
        }
        : fallbackData

    const [decision, setDecision] = useState<DecisionType>(null)
    const [rejectionReason, setRejectionReason] = useState("")
    const [pageState, setPageState] = useState<PageState>("form")
    const [showToast, setShowToast] = useState(false)
    const [apiError, setApiError] = useState<string | null>(null)

    const canSubmit = decision !== null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!canSubmit) return
        setApiError(null)
        setPageState("submitting")
        try {
            const token = localStorage.getItem("token")
            const res = await fetch(`${API_BASE}/loan/feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    applicationId: liveData.applicationId,
                    isAccepted:    decision === "accepted",
                    reason:        decision === "rejected" && rejectionReason.trim()
                                       ? rejectionReason.trim()
                                       : null,
                }),
            })

            const json = await res.json()

            if (json?.code === "200" || res.ok) {
                setPageState(decision === "accepted" ? "done-accepted" : "done-rejected")
                setShowToast(true)
            } else {
                const msg = json?.message ?? json?.error ?? "Failed to submit customer response. Please try again."
                setApiError(msg)
                setPageState("form")
            }
        } catch {
            setApiError("Failed to submit customer response. Please try again.")
            setPageState("form")
        }
    }

    // ──────────── Final Decision Screens ────────────
    if (pageState === "done-accepted" || pageState === "done-rejected") {
        const isAccepted = pageState === "done-accepted"
        return (
            <div className="flex min-h-screen flex-col bg-[#F8F9FB] font-sans">
                <PageHeader />
                <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
                    <div className={cn(
                        "flex h-20 w-20 items-center justify-center rounded-full mb-6 shadow-lg animate-in zoom-in-50 duration-500",
                        isAccepted ? "bg-emerald-500 shadow-emerald-500/30" : "bg-rose-500 shadow-rose-500/30"
                    )}>
                        {isAccepted
                            ? <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={2} />
                            : <XCircle className="h-10 w-10 text-white" strokeWidth={2} />
                        }
                    </div>
                    <h1 className={cn(
                        "text-[2rem] font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both",
                        isAccepted ? "text-emerald-700" : "text-rose-700"
                    )}>
                        {isAccepted ? "Offer Accepted!" : "Offer Rejected"}
                    </h1>
                    <p className="mt-3 max-w-md text-[0.975rem] font-medium text-slate-500 animate-in fade-in duration-500 delay-200 fill-mode-both">
                        {isAccepted
                            ? `The customer has accepted the loan offer for Application ${liveData.displayId}. The decision has been recorded and will update the pricing model.`
                            : `The customer has declined the offer for Application ${liveData.displayId}. ${rejectionReason ? `Reason: "${rejectionReason}"` : "No reason provided."}`
                        }
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-in fade-in duration-500 delay-300 fill-mode-both">
                        <Link href="/dashboard">
                            <Button className="h-11 px-6">Go to Dashboard</Button>
                        </Link>
                        <Link href="/new-application">
                            <button className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-[0.9rem] font-semibold text-slate-600 shadow-sm hover:bg-slate-50 transition-all">
                                New Application
                            </button>
                        </Link>
                    </div>
                </main>
                {showToast && <SuccessToast applicationId={liveData.displayId} onClose={() => setShowToast(false)} />}
            </div>
        )
    }

    // ──────────── Main Form ────────────
    return (
        <div className="flex min-h-screen flex-col bg-[#F8F9FB] font-sans">
            <PageHeader />

            <main className="flex-1 px-4 py-8 sm:px-8 lg:px-12 xl:px-16 max-w-[900px] mx-auto w-full">

                {/* Page Title */}
                <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
                    <Link href="/result">
                        <button className="flex items-center gap-2 mb-4 text-[0.825rem] font-semibold text-slate-500 hover:text-[#0A66C2] transition-colors group">
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                            Back to Pricing Result
                        </button>
                    </Link>
                    <h1 className="text-[1.85rem] sm:text-[2.1rem] font-bold tracking-tight text-slate-900">
                        Customer Response
                    </h1>
                    <p className="mt-1.5 text-[0.9rem] font-medium text-slate-500">
                        Record feedback for Application{" "}
                        <span className="font-bold text-[#0A66C2]">{liveData.displayId}</span>{" "}
                        to update the pricing model.
                    </p>
                </div>

                {/* Loan Journey Indicator */}
                <div className="mb-7 animate-in fade-in duration-700 delay-75 fill-mode-both">
                    <div className="flex items-center w-full">
                        {JOURNEY_STEPS.map((step, idx) => {
                            const isLast = idx === JOURNEY_STEPS.length - 1
                            const isDone = idx < 3
                            const isActive = idx === 3
                            return (
                                <React.Fragment key={step}>
                                    <div className="flex flex-col items-center">
                                        <div className={cn(
                                            "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold border-2 transition-all",
                                            isDone && "bg-emerald-500 border-emerald-500 text-white",
                                            isActive && "bg-[#0A66C2] border-[#0A66C2] text-white shadow-md shadow-blue-500/30",
                                        )}>
                                            {isDone ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                                        </div>
                                        <span className={cn(
                                            "mt-1.5 text-[0.7rem] font-semibold whitespace-nowrap",
                                            isActive ? "text-slate-800" : "text-slate-400"
                                        )}>{step}</span>
                                    </div>
                                    {!isLast && (
                                        <div className={cn("flex-1 h-0.5 mb-5 mx-1 transition-all duration-500", isDone ? "bg-emerald-400" : "bg-slate-200")} />
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>

                {/* Error banner */}
                {apiError && (
                    <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 shadow-sm">
                        <svg className="h-4 w-4 flex-shrink-0 text-rose-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                        <p className="flex-1 text-[0.82rem] font-medium text-rose-700">{apiError}</p>
                        <button onClick={() => setApiError(null)} className="text-[0.75rem] font-bold text-rose-400 hover:text-rose-600">✕</button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 ease-out fill-mode-both">
                    {/* Offer Details */}
                    <OfferDetailsSection
                        customerRows={[
                            { label: "Customer Name",   value: liveData.customerName },
                            { label: "Application ID",  value: liveData.applicationId },
                        ]}
                        loanRows={[
                            { label: "Loan Amount",        value: liveData.loanAmount },
                            { label: "Interest Rate (APR)", value: liveData.interestRate },
                            { label: "Term",               value: liveData.term },
                            { label: "Monthly Payment",    value: liveData.monthlyPayment },
                        ]}
                    />

                    {/* Decision */}
                    <DecisionSelector
                        decision={decision}
                        onSelect={setDecision}
                        rejectionReason={rejectionReason}
                        onReasonChange={setRejectionReason}
                    />

                    {/* Submit Row */}
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={!canSubmit || pageState === "submitting"}
                            className={cn(
                                "h-12 px-8 text-[0.95rem] shadow-lg transition-all",
                                canSubmit ? "shadow-blue-500/20" : "shadow-none",
                            )}
                        >
                            {pageState === "submitting" ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" />
                                    Submit Response
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </main>

            {showToast && <SuccessToast applicationId={liveData.displayId} onClose={() => setShowToast(false)} />}
        </div>
    )
}
