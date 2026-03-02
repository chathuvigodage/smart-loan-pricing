"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { AlertCircle, Eye, EyeOff } from "lucide-react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false)
        const [isFocused, setIsFocused] = React.useState(false)
        const isPassword = type === "password"
        const inputType = isPassword ? (showPassword ? "text" : "password") : type

        return (
            <div className="relative w-full group">
                <input
                    type={inputType}
                    className={cn(
                        "flex h-12 w-full rounded-xl border bg-white/80 backdrop-blur-sm px-4 py-2 text-[0.95rem] text-slate-800 shadow-sm transition-all duration-300 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus:bg-white disabled:cursor-not-allowed disabled:bg-slate-50 border-slate-200/80 hover:border-slate-300 focus:border-[#0A66C2] focus:ring-4 focus:ring-[#0A66C2]/15",
                        error && "border-red-500 focus:border-red-500 focus:ring-red-500/15 pr-10",
                        isPassword && "pr-10",
                        className
                    )}
                    ref={ref}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />
                {isPassword && !error && (
                    <button
                        type="button"
                        className={cn(
                            "absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors duration-200",
                            isFocused && "text-slate-600"
                        )}
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
                        ) : (
                            <Eye className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
                        )}
                    </button>
                )}
                {error && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                        <AlertCircle className="h-[1.125rem] w-[1.125rem] text-red-500" aria-hidden="true" />
                    </div>
                )}
                {error && (
                    <div className="mt-2 flex items-center gap-1.5 text-[0.8rem] font-medium text-red-500 animate-in slide-in-from-top-1 fade-in duration-200">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <p>{error}</p>
                    </div>
                )}
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
