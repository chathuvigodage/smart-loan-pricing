import React from "react"
import { cn } from "@/lib/utils"
import { AppStatus } from "@/lib/mock-data/applicationHistoryMocks"

interface StatusBadgeProps {
    status: AppStatus
}

const config: Record<AppStatus, { label: string; className: string }> = {
    Accepted: { label: "Accepted", className: "bg-emerald-50 text-emerald-700 ring-emerald-500/20" },
    Rejected: { label: "Rejected", className: "bg-rose-50 text-rose-700 ring-rose-500/20" },
    Pending: { label: "Pending", className: "bg-amber-50 text-amber-700 ring-amber-500/20" },
    Conditional: { label: "Conditional", className: "bg-blue-50 text-blue-700 ring-blue-500/20" },
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const c = config[status]
    return (
        <span className={cn(
            "inline-flex items-center rounded-md px-2.5 py-1 text-[0.72rem] font-bold uppercase tracking-wider ring-1 ring-inset",
            c.className
        )}>
            {c.label}
        </span>
    )
}
