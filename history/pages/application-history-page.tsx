"use client"

import React, { useState, useEffect, useMemo } from "react"
import { SummaryStats } from "@/history/components/summary-stats"
import { FilterBar } from "@/history/components/filter-bar"
import { ApplicationsTable } from "@/history/components/applications-table"
import { LoanHistoryResponse, LoanListResponse } from "@/lib/mock-data/applicationHistoryMocks"
import { PageHeader } from "@/shared/components/layout/page-header"
import { Loader2, AlertCircle } from "lucide-react"
import { API_BASE } from "@/lib/api"

type AppStatus = "All" | string

export default function ApplicationHistoryPage() {
    const [data, setData] = useState<LoanHistoryResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [search, setSearch] = useState("")
    const [status, setStatus] = useState<AppStatus>("All")

    // ── Fetch history on mount ───────────────────────────────────────────────
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem("token")
                const res = await fetch(`${API_BASE}/loan/history`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!res.ok) {
                    let msg = "Failed to load application history. Please try again."
                    try {
                        const body = await res.json()
                        if (body?.message) msg = body.message
                        else if (body?.error) msg = body.error
                    } catch { /* ignore parse errors */ }
                    throw new Error(msg)
                }

                const json = await res.json()
                // The backend wraps the payload: { data: { loanListResponse, ... }, message, title }
                const payload: LoanHistoryResponse = json?.data ?? json
                setData(payload)
            } catch (err: unknown) {
                const message =
                    err instanceof Error
                        ? err.message
                        : "Failed to load application history. Please try again."
                setError(message)
            } finally {
                setLoading(false)
            }
        }

        fetchHistory()
    }, [])

    // ── Client-side filter ───────────────────────────────────────────────────
    const filtered = useMemo<LoanListResponse[]>(() => {
        const list = data?.loanListResponse ?? []
        return list.filter(r => {
            const matchesSearch =
                !search ||
                (r.customerName ?? "").toLowerCase().includes(search.toLowerCase()) ||
                (r.loanId ?? "").toLowerCase().includes(search.toLowerCase())
            const matchesStatus =
                status === "All" || (r.status ?? "").toLowerCase() === status.toLowerCase()
            return matchesSearch && matchesStatus
        })
    }, [data, search, status])

    // ── CSV export ───────────────────────────────────────────────────────────
    const handleExport = () => {
        const headers = ["Loan ID", "Customer Name", "Date", "Offered Rate", "Confidence", "Status"]
        const rows = filtered.map(r => [
            r.loanId,
            r.customerName,
            r.createdAt,
            r.offeredRate || "N/A",
            r.confidence,
            r.status,
        ])
        const csv = [headers, ...rows].map(r => r.join(",")).join("\n")
        const blob = new Blob([csv], { type: "text/csv" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "application-history.csv"
        a.click()
        URL.revokeObjectURL(url)
    }

    // ── Render ───────────────────────────────────────────────────────────────
    return (
        <div className="flex min-h-screen flex-col bg-[#F8F9FB] font-sans">
            <PageHeader />

            <main className="flex-1 px-4 py-8 sm:px-8 lg:px-12 xl:px-16 max-w-[1300px] mx-auto w-full space-y-7">
                {/* Title */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
                    <h1 className="text-[2rem] font-bold tracking-tight text-slate-900">Application History</h1>
                    <p className="mt-1.5 text-[0.9rem] font-medium text-slate-500">
                        Review and analyze historical loan application decisions.
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <Loader2 className="h-9 w-9 animate-spin text-[#0A66C2]" />
                        <p className="text-[0.9rem] font-medium text-slate-500">Loading application history…</p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 shadow-sm">
                        <AlertCircle className="h-5 w-5 flex-shrink-0 text-rose-500 mt-0.5" />
                        <div>
                            <p className="text-[0.875rem] font-bold text-rose-700">Unable to load history</p>
                            <p className="text-[0.82rem] font-medium text-rose-600 mt-0.5">{error}</p>
                        </div>
                    </div>
                )}

                {/* Success */}
                {!loading && !error && data && (
                    <>
                        {/* Stats */}
                        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-75 fill-mode-both">
                            <SummaryStats
                                noOfApplications={data.noOfApplications}
                                avgAcceptance={data.avgAcceptance}
                                avgRejection={data.avgRejection}
                            />
                        </div>

                        {/* Table Container */}
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
                            <FilterBar
                                search={search}
                                onSearch={v => setSearch(v)}
                                status={status}
                                onStatus={setStatus}
                            />
                            <ApplicationsTable data={filtered} />
                        </div>
                    </>
                )}
            </main>

            <footer className="border-t border-slate-200/60 py-4 text-center text-[0.78rem] font-medium text-slate-400">
                &copy; {new Date().getFullYear()} HyperLoan Inc. All rights reserved.
            </footer>
        </div>
    )
}
