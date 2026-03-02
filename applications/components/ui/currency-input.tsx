import React, { useState } from "react"
import { DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import { baseInputClass, errorInputClass } from "./form-field"

interface CurrencyInputProps {
    id: string
    name: string
    placeholder?: string
    value: string
    onChange: (value: string) => void
    onBlur?: () => void
    hasError?: boolean
    disabled?: boolean
}

export function CurrencyInput({ id, name, placeholder = "0.00", value, onChange, onBlur, hasError, disabled }: CurrencyInputProps) {
    const [isFocused, setIsFocused] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Strip non-numeric except decimal
        const raw = e.target.value.replace(/[^0-9.]/g, "")
        onChange(raw)
    }

    return (
        <div className={cn(
            "flex h-12 w-full items-center rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200",
            "hover:border-slate-300",
            isFocused && "border-[#0A66C2] ring-4 ring-[#0A66C2]/12",
            hasError && errorInputClass,
            disabled && "bg-slate-50 cursor-not-allowed"
        )}>
            <span className={cn(
                "flex h-full items-center px-3.5 border-r text-slate-400 text-[0.9rem] font-medium transition-colors",
                isFocused ? "border-[#0A66C2]/30 text-[#0A66C2]" : "border-slate-200"
            )}>
                <DollarSign className="h-4 w-4" />
            </span>
            <input
                id={id}
                name={name}
                type="text"
                inputMode="decimal"
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => { setIsFocused(false); onBlur?.() }}
                className="flex-1 h-full px-4 text-[0.925rem] font-medium text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none disabled:cursor-not-allowed"
            />
        </div>
    )
}

interface PercentageInputProps {
    id: string
    name: string
    placeholder?: string
    value: string
    onChange: (value: string) => void
    disabled?: boolean
    label?: string
}

export function PercentageInput({ id, name, placeholder = "0.00", value, onChange, disabled, label }: PercentageInputProps) {
    return (
        <div className={cn(
            "flex h-12 w-full items-center rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-slate-300 focus-within:border-[#0A66C2] focus-within:ring-4 focus-within:ring-[#0A66C2]/12",
            disabled && "bg-slate-50 cursor-not-allowed"
        )}>
            <input
                id={id}
                name={name}
                type="text"
                inputMode="decimal"
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ""))}
                className="flex-1 h-full pl-4 text-[0.925rem] font-medium text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none disabled:cursor-not-allowed"
            />
            <span className="flex h-full items-center px-3.5 border-l border-slate-200 text-slate-400 text-[0.9rem] font-semibold">
                %
            </span>
        </div>
    )
}
