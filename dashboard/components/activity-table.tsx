import React from "react"
import { cn } from "@/lib/utils"

export interface RecentApplication {
    applicationId: number | string
    status: string
    amount: number | string
    date: string
}

interface ActivityTableProps {
    data: RecentApplication[]
}

function statusClass(status: string) {
    const s = status.toLowerCase()
    if (s === "approved" || s === "accepted") return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-500/20"
    if (s === "rejected")                     return "bg-rose-50    text-rose-700    ring-1 ring-inset ring-rose-500/20"
    if (s === "pending")                      return "bg-amber-50   text-amber-700   ring-1 ring-inset ring-amber-500/20"
    return "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-300/40"
}

function formatAmount(amount: number | string): string {
    const n = typeof amount === "string" ? parseFloat(amount) : amount
    if (isNaN(n)) return String(amount)
    return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function ActivityTable({ data }: ActivityTableProps) {
    return (
        <div className="flex flex-col space-y-5 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 fill-mode-both">
            <h3 className="text-[1.35rem] font-bold tracking-tight text-slate-800">Recent Activity</h3>

            {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 rounded-[1.25rem] bg-white shadow-sm ring-1 ring-slate-200/70 text-center">
                    <p className="text-base font-bold text-slate-600">No recent activity</p>
                    <p className="text-sm text-slate-400 mt-1">Applications will appear here once submitted.</p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-[1.25rem] bg-white shadow-sm ring-1 ring-slate-200/70">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-[0.925rem] whitespace-nowrap mb-2">
                            <thead className="border-b border-slate-100 bg-slate-50/50">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-slate-600/90 w-1/4">Application ID</th>
                                    <th className="px-6 py-4 font-semibold text-slate-600/90 w-1/4">Status</th>
                                    <th className="px-6 py-4 font-semibold text-slate-600/90 w-1/4">Amount</th>
                                    <th className="px-6 py-4 font-semibold text-slate-600/90 w-1/4">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100/80">
                                {data.map((item, idx) => (
                                    <tr key={idx} className="transition-colors hover:bg-slate-50/80 group">
                                        <td className="px-6 py-4 font-medium text-slate-500 group-hover:text-[#0A66C2] transition-colors cursor-pointer">
                                            #{item.applicationId}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "inline-flex items-center rounded-md px-2.5 py-1 text-[0.75rem] font-bold uppercase tracking-wider",
                                                statusClass(item.status)
                                            )}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-800">
                                            {formatAmount(item.amount)}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-500/80">
                                            {item.date}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
