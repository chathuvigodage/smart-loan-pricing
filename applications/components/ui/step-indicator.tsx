import React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepIndicatorProps {
    step: 1 | 2
}

const steps = [
    { number: 1, label: "Customer Details" },
    { number: 2, label: "Loan Details" },
]

export function StepIndicator({ step }: StepIndicatorProps) {
    return (
        <div className="flex items-center space-x-4">
            {steps.map((s, idx) => {
                const isDone = step > s.number
                const isActive = step === s.number
                return (
                    <React.Fragment key={s.number}>
                        <div className="flex items-center space-x-2.5">
                            <div className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold border-2 transition-all duration-300",
                                isDone && "bg-emerald-500 border-emerald-500 text-white",
                                isActive && "bg-[#0A66C2] border-[#0A66C2] text-white shadow-md shadow-blue-500/30",
                                !isDone && !isActive && "bg-white border-slate-200 text-slate-400"
                            )}>
                                {isDone ? <Check className="h-4 w-4" /> : s.number}
                            </div>
                            <span className={cn(
                                "text-sm font-semibold transition-colors duration-300 hidden sm:block",
                                isActive && "text-slate-800",
                                isDone && "text-emerald-600",
                                !isDone && !isActive && "text-slate-400"
                            )}>
                                {s.label}
                            </span>
                        </div>
                        {idx < steps.length - 1 && (
                            <div className={cn(
                                "flex-1 h-px transition-all duration-500",
                                step > 1 ? "bg-emerald-400" : "bg-slate-200"
                            )} />
                        )}
                    </React.Fragment>
                )
            })}
        </div>
    )
}
