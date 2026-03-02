import React from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "@/lib/utils"

type DecisionType = "accepted" | "rejected" | null

interface DecisionSelectorProps {
    decision: DecisionType
    onSelect: (d: DecisionType) => void
    rejectionReason: string
    onReasonChange: (r: string) => void
}

export function DecisionSelector({ decision, onSelect, rejectionReason, onReasonChange }: DecisionSelectorProps) {
    return (
        <div className="rounded-2xl bg-white border border-slate-200/70 shadow-sm p-6 sm:p-8 space-y-6">
            <div>
                <h2 className="text-[1.05rem] font-bold text-slate-800">Customer Response</h2>
                <p className="mt-1 text-[0.875rem] font-medium text-slate-500">
                    What is the customer&apos;s response to this offer?
                </p>
            </div>

            {/* Accept / Reject buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Accept */}
                <button
                    type="button"
                    onClick={() => onSelect("accepted")}
                    className={cn(
                        "flex flex-col items-center justify-center gap-3 rounded-2xl py-8 px-4 border-2 transition-all duration-250 group focus:outline-none focus-visible:ring-4",
                        decision === "accepted"
                            ? "border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-500/15 focus-visible:ring-emerald-200"
                            : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/40 focus-visible:ring-emerald-100"
                    )}
                >
                    <div className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-full transition-all duration-250",
                        decision === "accepted"
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-110"
                            : "bg-emerald-50 text-emerald-400 group-hover:bg-emerald-100 group-hover:text-emerald-600"
                    )}>
                        <ThumbsUp className="h-6 w-6" strokeWidth={2.5} />
                    </div>
                    <span className={cn(
                        "text-[1rem] font-bold transition-colors duration-200",
                        decision === "accepted" ? "text-emerald-700" : "text-slate-500 group-hover:text-emerald-600"
                    )}>
                        Accepted
                    </span>
                </button>

                {/* Reject */}
                <button
                    type="button"
                    onClick={() => onSelect("rejected")}
                    className={cn(
                        "flex flex-col items-center justify-center gap-3 rounded-2xl py-8 px-4 border-2 transition-all duration-250 group focus:outline-none focus-visible:ring-4",
                        decision === "rejected"
                            ? "border-rose-500 bg-rose-50 shadow-md shadow-rose-500/15 focus-visible:ring-rose-200"
                            : "border-slate-200 bg-white hover:border-rose-300 hover:bg-rose-50/40 focus-visible:ring-rose-100"
                    )}
                >
                    <div className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-full transition-all duration-250",
                        decision === "rejected"
                            ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-110"
                            : "bg-rose-50 text-rose-400 group-hover:bg-rose-100 group-hover:text-rose-600"
                    )}>
                        <ThumbsDown className="h-6 w-6" strokeWidth={2.5} />
                    </div>
                    <span className={cn(
                        "text-[1rem] font-bold transition-colors duration-200",
                        decision === "rejected" ? "text-rose-700" : "text-slate-500 group-hover:text-rose-600"
                    )}>
                        Rejected
                    </span>
                </button>
            </div>

            {/* Rejection reason — slides in only when rejected */}
            <div className={cn(
                "overflow-hidden transition-all duration-350 ease-in-out",
                decision === "rejected" ? "max-h-56 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
            )}>
                <div className="pt-1 space-y-2">
                    <label htmlFor="rejectionReason" className="block text-[0.825rem] font-semibold text-slate-600 uppercase tracking-wider">
                        Reason for Rejection <span className="font-medium text-slate-400 normal-case tracking-normal">(Optional)</span>
                    </label>
                    <textarea
                        id="rejectionReason"
                        rows={3}
                        value={rejectionReason}
                        onChange={e => onReasonChange(e.target.value)}
                        placeholder="e.g. 'Rate too high', 'Found better offer elsewhere'..."
                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-[0.9rem] font-medium text-slate-700 placeholder:text-slate-400 transition-all focus:outline-none focus:border-[#0A66C2] focus:ring-4 focus:ring-[#0A66C2]/12 focus:bg-white hover:border-slate-300"
                    />
                </div>
            </div>
        </div>
    )
}
