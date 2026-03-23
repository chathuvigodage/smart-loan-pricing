"use client"

import React, { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, FileSearch, Loader2, AlertCircle } from "lucide-react"
import { LoanListResponse } from "@/lib/mock-data/applicationHistoryMocks"
import { StatusBadge } from "@/history/components/status-badge"
import { ConfidenceBar } from "@/history/components/confidence-bar"
import { useLoanApplication } from "@/context/loan-application-context"
import { cn } from "@/lib/utils"

// ────────────────────────────────────────
const PAGE_SIZE = 5

type SortKey = keyof Pick<LoanListResponse, "loanId" | "customerName" | "createdAt" | "confidence" | "status">
type SortDir = "asc" | "desc"

interface Props {
    data: LoanListResponse[]
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
    if (!active) return <ArrowUpDown className="h-3 w-3 text-slate-300 group-hover:text-slate-400 transition-colors" />
    return dir === "asc"
        ? <ArrowUp className="h-3 w-3 text-[#0A66C2]" />
        : <ArrowDown className="h-3 w-3 text-[#0A66C2]" />
}
// ────────────────────────────────────────

/** Parse confidence from the API — it may come as "85%", "85", or null */
function parseConfidence(raw: string | null | undefined): number {
    if (raw == null || raw === "") return 0
    const n = parseFloat(String(raw).replace("%", "").trim())
    return isNaN(n) ? 0 : Math.min(100, Math.max(0, n))
}

