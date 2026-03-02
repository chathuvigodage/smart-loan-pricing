import React from "react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
    icon: React.ReactNode
    label: string
    value: string
    subValue?: string
    accent?: "blue" | "emerald" | "violet" | "amber"
    className?: string
}

const accentMap = {
    blue: { icon: "bg-blue-50 text-blue-600 ring-blue-100", bar: "bg-blue-500" },
    emerald: { icon: "bg-emerald-50 text-emerald-600 ring-emerald-100", bar: "bg-emerald-500" },
    violet: { icon: "bg-violet-50 text-violet-600 ring-violet-100", bar: "bg-violet-500" },
    amber: { icon: "bg-amber-50 text-amber-600 ring-amber-100", bar: "bg-amber-500" },
}

export function MetricCard({ icon, label, value, subValue, accent = "blue", className }: MetricCardProps) {
    const colors = accentMap[accent]

    return (
        <div className={cn(
            "group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/70 p-6 shadow-sm overflow-hidden",
            "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300",
            className
        )}>
            {/* Decorative glow on hover */}
            <div className={cn("absolute top-0 right-0 -mr-6 -mt-6 h-20 w-20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500", colors.bar, "opacity-10")} />

            <div className="flex items-center gap-2.5 mb-4">
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-full ring-4", colors.icon, "ring-" + colors.icon.split("ring-")[1])}>
                    {icon}
                </div>
                <span className="text-[0.825rem] font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
            </div>

            <div>
                <p className="text-[2.25rem] font-bold tracking-tight text-slate-900 leading-none">{value}</p>
                {subValue && <p className="mt-1.5 text-[0.8rem] font-medium text-slate-400">{subValue}</p>}
            </div>
        </div>
    )
}
