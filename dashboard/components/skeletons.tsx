import React from "react"
import { cn } from "@/lib/utils"

export function SkeletonStatCard() {
    return (
        <div className="flex flex-col justify-center rounded-[1.25rem] bg-white border border-slate-100 p-7 shadow-sm animate-pulse">
            <div className="h-4 w-24 rounded-md bg-slate-200 mb-4" />
            <div className="h-10 w-32 rounded-lg bg-slate-200" />
        </div>
    )
}

export function SkeletonChart() {
    return (
        <div className="mt-8 flex flex-col space-y-5 animate-pulse">
            <div className="h-6 w-64 rounded-md bg-slate-200" />
            <div className="relative h-64 w-full rounded-[1.25rem] bg-slate-200" />
        </div>
    )
}

export function SkeletonTable() {
    return (
        <div className="mt-10 flex flex-col space-y-5 animate-pulse">
            <div className="h-7 w-40 rounded-md bg-slate-200" />
            <div className="rounded-[1.25rem] overflow-hidden border border-slate-100 bg-white">
                <div className="h-12 w-full bg-slate-100 border-b border-slate-200/50" />
                <div className="divide-y divide-slate-100 px-6">
                    <div className="flex h-16 items-center space-x-4"><div className="h-4 flex-1 bg-slate-200 rounded" /><div className="h-6 w-20 bg-slate-200 rounded-full" /><div className="h-4 flex-1 bg-slate-200 rounded" /><div className="h-4 flex-1 bg-slate-200 rounded" /></div>
                    <div className="flex h-16 items-center space-x-4"><div className="h-4 flex-1 bg-slate-200 rounded" /><div className="h-6 w-20 bg-slate-200 rounded-full" /><div className="h-4 flex-1 bg-slate-200 rounded" /><div className="h-4 flex-1 bg-slate-200 rounded" /></div>
                    <div className="flex h-16 items-center space-x-4"><div className="h-4 flex-1 bg-slate-200 rounded" /><div className="h-6 w-20 bg-slate-200 rounded-full" /><div className="h-4 flex-1 bg-slate-200 rounded" /><div className="h-4 flex-1 bg-slate-200 rounded" /></div>
                </div>
            </div>
        </div>
    )
}