export function ApplicationsTable({ data }: Props) {
    const router = useRouter()
    const { setLoanDetail } = useLoanApplication()

    const [sortKey, setSortKey] = useState<SortKey>("createdAt")
    const [sortDir, setSortDir] = useState<SortDir>("desc")
    const [page, setPage] = useState(1)

    // Per-row loading and error state keyed by loanId
    const [loadingId, setLoadingId] = useState<string | null>(null)
    const [rowError, setRowError] = useState<{ id: string; msg: string } | null>(null)

    const handleSort = (key: SortKey) => {
        if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc")
        else { setSortKey(key); setSortDir("asc") }
        setPage(1)
    }

    const sorted = useMemo(() => [...data].sort((a, b) => {
        const va = (a[sortKey] ?? "").toLowerCase()
        const vb = (b[sortKey] ?? "").toLowerCase()
        return sortDir === "asc" ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1)
    }), [data, sortKey, sortDir])

    const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
    const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    // ── Update button handler ─────────────────────────────────────────────────
    const handleUpdate = async (loanId: string) => {
        setLoadingId(loanId)
        setRowError(null)
        try {
            const token = localStorage.getItem("token")
            const res = await fetch("http://localhost:8081/loan/specific/id", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ applicationId: loanId }),
            })

            const json = await res.json()

            if (json?.code === "200" || res.ok) {
                const detail = json?.data ?? json
                setLoanDetail({
                    applicationId: detail.applicationId ?? loanId,
                    customerName:  detail.customerName  ?? "",
                    loanAmount:    detail.loanAmount     ?? "",
                    term:          detail.term           ?? "",
                    interestRate:  detail.interestRate   ?? "",
                    monthlyPayment: detail.monthlyPayment ?? "",
                })
                router.push("/customer-response")
            } else {
                const msg = json?.message ?? json?.error ?? "Failed to load loan details. Please try again."
                setRowError({ id: loanId, msg })
            }
        } catch {
            setRowError({ id: loanId, msg: "Failed to load loan details. Please try again." })
        } finally {
            setLoadingId(null)
        }
    }

    // ── Update button UI ──────────────────────────────────────────────────────
    const UpdateButton = ({ loanId }: { loanId: string }) => {
        const isLoading = loadingId === loanId
        return (
            <button
                onClick={() => handleUpdate(loanId)}
                disabled={loadingId !== null}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#0A66C2]/30 bg-blue-50 px-3 py-1.5 text-[0.78rem] font-bold text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] hover:shadow-md hover:shadow-blue-500/15 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/30 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading
                    ? <><Loader2 className="h-3 w-3 animate-spin" /> Loading…</>
                    : "Update"
                }
            </button>
        )
    }

    const colHeader = (label: string, key: SortKey) => (
        <button
            onClick={() => handleSort(key)}
            className="group flex items-center gap-1.5 text-[0.72rem] font-bold text-slate-500 uppercase tracking-widest hover:text-slate-800 transition-colors focus:outline-none"
        >
            {label}
            <SortIcon active={sortKey === key} dir={sortDir} />
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

            {/* Global row error banner */}
            {rowError && (
                <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 shadow-sm">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 text-rose-500 mt-0.5" />
                    <p className="text-[0.82rem] font-medium text-rose-700">{rowError.msg}</p>
                    <button
                        onClick={() => setRowError(null)}
                        className="ml-auto text-[0.75rem] font-bold text-rose-400 hover:text-rose-600"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Desktop Table */}
            <div className="hidden md:block overflow-hidden rounded-2xl bg-white border border-slate-200/70 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-slate-100 bg-slate-50/60">
                            <tr>
                                <th className="px-5 py-4">{colHeader("Loan ID", "loanId")}</th>
                                <th className="px-5 py-4">{colHeader("Customer Name", "customerName")}</th>
                                <th className="px-5 py-4">{colHeader("Date", "createdAt")}</th>
                                <th className="px-5 py-4 whitespace-nowrap">Offered Rate</th>
                                <th className="px-5 py-4">{colHeader("Confidence", "confidence")}</th>
                                <th className="px-5 py-4">{colHeader("Status", "status")}</th>
                                <th className="px-5 py-4 whitespace-nowrap text-[0.72rem] font-bold text-slate-500 uppercase tracking-widest">Update Preference</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80">
                            {paged.map(row => (
                                <tr key={row.loanId} className="group transition-colors hover:bg-slate-50/80">
                                    <td className="px-5 py-4 font-mono text-[0.8rem] font-semibold text-slate-500 group-hover:text-[#0A66C2] transition-colors">
                                        {row.loanId}
                                    </td>
                                    <td className="px-5 py-4 font-semibold text-slate-800 whitespace-nowrap">
                                        {row.customerName ?? <span className="text-slate-300">—</span>}
                                    </td>
                                    <td className="px-5 py-4 text-[0.875rem] font-medium text-slate-500">{row.createdAt ?? "—"}</td>
                                    <td className="px-5 py-4 text-[0.875rem] font-bold text-slate-700">
                                        {row.offeredRate ?? <span className="text-slate-300">N/A</span>}
                                    </td>
                                    <td className="px-5 py-4"><ConfidenceBar value={parseConfidence(row.confidence)} /></td>
                                    <td className="px-5 py-4"><StatusBadge status={row.status ?? ""} /></td>
                                    <td className="px-5 py-4">
                                        <UpdateButton loanId={row.loanId} />
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
                    <div key={row.loanId} className="rounded-2xl bg-white border border-slate-200/70 p-4 shadow-sm space-y-3">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="font-mono text-[0.78rem] text-slate-400">{row.loanId}</p>
                                <p className="font-bold text-slate-800 text-[0.95rem] mt-0.5">
                                    {row.customerName ?? <span className="text-slate-400 italic">Unknown</span>}
                                </p>
                            </div>
                            <StatusBadge status={row.status ?? ""} />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[0.82rem]">
                            <div><span className="text-slate-400">Date: </span><span className="font-semibold text-slate-700">{row.createdAt}</span></div>
                            <div><span className="text-slate-400">Rate: </span><span className="font-semibold text-slate-700">{row.offeredRate ?? "N/A"}</span></div>
                        </div>
                        <ConfidenceBar value={parseConfidence(row.confidence)} />
                        <button
                            onClick={() => handleUpdate(row.loanId)}
                            disabled={loadingId !== null}
                            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#0A66C2]/30 bg-blue-50 py-2.5 text-[0.85rem] font-bold text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loadingId === row.loanId
                                ? <><Loader2 className="h-4 w-4 animate-spin" /> Loading…</>
                                : "Update Customer Preference"
                            }
                        </button>
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
