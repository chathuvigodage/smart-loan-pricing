import React from "react"

interface StatCardProps {
    title: string
    value: string | number
}

export function StatCard({ title, value }: StatCardProps) {
    return (
        <div className="group flex flex-col justify-center rounded-[1.25rem] bg-white border border-slate-200/60 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-slate-300 overflow-hidden relative">
            {/* Decorative gradient flare on hover */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 h-24 w-24 rounded-full bg-blue-500/10 blur-[24px] transition-opacity duration-500 opacity-0 group-hover:opacity-100" />

            <h3 className="text-[0.95rem] font-semibold text-slate-500 mb-2.5 z-10">{title}</h3>
            <p className="text-[2.25rem] font-bold tracking-tight text-slate-900 z-10">{value}</p>
        </div>
    )
}
