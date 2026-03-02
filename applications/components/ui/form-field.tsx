import React from "react"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormFieldProps {
    label: string
    htmlFor: string
    error?: string
    hint?: string
    required?: boolean
    className?: string
    children: React.ReactNode
}

export function FormField({ label, htmlFor, error, hint, required, className, children }: FormFieldProps) {
    return (
        <div className={cn("flex flex-col space-y-1.5 group", className)}>
            <label
                htmlFor={htmlFor}
                className="text-[0.825rem] font-semibold text-slate-600 uppercase tracking-wider"
            >
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </label>
            {children}
            {hint && !error && (
                <p className="text-[0.75rem] font-medium text-slate-400">{hint}</p>
            )}
            {error && (
                <div className="flex items-center gap-1.5 text-[0.78rem] font-medium text-red-500 animate-in slide-in-from-top-1 fade-in duration-200">
                    <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                    <p>{error}</p>
                </div>
            )}
        </div>
    )
}

// Base input style — shared across all native form inputs
export const baseInputClass = cn(
    "flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-[0.925rem] font-medium text-slate-800",
    "placeholder:text-slate-400 shadow-sm transition-all duration-200",
    "focus:outline-none focus:border-[#0A66C2] focus:ring-4 focus:ring-[#0A66C2]/12",
    "hover:border-slate-300",
    "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
)

// Shared select class
export const baseSelectClass = cn(
    baseInputClass,
    "appearance-none bg-[url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")] bg-[position:right_1rem_center] bg-no-repeat pr-10 cursor-pointer"
)

// Error state override
export const errorInputClass = "border-red-400 focus:border-red-500 focus:ring-red-500/15"
