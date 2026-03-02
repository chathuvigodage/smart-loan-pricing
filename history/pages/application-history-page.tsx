"use client"

import React, { useState, useMemo } from "react"
import { SummaryStats } from "@/history/components/summary-stats"
import { FilterBar } from "@/history/components/filter-bar"
import { ApplicationsTable } from "@/history/components/applications-table"
import { mockApplications, AppStatus } from "@/lib/mock-data/applicationHistoryMocks"
import { PageHeader } from "@/shared/components/layout/page-header"

export default function ApplicationHistoryPage() {
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState<AppStatus | "All">("All")

    const filtered = useMemo(() => {
        return mockApplications.filter(r => {
            const matchesSearch = !search ||
                r.customerName.toLowerCase().includes(search.toLowerCase()) ||
                r.applicationId.toLowerCase().includes(search.toLowerCase())
            const matchesStatus = status === "All" || r.status === status
            return matchesSearch && matchesStatus
        })
    }, [search, status])

    const handleExport = () => {
        const headers = ["Application ID", "Customer", "Date", "Offered Rate", "Confidence", "Status", "Profit/Loss", "Loan Amount"]
        const rows = filtered.map(r => [
            r.applicationId, r.customerName, r.date,
            r.offeredRate ?? "N/A", `${r.confidence}%`, r.status,
            r.profitLoss, r.loanAmount
        ])
        const csv = [headers, ...rows].map(r => r.join(",")).join("\n")
        const blob = new Blob([csv], { type: "text/csv" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url; a.download = "application-history.csv"; a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#F8F9FB] font-sans">
            <PageHeader />

            {/* Main */}
            <main className="flex-1 px-4 py-8 sm:px-8 lg:px-12 xl:px-16 max-w-[1300px] mx-auto w-full space-y-7">
                {/* Title */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
                    <h1 className="text-[2rem] font-bold tracking-tight text-slate-900">Application History</h1>
                    <p className="mt-1.5 text-[0.9rem] font-medium text-slate-500">
                        Review and analyze historical loan application decisions.
                    </p>
                </div>

                {/* Stats */}
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-75 fill-mode-both">
                    <SummaryStats />
                </div>

                {/* Table Container */}
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
                    <FilterBar
                        search={search}
                        onSearch={v => setSearch(v)}
                        status={status}
                        onStatus={setStatus}
                        onExport={handleExport}
                    />
                    <ApplicationsTable data={filtered} />
                </div>
            </main>

            <footer className="border-t border-slate-200/60 py-4 text-center text-[0.78rem] font-medium text-slate-400">
                &copy; {new Date().getFullYear()} HyperLoan Inc. All rights reserved.
            </footer>
        </div>
    )
}
