import React from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { summaryStats } from "@/lib/mock-data/applicationHistoryMocks"
import { cn } from "@/lib/utils"

const cards = [
    { key: "totalApplications", label: "Total Applications" },
    { key: "acceptanceRate", label: "Acceptance Rate" },
    { key: "avgProfitability", label: "Average Profitability" },
    { key: "avgConfidence", label: "Avg. Model Confidence" },
] as const

export function SummaryStats() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map(({ key, label }) => {
                const stat = summaryStats[key]
                return (
                    <div key={key} className="group rounded-2xl bg-white border border-slate-200/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300 overflow-hidden relative">
                        <div className="absolute top-0 right-0 -mr-6 -mt-6 h-16 w-16 rounded-full bg-blue-400/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <p className="text-[0.8rem] font-semibold text-slate-500 mb-2">{label}</p>
                        <p className="text-[1.85rem] font-bold tracking-tight text-slate-900 leading-none">{stat.value}</p>
                        <div className={cn(
                            "flex items-center gap-1 mt-2 text-[0.78rem] font-semibold",
                            stat.up ? "text-emerald-600" : "text-rose-500"
                        )}>
                            {stat.up
                                ? <TrendingUp className="h-3.5 w-3.5" />
                                : <TrendingDown className="h-3.5 w-3.5" />
                            }
                            {stat.change}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
