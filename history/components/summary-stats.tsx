import React from "react"
import { Users, CheckCircle2, XCircle } from "lucide-react"

interface SummaryStatsProps {
    noOfApplications: string
    avgAcceptance: string
    avgRejection: string
}

const cards = [
    {
        key: "noOfApplications" as const,
        label: "Total Applications",
        Icon: Users,
        iconBg: "bg-blue-50",
        iconColor: "text-[#0A66C2]",
        accent: "from-blue-500/5",
    },
    {
        key: "avgAcceptance" as const,
        label: "Acceptance Rate",
        Icon: CheckCircle2,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        accent: "from-emerald-500/5",
    },
    {
        key: "avgRejection" as const,
        label: "Rejection Rate",
        Icon: XCircle,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        accent: "from-rose-500/5",
    },
]

export function SummaryStats({ noOfApplications, avgAcceptance, avgRejection }: SummaryStatsProps) {
    const values: Record<string, string> = { noOfApplications, avgAcceptance, avgRejection }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cards.map(({ key, label, Icon, iconBg, iconColor, accent }) => (
                <div
                    key={key}
                    className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300"
                >
                    {/* Gradient accent */}
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    <div className="relative flex items-start justify-between gap-3">
                        <div className="flex-1">
                            <p className="text-[0.78rem] font-semibold text-slate-500 mb-2.5 uppercase tracking-wide">
                                {label}
                            </p>
                            <p className="text-[2rem] font-bold tracking-tight text-slate-900 leading-none">
                                {values[key] ?? "—"}
                            </p>
                        </div>
                        <div className={`flex-shrink-0 rounded-xl p-2.5 ${iconBg}`}>
                            <Icon className={`h-5 w-5 ${iconColor}`} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
