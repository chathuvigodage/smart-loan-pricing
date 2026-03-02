import React from "react"
import { cn } from "@/lib/utils"

interface ConfidenceBarProps {
    value: number // 0-100
}

export function ConfidenceBar({ value }: ConfidenceBarProps) {
    const color =
        value >= 85 ? "bg-emerald-500" :
            value >= 70 ? "bg-amber-400" :
                "bg-rose-400"

    return (
        <div className="flex items-center gap-2.5 min-w-[90px]">
            <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                    className={cn("h-full rounded-full transition-all duration-500", color)}
                    style={{ width: `${value}%` }}
                />
            </div>
            <span className="text-[0.8rem] font-bold text-slate-700 w-8 text-right flex-shrink-0">{value}%</span>
        </div>
    )
}
