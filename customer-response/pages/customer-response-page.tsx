"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Loader2, CheckCircle2, XCircle } from "lucide-react"
import { OfferDetailsSection } from "@/customer-response/components/offer-details-card"
import { DecisionSelector } from "@/customer-response/components/decision-selector"
import { SuccessToast } from "@/customer-response/components/success-toast"
import { Button } from "@/shared/components/ui/button"
import { PageHeader } from "@/shared/components/layout/page-header"
import { cn } from "@/lib/utils"

// ── Mock data (replace with API call later)
const mockData = {
    applicationId: "APP-12345-CDE",
    displayId: "#12345",
    customerName: "Jane Doe",
    loanAmount: "$25,000.00",
    interestRate: "7.99%",
    term: "60 Months",
    monthlyPayment: "$507.23",
    totalCost: "$30,433.80",
}

const JOURNEY_STEPS = ["Applied", "Pricing Done", "Offer Sent", "Decision"]

type DecisionType = "accepted" | "rejected" | null
type PageState = "form" | "submitting" | "done-accepted" | "done-rejected"

export default function CustomerResponsePage() {
    const [decision, setDecision] = useState<DecisionType>(null)
    const [rejectionReason, setRejectionReason] = useState("")
    const [pageState, setPageState] = useState<PageState>("form")
    const [showToast, setShowToast] = useState(false)

    const canSubmit = decision !== null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!canSubmit) return
        setPageState("submitting")
        // Simulate API call
        await new Promise(r => setTimeout(r, 1600))
        setPageState(decision === "accepted" ? "done-accepted" : "done-rejected")
        setShowToast(true)
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
                            ? `The customer has accepted the loan offer for Application ${mockData.displayId}. The decision has been recorded and will update the pricing model.`
                            : `The customer has declined the offer for Application ${mockData.displayId}. ${rejectionReason ? `Reason: "${rejectionReason}"` : "No reason provided."}`
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
                {showToast && <SuccessToast applicationId={mockData.displayId} onClose={() => setShowToast(false)} />}
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
                        <span className="font-bold text-[#0A66C2]">{mockData.displayId}</span>{" "}
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

                <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 ease-out fill-mode-both">
                    {/* Offer Details */}
                    <OfferDetailsSection
                        customerRows={[
                            { label: "Customer Name", value: mockData.customerName },
                            { label: "Application ID", value: mockData.applicationId },
                        ]}
                        loanRows={[
                            { label: "Loan Amount", value: mockData.loanAmount },
                            { label: "Interest Rate (APR)", value: mockData.interestRate },
                            { label: "Term", value: mockData.term },
                            { label: "Monthly Payment", value: mockData.monthlyPayment },
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

            {showToast && <SuccessToast applicationId={mockData.displayId} onClose={() => setShowToast(false)} />}
        </div>
    )
}

