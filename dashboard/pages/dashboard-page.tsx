"use client"

import React, { useState, useEffect } from "react"
import { StatCard } from "@/dashboard/components/stat-card"
import { ApprovalChart } from "@/dashboard/components/approval-chart"
import { ActivityTable } from "@/dashboard/components/activity-table"
import { PricingInsights } from "@/dashboard/components/pricing-insights"
import { SkeletonStatCard, SkeletonChart, SkeletonTable } from "@/dashboard/components/skeletons"
import { EmptyState, ErrorState } from "@/dashboard/components/ux-states"
import { Button } from "@/shared/components/ui/button"
import { ArrowRight, FileText, Download } from "lucide-react"

export default function DashboardPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    // Simulate network fetch for the dashboard data
    useEffect(() => {
        const timer = setTimeout(() => {
            // 10% chance to simulate a network error for demonstration purposes
            if (Math.random() < 0) { // Disabled random error, but functionality exists
                setHasError(true)
            }
            setIsLoading(false)
        }, 1500) // 1.5 second simulated load
        return () => clearTimeout(timer)
    }, [])

    const retryFetch = () => {
        setIsLoading(true)
        setHasError(false)
        setTimeout(() => setIsLoading(false), 1200)
    }

    return (
        <div className="flex flex-col space-y-9 pb-16">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between space-y-5 md:space-y-0 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both">
                <div>
                    <h1 className="text-[2.25rem] font-bold tracking-tight text-slate-900 leading-tight">
                        Welcome back, <span className="text-[#0A66C2]">John!</span>
                    </h1>
                    <p className="text-[1.05rem] font-medium text-slate-500 mt-1.5">
                        Here's a summary of your loan application activity.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3.5">
                    <Button variant="outline" className="h-11 px-4 text-[0.925rem] bg-white hover:bg-slate-50 text-slate-700 border-slate-200/80 shadow-sm font-bold transition-all hover:shadow hidden sm:flex">
                        <Download className="mr-2 h-4 w-4 text-slate-400" />
                        Export Report
                    </Button>
                    <Button className="h-11 px-5 text-[0.925rem] shadow-lg shadow-blue-500/20 group w-full sm:w-auto">
                        New Application
                        <ArrowRight className="ml-2 h-4 w-4 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300" />
                    </Button>
                </div>
            </div>

            {/* Conditional Rendering based on fetch states */}
            {hasError ? (
                <div className="py-12">
                    <ErrorState error="Unable to connect to HyperLoan Analytics Engine. Please check your network connection." />
                    <div className="mt-4"><Button onClick={retryFetch}>Retry Connection</Button></div>
                </div>
            ) : (
                <>
                    {/* Analytics Overview Section */}
                    <div className="flex flex-col space-y-5">
                        <h2 className="text-[1.35rem] font-bold tracking-tight text-slate-800">Analytics Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {isLoading ? (
                                <>
                                    <SkeletonStatCard />
                                    <SkeletonStatCard />
                                    <SkeletonStatCard />
                                    <SkeletonStatCard />
                                </>
                            ) : (
                                <>
                                    <StatCard title="Total Applications" value="1,254" />
                                    <StatCard title="Approved Loans" value="832" />
                                    <StatCard title="Average Value" value="$125,500" />
                                    <StatCard title="Default Risk Avg" value="B+" />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Middle Section: Chart and Text Insights */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
                        <div className="xl:col-span-2">
                            {isLoading ? <SkeletonChart /> : <ApprovalChart />}
                        </div>
                        <div className="xl:col-span-1 pt-8 xl:pt-0">
                            {isLoading ? (
                                <div className="space-y-4 pt-10 px-4">
                                    <div className="flex animate-pulse space-x-4"><div className="h-12 w-12 rounded-full bg-slate-200"></div><div className="space-y-2 py-1 flex-1"><div className="h-4 bg-slate-200 rounded w-3/4"></div><div className="h-4 bg-slate-200 rounded w-5/6"></div></div></div>
                                    <div className="flex animate-pulse space-x-4 mt-8"><div className="h-12 w-12 rounded-full bg-slate-200"></div><div className="space-y-2 py-1 flex-1"><div className="h-4 bg-slate-200 rounded w-3/4"></div><div className="h-4 bg-slate-200 rounded w-5/6"></div></div></div>
                                </div>
                            ) : <PricingInsights />}
                        </div>
                    </div>

                    {/* Table Section */}
                    {isLoading ? <SkeletonTable /> : <ActivityTable />}
                </>
            )}

        </div>
    )
}
