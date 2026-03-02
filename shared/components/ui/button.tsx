import * as React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean
    variant?: "default" | "outline" | "ghost" | "link" | "glass"
    size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", isLoading, children, disabled, ...props }, ref) => {

        // Premium fintech design: smooth gradients, deep shadows on hover, subtle borders
        const variantClasses = {
            default: "bg-gradient-to-b from-[#0A66C2] to-[#004182] text-white shadow-[0_2px_10px_rgba(10,102,194,0.3)] hover:shadow-[0_4px_15px_rgba(10,102,194,0.4)] hover:-translate-y-[1px] border border-transparent",
            outline: "border border-slate-200 bg-white/80 backdrop-blur-sm hover:bg-slate-50 hover:border-slate-300 text-slate-800 shadow-sm transition-all",
            ghost: "hover:bg-slate-100/60 hover:text-slate-900 text-slate-600 border border-transparent",
            link: "text-[#0A66C2] font-semibold text-sm underline-offset-4 hover:underline border border-transparent !bg-transparent !p-0 !h-auto",
            glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-lg",
        }

        const sizeClasses = {
            default: "h-11 px-6 py-2",
            sm: "h-9 rounded-md px-4 text-sm",
            lg: "h-12 rounded-xl px-8 text-base",
            icon: "h-11 w-11",
        }

        return (
            <button
                ref={ref}
                disabled={isLoading || disabled}
                className={cn(
                    "inline-flex w-full items-center justify-center whitespace-nowrap rounded-lg text-[0.95rem] font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
                    variantClasses[variant],
                    variant !== "link" && sizeClasses[size],
                    className
                )}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        )
    }
)
Button.displayName = "Button"

export { Button }
