import * as React from "react"
import { cn } from "@/lib/utils"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean
    error?: boolean
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
    ({ className, required, error, children, ...props }, ref) => {
        return (
            <label
                ref={ref}
                className={cn(
                    "text-[0.85rem] font-semibold tracking-wide leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block text-[#475569] uppercase",
                    error ? "text-red-500" : "",
                    className
                )}
                {...props}
            >
                {children}
                {required && <span className="ml-1 text-red-500/80">*</span>}
            </label>
        )
    }
)
Label.displayName = "Label"

export { Label }
