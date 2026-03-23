"use client"

import React, { useEffect, useState } from "react"
import { Shield, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLoanApplication } from "@/context/loan-application-context"
import { API_BASE } from "@/lib/api"

const MESSAGES = [
    "Analyzing applicant credit profile...",
    "Computing risk-adjusted interest rates...",
    "Applying Bandit algorithm for optimal pricing...",
    "Evaluating loan term configurations...",
    "Finalizing best-fit loan offer...",
]

// Map employment type labels → backend enum values
// (new dropdown values already match what the backend expects)
function mapEmploymentStatus(employmentType: string): string {
    return employmentType ?? ""
}

// Parse "36 Months" → 36
function parseLoanDuration(duration: string): number {
    return parseInt(duration, 10) || 12
}

export function ProcessingScreen() {
    const router = useRouter()
    const { customerData, loanData, setLoanResult, setApiMessage } = useLoanApplication()

    const [progress, setProgress] = useState(0)
    const [msgIndex, setMsgIndex] = useState(0)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Progress bar simulation (slows near 90% awaiting real API)
        const progressTimer = setInterval(() => {
            setProgress(p => {
                if (p >= 90) { clearInterval(progressTimer); return 90 }
                const step = p < 70 ? 2 : 0.5
                return Math.min(p + step, 90)
            })
        }, 60)

        // Cycling messages
        const msgTimer = setInterval(() => {
            setMsgIndex(i => (i + 1) % MESSAGES.length)
        }, 1800)

        // ── BUILD REQUEST PAYLOAD ──────────────────────────────────────────────
        const rateTiers = [
            loanData.rateTier1,
            loanData.rateTier2,
            loanData.rateTier3,
            loanData.rateTier4,
        ]
            .map(r => parseFloat(r ?? "0"))  // send as-is — no /100 conversion
            .filter(r => !isNaN(r) && r > 0)

        const payload = {
            name: customerData.fullName ?? "",
            loanAmount: parseFloat(customerData.annualIncome ?? "0") > 0
                ? parseFloat(loanData.requestedAmount ?? "0")
                : parseFloat(loanData.requestedAmount ?? "0"),
            loanDuration: parseLoanDuration(loanData.loanDuration ?? "12 Months"),
            totalDebtToIncomeRatio: parseFloat(loanData.dtiRatio ?? "0") / 100,
            creditScore: parseInt(loanData.ficoScore ?? "0", 10),
            numberOfOpenCreditLines: parseInt(loanData.openCreditLines ?? "0", 10),
            annualIncome: parseFloat(customerData.annualIncome ?? "0"),
            savingsAccountBalance: parseFloat(loanData.savingsBalance ?? "0"),
            totalLiabilities: parseFloat(loanData.totalLiabilities ?? "0"),
            age: parseInt(customerData.age ?? "0", 10),
            educationLevel: customerData.educationLevel ?? "",
            maritalStatus: customerData.maritalStatus ?? "",
            employmentStatus: mapEmploymentStatus(customerData.employmentType ?? ""),
            paymentHistory: parseFloat(loanData.paymentHistory ?? "0") / 100,
            interestRates: rateTiers.length > 0 ? rateTiers : [18, 19, 20, 21],
        }

        // ── FIRE API CALL ──────────────────────────────────────────────────────
        const token = typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null

        fetch(`${API_BASE}/loan/send-details`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(payload),
        })
            .then(async res => {
                // Accept non-2xx HTTP status too — the backend encodes status in body
                const json = await res.json()
                return json
            })
            .then(json => {
                clearInterval(progressTimer)
                clearInterval(msgTimer)
                setProgress(100)

                if (json.code === "200") {
                    setLoanResult(json.data)
                    setApiMessage(json.message ?? "")
                    // Brief pause so the 100% progress is visible before navigating
                    setTimeout(() => router.push("/result"), 600)
                } else {
                    setError(json.message ?? "An unexpected error occurred. Please try again.")
                }
            })
            .catch(() => {
                clearInterval(progressTimer)
                clearInterval(msgTimer)
                setError(
                    "Something went wrong while submitting the loan application. Please try again."
                )
            })

        return () => {
            clearInterval(progressTimer)
            clearInterval(msgTimer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // ── ERROR STATE ────────────────────────────────────────────────────────────
    if (error) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8F9FB] px-4">
                {/* Brand Bar */}
                <div className="absolute top-0 left-0 right-0 flex items-center gap-2.5 px-8 py-6">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#0A66C2] to-[#004182] shadow-md">
                        <Shield className="h-4 w-4 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-slate-800">HyperLoan</span>
                </div>

                <div className="flex flex-col items-center text-center max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 mb-6">
                        <AlertCircle className="h-8 w-8 text-rose-500" />
                    </div>
                    <h2 className="text-[1.4rem] font-bold text-slate-800 mb-3">Submission Failed</h2>
                    <p className="text-[0.95rem] text-slate-500 leading-relaxed mb-8">{error}</p>
                    <button
                        onClick={() => router.back()}
                        className="rounded-xl bg-[#0A66C2] px-6 py-3 text-sm font-semibold text-white hover:bg-[#004182] transition-colors"
                    >
                        Go Back & Try Again
                    </button>
                </div>
            </div>
        )
    }

    // ── LOADING STATE ──────────────────────────────────────────────────────────
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8F9FB] px-4">
            {/* Top Brand Bar */}
            <div className="absolute top-0 left-0 right-0 flex items-center gap-2.5 px-8 py-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#0A66C2] to-[#004182] shadow-md">
                    <Shield className="h-4 w-4 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-800">HyperLoan</span>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center text-center max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Animated Spinner */}
                <div className="relative mb-10">
                    <div className="h-20 w-20 rounded-full border-4 border-slate-200 border-t-[#0A66C2] animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Shield className="h-8 w-8 text-[#0A66C2]" />
                    </div>
                </div>

                <h1 className="text-[1.6rem] sm:text-[1.85rem] font-bold tracking-tight text-slate-800 leading-snug">
                    Choosing optimal rate using<br />
                    <span className="text-[#0A66C2]">Bandit Algorithm</span>...
                </h1>
                <p className="mt-4 text-[0.95rem] text-slate-500 font-medium leading-relaxed">
                    This will only take a moment. We&apos;re analyzing multiple scenarios to find the best possible loan terms for you.
                </p>

                {/* Progress Section */}
                <div className="mt-10 w-full max-w-sm space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                        <span key={msgIndex} className="animate-in fade-in duration-500 text-left">{MESSAGES[msgIndex]}</span>
                        <span className="text-[#0A66C2]">{Math.round(progress)}%</span>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                        <div
                            className="h-full rounded-full transition-all duration-200 ease-out bg-gradient-to-r from-[#0A66C2] to-cyan-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-6 text-sm font-medium text-slate-400">
                &copy; {new Date().getFullYear()} HyperLoan Inc. All rights reserved.
            </div>
        </div>
    )
}
