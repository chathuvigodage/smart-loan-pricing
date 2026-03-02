import React, { useEffect, useState } from "react"
import { Shield } from "lucide-react"

const MESSAGES = [
    "Analyzing applicant credit profile...",
    "Computing risk-adjusted interest rates...",
    "Applying Bandit algorithm for optimal pricing...",
    "Evaluating loan term configurations...",
    "Finalizing best-fit loan offer...",
]

export function ProcessingScreen() {
    const [progress, setProgress] = useState(0)
    const [msgIndex, setMsgIndex] = useState(0)

    useEffect(() => {
        // Progress bar simulation
        const progressTimer = setInterval(() => {
            setProgress(p => {
                if (p >= 100) { clearInterval(progressTimer); return 100 }
                // slows down near 90
                const step = p < 80 ? 2 : 0.5
                return Math.min(p + step, 100)
            })
        }, 60)

        // Cycling messages
        const msgTimer = setInterval(() => {
            setMsgIndex(i => (i + 1) % MESSAGES.length)
        }, 1800)

        return () => { clearInterval(progressTimer); clearInterval(msgTimer) }
    }, [])

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8F9FB] px-4">
            {/* Top Brand Bar */}
            <div className="absolute top-0 left-0 right-0 flex items-center gap-2.5 px-8 py-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#0A66C2] to-[#004182] shadow-md">
                    <Shield className="h-4 w-4 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-800">HyperLoan</span>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center text-center max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Animated Spinner */}
                <div className="relative mb-10">
                    <div className="h-20 w-20 rounded-full border-4 border-slate-200 border-t-[#0A66C2] animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Shield className="h-8 w-8 text-[#0A66C2]" />
                    </div>
                </div>

                <h1 className="text-[1.6rem] sm:text-[1.85rem] font-bold tracking-tight text-slate-800 leading-snug">
                    Choosing optimal rate using<br />
                    <span className="text-[#0A66C2]">Bandit Algorithm</span>...
                </h1>
                <p className="mt-4 text-[0.95rem] text-slate-500 font-medium leading-relaxed">
                    This will only take a moment. We're analyzing multiple scenarios to find the best possible loan terms for you.
                </p>

                {/* Progress Section */}
                <div className="mt-10 w-full max-w-sm space-y-3">
                    {/* Status message */}
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                        <span key={msgIndex} className="animate-in fade-in duration-500 text-left">{MESSAGES[msgIndex]}</span>
                        <span className="text-[#0A66C2]">{Math.round(progress)}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                        <div
                            className="h-full rounded-full transition-all duration-200 ease-out bg-gradient-to-r from-[#0A66C2] to-cyan-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-6 text-sm font-medium text-slate-400">
                &copy; {new Date().getFullYear()} HyperLoan Inc. All rights reserved.
            </div>
        </div>
    )
}
