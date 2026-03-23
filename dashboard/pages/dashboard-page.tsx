"use client"

import React, { useState, useEffect } from "react"
import { StatCard } from "@/dashboard/components/stat-card"
import { ApprovalChart } from "@/dashboard/components/approval-chart"
import { ActivityTable, RecentApplication } from "@/dashboard/components/activity-table"
import { PricingInsights } from "@/dashboard/components/pricing-insights"
import { SkeletonStatCard, SkeletonChart, SkeletonTable } from "@/dashboard/components/skeletons"
import { Button } from "@/shared/components/ui/button"
import { Download, AlertCircle } from "lucide-react"
import { API_BASE } from "@/lib/api"

// ── Types ────────────────────────────────────────────────────────────────────
interface DashboardData {
    noOfApplications: number
    approvedApplications: number
    rejectedApplications: number
    totalLoanAmount: number
    recentApplications: RecentApplication[]
}

function formatCurrency(n: number): string {
    return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
    const [username, setUsername] = useState<string | null>(null)
    const [dashData, setDashData] = useState<DashboardData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [dashError, setDashError] = useState<string | null>(null)
    const [isExporting, setIsExporting] = useState(false)
    const [exportError, setExportError] = useState<string | null>(null)

    const loadDashboard = async () => {
        setIsLoading(true)
        setDashError(null)
        try {
            const token = localStorage.getItem("token")
            const res = await fetch(`${API_BASE}/user/dashboard`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            const json = await res.json()
            if (json?.code === "200" || json?.title?.toLowerCase() === "success") {
                const d = json.data ?? json
                setDashData({
                    noOfApplications:     d.noOfApplications     ?? 0,
                    approvedApplications: d.approvedApplications ?? 0,
                    rejectedApplications: d.rejectedApplications ?? 0,
                    totalLoanAmount:      d.totalLoanAmount       ?? 0,
                    recentApplications:   Array.isArray(d.recentApplications) ? d.recentApplications : [],
                })
            } else {
                setDashError(json?.message ?? "Failed to load dashboard details. Please try again.")
            }
        } catch {
            setDashError("Failed to load dashboard details. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleExport = async () => {
        setIsExporting(true)
        setExportError(null)
        try {
            const token = localStorage.getItem("token")
            const res = await fetch(`${API_BASE}/user/dashboard/export`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            })

            if (!res.ok) {
                // Try to parse a JSON error message
                let msg = "Failed to export dashboard report. Please try again."
                try { const j = await res.json(); msg = j?.message ?? msg } catch { /* ignore */ }
                setExportError(msg)
                return
            }

            // Detect file download by content-type or content-disposition
            const contentType = res.headers.get("content-type") ?? ""
            const disposition = res.headers.get("content-disposition") ?? ""

            const blob = await res.blob()

            // Derive a filename from the header or fall back
            let filename = "dashboard-report"
            const match = disposition.match(/filename[^;=\n]*=(['"]?)(.+)\1/)
            if (match?.[2]) {
                filename = match[2].trim()
            } else if (contentType.includes("pdf")) {
                filename += ".pdf"
            } else if (contentType.includes("csv") || contentType.includes("text/plain")) {
                filename += ".csv"
            } else if (contentType.includes("spreadsheet") || contentType.includes("excel")) {
                filename += ".xlsx"
            }

            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = filename
            document.body.appendChild(a)
            a.click()
            a.remove()
            URL.revokeObjectURL(url)
        } catch {
            setExportError("Failed to export dashboard report. Please try again.")
        } finally {
            setIsExporting(false)
        }
    }

    useEffect(() => {
        setUsername(localStorage.getItem("username"))
        loadDashboard()
    }, [])

    return (
        <div className="flex flex-col space-y-8 pb-16">

            {/* ── Header ─────────────────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both">
                <div>
                    <h1 className="text-[2.25rem] font-bold tracking-tight text-slate-900 leading-tight">
                        Welcome back{username
                            ? <>, <span className="text-[#0A66C2]">{username}!</span></>
                            : "!"}
                    </h1>
                    <p className="text-[1.05rem] font-medium text-slate-500 mt-1.5">
                        Here's a summary of your loan application activity.
                    </p>
                </div>

                {/* Export button */}
                <div className="self-end md:self-start md:mt-2 flex-shrink-0">
                    <Button
                        variant="outline"
                        onClick={handleExport}
                        disabled={isExporting}
                        className="h-11 px-5 text-[0.925rem] bg-white hover:bg-slate-50 text-slate-700 border-slate-200/80 shadow-sm font-bold transition-all hover:shadow disabled:opacity-60"
                    >
                        {isExporting
                            ? <><svg className="mr-2 h-4 w-4 animate-spin text-slate-400" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Exporting…</>
                            : <><Download className="mr-2 h-4 w-4 text-slate-400" />Export Report</>}
                    </Button>
                </div>
            </div>

            {/* ── Dashboard error banner ─────────────────────────────────── */}
            {dashError && (
                <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 shadow-sm">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 text-rose-500 mt-0.5" />
                    <p className="flex-1 text-[0.82rem] font-medium text-rose-700">{dashError}</p>
                    <button
                        onClick={loadDashboard}
                        className="text-[0.75rem] font-bold text-rose-500 hover:text-rose-700 whitespace-nowrap"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* ── Export error banner ────────────────────────────────────── */}
            {exportError && (
                <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 shadow-sm">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 text-amber-500 mt-0.5" />
                    <p className="flex-1 text-[0.82rem] font-medium text-amber-700">{exportError}</p>
                    <button onClick={() => setExportError(null)} className="text-[0.75rem] font-bold text-amber-500 hover:text-amber-700">✕</button>
                </div>
            )}


            {/* ── Analytics Overview ─────────────────────────────────────── */}
            <div className="flex flex-col space-y-5">
                <h2 className="text-[1.35rem] font-bold tracking-tight text-slate-800">Analytics Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {isLoading ? (
                        <>
                            <SkeletonStatCard /><SkeletonStatCard />
                            <SkeletonStatCard /><SkeletonStatCard />
                        </>
                    ) : dashData ? (
                        <>
                            <StatCard title="Total Applications"  value={dashData.noOfApplications} />
                            <StatCard title="Approved Loans"      value={dashData.approvedApplications} />
                            <StatCard title="Rejected Loans"      value={dashData.rejectedApplications} />
                            <StatCard title="Total Loan Amount"   value={formatCurrency(dashData.totalLoanAmount)} />
                        </>
                    ) : null}
                </div>
            </div>

            {/* ── Chart + Insights ────────────────────────────────────────── */}
            {!dashError && (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
                    <div className="xl:col-span-2">
                        {isLoading ? <SkeletonChart /> : <ApprovalChart />}
                    </div>
                    <div className="xl:col-span-1 pt-8 xl:pt-0">
                        {isLoading ? (
                            <div className="space-y-4 pt-10 px-4">
                                <div className="flex animate-pulse space-x-4">
                                    <div className="h-12 w-12 rounded-full bg-slate-200" />
                                    <div className="space-y-2 py-1 flex-1"><div className="h-4 bg-slate-200 rounded w-3/4" /><div className="h-4 bg-slate-200 rounded w-5/6" /></div>
                                </div>
                                <div className="flex animate-pulse space-x-4 mt-8">
                                    <div className="h-12 w-12 rounded-full bg-slate-200" />
                                    <div className="space-y-2 py-1 flex-1"><div className="h-4 bg-slate-200 rounded w-3/4" /><div className="h-4 bg-slate-200 rounded w-5/6" /></div>
                                </div>
                            </div>
                        ) : <PricingInsights />}
                    </div>
                </div>
            )}

            {/* ── Recent Activity Table ────────────────────────────────────── */}
            {isLoading
                ? <div className="mt-4"><SkeletonTable /></div>
                : dashData && <ActivityTable data={dashData.recentApplications} />
            }
        </div>
    )
}
