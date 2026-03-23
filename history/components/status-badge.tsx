import React from "react"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
    status: string
}

// Normalise API values → display config
// Handles both "Approved"/"APPROVED" (dashboard) and "Accepted"/"accepted" (history)
const statusMap: Record<string, { label: string; className: string }> = {
    approved:    { label: "Approved",    className: "bg-emerald-50 text-emerald-700 ring-emerald-500/20" },
    accepted:    { label: "Accepted",    className: "bg-emerald-50 text-emerald-700 ring-emerald-500/20" },
    rejected:    { label: "Rejected",    className: "bg-rose-50    text-rose-700    ring-rose-500/20"    },
    pending:     { label: "Pending",     className: "bg-amber-50   text-amber-700   ring-amber-500/20"   },
    conditional: { label: "Conditional", className: "bg-blue-50    text-[#0A66C2]   ring-blue-500/20"    },
}

const fallback = { label: "", className: "bg-slate-100 text-slate-600 ring-slate-300/40" }

export function StatusBadge({ status }: StatusBadgeProps) {
    const key = ((status ?? "") + "").toLowerCase()
    const c = statusMap[key] ?? { ...fallback, label: status || "—" }

    return (
        <span className={cn(
            "inline-flex items-center rounded-md px-2.5 py-1 text-[0.72rem] font-bold uppercase tracking-wider ring-1 ring-inset",
            c.className
        )}>
            {c.label}
        </span>
    )
}
