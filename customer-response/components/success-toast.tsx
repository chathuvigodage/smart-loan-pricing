import React, { useEffect } from "react"
import { CheckCircle2, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SuccessToastProps {
    applicationId: string
    onClose: () => void
}

export function SuccessToast({ applicationId, onClose }: SuccessToastProps) {
    // Auto-dismiss after 6 seconds
    useEffect(() => {
        const t = setTimeout(onClose, 6000)
        return () => clearTimeout(t)
    }, [onClose])

    return (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in slide-in-from-bottom-4 fade-in duration-500 ease-out">
            <div className="flex items-start gap-3.5 rounded-2xl bg-white border border-emerald-200 shadow-[0_8px_30px_rgba(0,0,0,0.10)] p-4">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-[0.9rem] font-bold text-slate-800">Submission Successful</p>
                    <p className="text-[0.8rem] font-medium text-slate-500 mt-0.5">
                        Feedback for Application <span className="font-bold text-slate-700">{applicationId}</span> has been recorded.
                    </p>
                    {/* Progress bar */}
                    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-emerald-400 animate-[shrink_6s_linear_forwards]"
                            style={{ animation: "shrink 6s linear forwards" }}
                        />
                    </div>
                </div>
                <button onClick={onClose} className="flex-shrink-0 rounded-lg p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}
