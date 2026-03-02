import React from "react"
import { Lightbulb } from "lucide-react"

interface RationaleCardProps {
    text: string
}

export function RationaleCard({ text }: RationaleCardProps) {
    return (
        <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/70 p-6 shadow-sm">
            <div className="flex items-center gap-2.5 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-amber-600 ring-4 ring-amber-100">
                    <Lightbulb className="h-4 w-4" />
                </div>
                <h3 className="text-[0.95rem] font-bold text-slate-800">Recommendation Rationale</h3>
            </div>
            <p className="text-[0.875rem] text-slate-600 leading-relaxed font-medium">{text}</p>
        </div>
    )
}
