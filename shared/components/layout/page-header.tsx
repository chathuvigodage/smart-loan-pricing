import React from "react"
import Link from "next/link"
import { Shield } from "lucide-react"

/**
 * PageHeader — consistent sticky top bar used across all standalone pages.
 * Matches the pattern on result, customer-response, and application-history pages.
 */
export function PageHeader() {
    return (
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-200/60 bg-white/85 backdrop-blur-md px-6 sm:px-10">
            {/* Brand — top left, always visible */}
            <Link href="/dashboard" className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]/40 rounded-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#0A66C2] to-[#004182] shadow-md">
                    <Shield className="h-4 w-4 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-800">HyperLoan</span>
            </Link>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
                <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]/30">
                    Log Out
                </button>
                {/* Abstract avatar — consistent with dashboard */}
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-orange-100 to-orange-200 border border-orange-200/50 cursor-pointer hover:ring-2 hover:ring-orange-300/50 transition-all">
                    <div className="h-[45%] w-[35%] rounded-t-full bg-orange-300 mt-[35%]" />
                </div>
            </div>
        </header>
    )
}
