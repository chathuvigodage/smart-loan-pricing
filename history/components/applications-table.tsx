"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, FileSearch } from "lucide-react"
import { ApplicationRecord, AppStatus } from "@/lib/mock-data/applicationHistoryMocks"
import { StatusBadge } from "@/history/components/status-badge"
import { ConfidenceBar } from "@/history/components/confidence-bar"
import { cn } from "@/lib/utils"

// ────────────────────────────────────────
const PAGE_SIZE = 5

type SortKey = keyof Pick<ApplicationRecord, "applicationId" | "customerName" | "date" | "confidence" | "status" | "profitLoss">
type SortDir = "asc" | "desc"

interface Props {
    data: ApplicationRecord[]
}

function SortIcon({ column, active, dir }: { column: string, active: boolean, dir: SortDir }) {
    if (!active) return <ArrowUpDown className="h-3 w-3 text-slate-300 group-hover:text-slate-400 transition-colors" />
    return dir === "asc"
        ? <ArrowUp className="h-3 w-3 text-[#0A66C2]" />
        : <ArrowDown className="h-3 w-3 text-[#0A66C2]" />
}
// ────────────────────────────────────────

export function ApplicationsTable({ data }: Props) {
    const [sortKey, setSortKey] = useState<SortKey>("date")
    const [sortDir, setSortDir] = useState<SortDir>("desc")
    const [page, setPage] = useState(1)

    const handleSort = (key: SortKey) => {
        if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc")
        else { setSortKey(key); setSortDir("asc") }
        setPage(1)
    }

    const sorted = useMemo(() => [...data].sort((a, b) => {
        let va: string | number = a[sortKey] ?? ""
        let vb: string | number = b[sortKey] ?? ""
        if (typeof va === "string") va = va.toLowerCase()
        if (typeof vb === "string") vb = vb.toLowerCase()
        return sortDir === "asc" ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1)
    }), [data, sortKey, sortDir])

    const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
    const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    const colHeader = (label: string, key: SortKey) => (
        <button
            onClick={() => handleSort(key)}
            className="group flex items-center gap-1.5 text-[0.72rem] font-bold text-slate-500 uppercase tracking-widest hover:text-slate-800 transition-colors focus:outline-none"
        >
            {label}
            <SortIcon column={key} active={sortKey === key} dir={sortDir} />
        </button>
    )

    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/60">
                <FileSearch className="h-10 w-10 text-slate-300 mb-3" />
                <p className="text-base font-bold text-slate-600">No applications found</p>
                <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filter criteria</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col space-y-4">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-hidden rounded-2xl bg-white border border-slate-200/70 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-slate-100 bg-slate-50/60">
                            <tr>
                                <th className="px-5 py-4">{colHeader("Application ID", "applicationId")}</th>
                                <th className="px-5 py-4">{colHeader("Customer Name", "customerName")}</th>
                                <th className="px-5 py-4">{colHeader("Date", "date")}</th>
                                <th className="px-5 py-4 whitespace-nowrap">Offered Rate</th>
                                <th className="px-5 py-4">{colHeader("Confidence", "confidence")}</th>
                                <th className="px-5 py-4">{colHeader("Status", "status")}</th>
                                <th className="px-5 py-4">{colHeader("Profit / Loss", "profitLoss")}</th>
                                <th className="px-5 py-4 whitespace-nowrap text-[0.72rem] font-bold text-slate-500 uppercase tracking-widest">Update Preference</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80">
                            {paged.map(row => (
                                <tr key={row.id} className="group transition-colors hover:bg-slate-50/80">
                                    <td className="px-5 py-4 font-mono text-[0.8rem] font-semibold text-slate-500 group-hover:text-[#0A66C2] transition-colors">
                                        {row.applicationId}
                                    </td>
                                    <td className="px-5 py-4 font-semibold text-slate-800 whitespace-nowrap">{row.customerName}</td>
                                    <td className="px-5 py-4 text-[0.875rem] font-medium text-slate-500">{row.date}</td>
                                    <td className="px-5 py-4 text-[0.875rem] font-bold text-slate-700">
                                        {row.offeredRate ?? <span className="text-slate-300">N/A</span>}
                                    </td>
                                    <td className="px-5 py-4"><ConfidenceBar value={row.confidence} /></td>
                                    <td className="px-5 py-4"><StatusBadge status={row.status} /></td>
                                    <td className={cn(
                                        "px-5 py-4 text-[0.875rem] font-bold",
                                        row.profitLoss > 0 ? "text-emerald-600" : row.profitLoss < 0 ? "text-rose-600" : "text-slate-400"
                                    )}>
                                        {row.profitLoss > 0 ? `$${row.profitLoss.toLocaleString()}` :
                                            row.profitLoss < 0 ? `($${Math.abs(row.profitLoss).toLocaleString()})` : "$0"}
                                    </td>
                                    <td className="px-5 py-4">
                                        <Link
                                            href="/customer-response"
                                            className="inline-flex items-center rounded-lg border border-[#0A66C2]/30 bg-blue-50 px-3 py-1.5 text-[0.78rem] font-bold text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] hover:shadow-md hover:shadow-blue-500/15 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/30 whitespace-nowrap"
                                        >
                                            Update
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="flex flex-col gap-3 md:hidden">
                {paged.map(row => (
                    <div key={row.id} className="rounded-2xl bg-white border border-slate-200/70 p-4 shadow-sm space-y-3">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="font-mono text-[0.78rem] text-slate-400">{row.applicationId}</p>
                                <p className="font-bold text-slate-800 text-[0.95rem] mt-0.5">{row.customerName}</p>
                            </div>
                            <StatusBadge status={row.status} />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[0.82rem]">
                            <div><span className="text-slate-400">Date: </span><span className="font-semibold text-slate-700">{row.date}</span></div>
                            <div><span className="text-slate-400">Rate: </span><span className="font-semibold text-slate-700">{row.offeredRate ?? "N/A"}</span></div>
                            <div><span className="text-slate-400">P/L: </span><span className={cn("font-bold", row.profitLoss > 0 ? "text-emerald-600" : row.profitLoss < 0 ? "text-rose-600" : "text-slate-400")}>
                                {row.profitLoss > 0 ? `$${row.profitLoss.toLocaleString()}` : row.profitLoss < 0 ? `($${Math.abs(row.profitLoss)})` : "$0"}
                            </span></div>
                        </div>
                        <ConfidenceBar value={row.confidence} />
                        <Link
                            href="/customer-response"
                            className="flex w-full items-center justify-center rounded-xl border border-[#0A66C2]/30 bg-blue-50 py-2.5 text-[0.85rem] font-bold text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all"
                        >
                            Update Customer Preference
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-1">
                <p className="text-[0.8rem] font-medium text-slate-500">
                    Showing <span className="font-bold text-slate-700">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sorted.length)}</span> of <span className="font-bold text-slate-700">{sorted.length}</span>
                </p>
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[0.8rem] font-semibold text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronLeft className="h-3.5 w-3.5" /> Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                        .reduce<(number | "...")[]>((acc, p, i, arr) => {
                            if (i > 0 && arr[i - 1] !== p - 1) acc.push("...")
                            acc.push(p)
                            return acc
                        }, [])
                        .map((p, i) =>
                            p === "..." ? (
                                <span key={`ellipsis-${i}`} className="px-1 text-slate-400 text-sm">…</span>
                            ) : (
                                <button
                                    key={p}
                                    onClick={() => setPage(p as number)}
                                    className={cn(
                                        "flex h-8 w-8 items-center justify-center rounded-lg text-[0.8rem] font-bold border transition-all",
                                        page === p
                                            ? "bg-[#0A66C2] border-[#0A66C2] text-white shadow-md shadow-blue-500/20"
                                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                    )}
                                >
                                    {p}
                                </button>
                            )
                        )
                    }

                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[0.8rem] font-semibold text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                        Next <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
