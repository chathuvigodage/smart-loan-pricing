import React from "react"
import { TrendingUp, Activity } from "lucide-react"

export function PricingInsights() {
    return (
        <div className="flex flex-col space-y-4 h-full">
            <div className="flex items-center justify-between">
                <h3 className="text-[1.15rem] font-bold tracking-tight text-slate-800">Adaptive Insights</h3>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap">View All</button>
            </div>

            <div className="flex flex-col gap-4">
                {/* Insight Card 1 */}
                <div className="flex gap-4 rounded-[1.25rem] bg-gradient-to-br from-blue-50/60 to-white border border-blue-100 p-5 shadow-sm group hover:shadow-md transition-all hover:-translate-y-0.5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-28 h-28 bg-blue-400/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none group-hover:bg-blue-400/15 transition-all" />
                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 ring-4 ring-white shadow-sm">
                        <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="z-10 min-w-0">
                        <h4 className="text-[0.95rem] font-bold text-slate-800 leading-tight">Dynamic Rates Optimized</h4>
                        <p className="text-[0.825rem] text-slate-500 mt-1.5 leading-relaxed">
                            Risk brackets adjusted by <span className="font-semibold text-emerald-600">−0.25%</span> for Tier A this week — projecting a 12% lift in originations.
                        </p>
                    </div>
                </div>

                {/* Insight Card 2 */}
                <div className="flex gap-4 rounded-[1.25rem] bg-gradient-to-br from-indigo-50/60 to-white border border-indigo-100 p-5 shadow-sm group hover:shadow-md transition-all hover:-translate-y-0.5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-400/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none group-hover:bg-indigo-400/15 transition-all" />
                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 ring-4 ring-white shadow-sm">
                        <Activity className="h-4 w-4" />
                    </div>
                    <div className="z-10 min-w-0">
                        <h4 className="text-[0.95rem] font-bold text-slate-800 leading-tight">Portfolio Health Alert</h4>
                        <p className="text-[0.825rem] text-slate-500 mt-1.5 leading-relaxed">
                            Uptick in applications from the <span className="font-semibold text-indigo-600">Tech Sector</span>. Review sector-specific exposure limits.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
