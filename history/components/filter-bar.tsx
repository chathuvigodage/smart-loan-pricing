import React from "react"
import { Search, ChevronDown } from "lucide-react"

interface FilterBarProps {
    search: string
    onSearch: (v: string) => void
    status: string
    onStatus: (v: string) => void
}

const STATUS_OPTIONS = ["All", "Accepted", "Rejected", "Pending", "Conditional"]

export function FilterBar({ search, onSearch, status, onStatus }: FilterBarProps) {
    return (
        <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="flex flex-1 min-w-[200px] max-w-xs items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm transition-all focus-within:border-[#0A66C2] focus-within:ring-4 focus-within:ring-[#0A66C2]/10 hover:border-slate-300">
                <Search className="h-[1rem] w-[1rem] flex-shrink-0 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search by Name/ID..."
                    value={search}
                    onChange={e => onSearch(e.target.value)}
                    className="flex-1 bg-transparent text-[0.875rem] font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none"
                    suppressHydrationWarning
                />
            </div>

            {/* Status filter */}
            <div className="relative">
                <select
                    value={status}
                    onChange={e => onStatus(e.target.value)}
                    className="appearance-none rounded-xl border border-slate-200 bg-white pl-4 pr-9 py-2.5 text-[0.875rem] font-semibold text-slate-700 shadow-sm cursor-pointer focus:outline-none focus:border-[#0A66C2] focus:ring-4 focus:ring-[#0A66C2]/10 hover:border-slate-300 transition-all"
                    suppressHydrationWarning
                >
                    {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s}>Status: {s}</option>
                    ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
        </div>
    )
}
