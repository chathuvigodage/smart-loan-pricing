import React from "react"
import { cn } from "@/lib/utils"
import { LoanRateOption } from "@/types/application"
import { Star } from "lucide-react"

interface PricingTableProps {
    options: LoanRateOption[]
    onSelect?: (option: LoanRateOption) => void
    selectedRate?: string
}

export function PricingTable({ options, onSelect, selectedRate }: PricingTableProps) {
    return (
        <div className="flex flex-col space-y-4">
            <h3 className="text-[1.15rem] font-bold text-slate-800 tracking-tight">Pricing Options</h3>

            <div className="rounded-2xl bg-white border border-slate-200/70 shadow-sm overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
                    {["Interest Rate", "Acceptance Prob.", "Expected Profit", "Status"].map(h => (
                        <span key={h} className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest">{h}</span>
                    ))}
                </div>

                {/* Rows */}
                <div className="divide-y divide-slate-100/80">
                    {options.map((opt, idx) => {
                        const isRecommended = opt.status === "Recommended"
                        const isSelected = selectedRate === opt.rate
                        const rateDisplay = parseFloat(opt.rate).toFixed(2)
                        const profitDisplay = parseFloat(opt.profit).toLocaleString()
                        const probabilityDisplay = parseFloat(opt.probability_rate)

                        return (
                            <button
                                key={idx}
                                onClick={() => onSelect?.(opt)}
                                className={cn(
                                    "w-full grid grid-cols-4 gap-4 px-6 py-4 text-left transition-all duration-200 group",
                                    isSelected
                                        ? "bg-[#0A66C2]/5 ring-inset ring-1 ring-[#0A66C2]/20"
                                        : "hover:bg-slate-50/80",
                                    isRecommended && !isSelected && "bg-blue-50/30"
                                )}
                            >
                                {/* Interest Rate */}
                                <span className={cn(
                                    "text-[0.95rem] font-bold transition-colors",
                                    isRecommended ? "text-[#0A66C2]" : "text-slate-800 group-hover:text-[#0A66C2]"
                                )}>
                                    {rateDisplay}%
                                </span>

                                {/* Acceptance Prob */}
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-[0.875rem] font-semibold text-slate-700">{probabilityDisplay}%</span>
                                    <div className="h-1.5 w-full max-w-[80px] rounded-full bg-slate-100 overflow-hidden">
                                        <div
                                            className={cn(
                                                "h-full rounded-full transition-all duration-500",
                                                probabilityDisplay >= 70 ? "bg-emerald-500" : probabilityDisplay >= 60 ? "bg-amber-400" : "bg-rose-400"
                                            )}
                                            style={{ width: `${probabilityDisplay}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Expected Profit */}
                                <span className="text-[0.875rem] font-semibold text-slate-700">
                                    Rs. {profitDisplay}
                                </span>

                                {/* Status Badge */}
                                <div className="flex items-center">
                                    {isRecommended ? (
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0A66C2]/10 px-2.5 py-1 text-[0.72rem] font-bold text-[#0A66C2] ring-1 ring-inset ring-[#0A66C2]/20">
                                            <Star className="h-3 w-3 fill-current" />
                                            Recommended
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[0.72rem] font-semibold text-slate-500 ring-1 ring-inset ring-slate-200">
                                            Alternative
                                        </span>
                                    )}
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
