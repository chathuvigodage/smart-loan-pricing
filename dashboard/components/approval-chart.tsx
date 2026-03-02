import React from "react"

export function ApprovalChart() {
    return (
        <div className="mt-8 flex flex-col space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
            <h3 className="text-[1.15rem] font-bold text-slate-800 tracking-tight">Loan Approval Rate (Last 30 Days)</h3>
            <div className="relative h-64 w-full overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-[#0B1120] to-[#1e293b] shadow-xl shadow-slate-900/10 border border-slate-800/80 group">

                {/* Decorative inner glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />

                <svg
                    className="absolute inset-x-0 bottom-0 h-[85%] w-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 1000 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Subtle grid lines for depth */}
                    <line x1="0" y1="75" x2="1000" y2="75" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" strokeWidth="1" />
                    <line x1="0" y1="150" x2="1000" y2="150" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" strokeWidth="1" />
                    <line x1="0" y1="225" x2="1000" y2="225" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" strokeWidth="1" />

                    {/* Outer glow effect for the line */}
                    <path
                        d="M 500 290 Q 600 220 650 180 T 750 130 T 800 100 L 850 60"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="blur-[6px]"
                    />

                    {/* The Data Line */}
                    <path
                        d="M 500 290 Q 600 220 650 180 T 750 130 T 800 100 L 850 60"
                        stroke="#ffffff"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Data Points with drop shadows */}
                    <g filter="drop-shadow(0 0 8px rgba(255,255,255,0.4))">
                        <circle cx="500" cy="290" r="5" fill="#1e293b" stroke="white" strokeWidth="2.5" />
                        <circle cx="585" cy="242" r="5" fill="#1e293b" stroke="white" strokeWidth="2.5" className="transition-all hover:r-6 hover:fill-white cursor-pointer" />
                        <circle cx="670" cy="180" r="5" fill="#1e293b" stroke="white" strokeWidth="2.5" className="transition-all hover:r-6 hover:fill-white cursor-pointer" />
                        <circle cx="760" cy="120" r="5" fill="#1e293b" stroke="white" strokeWidth="2.5" className="transition-all hover:r-6 hover:fill-white cursor-pointer" />
                    </g>

                    {/* Arrow Head at the end */}
                    <polygon points="825,75 870,40 860,85" fill="#ffffff" filter="drop-shadow(0 0 6px rgba(255,255,255,0.3))" />

                </svg>
            </div>
        </div>
    )
}
