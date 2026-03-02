import React from "react"
import { FileSearch, AlertCircle } from "lucide-react"
import { Button } from "@/shared/components/ui/button"

export function EmptyState({
    title = "No data found",
    description = "Get started by creating a new entry.",
    actionLabel = "Create",
    onAction
}: {
    title?: string,
    description?: string,
    actionLabel?: string,
    onAction?: () => void
}) {
    return (
        <div className="flex flex-col items-center justify-center p-12 mt-6 rounded-[1.25rem] border border-dashed border-slate-300 bg-slate-50/50 text-center animate-in fade-in duration-500">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4 shadow-sm ring-4 ring-white">
                <FileSearch className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            <p className="text-[0.9rem] text-slate-500 mt-1.5 mb-6 max-w-sm">{description}</p>
            {onAction && (
                <Button onClick={onAction} className="shadow-sm">{actionLabel}</Button>
            )}
        </div>
    )
}

export function ErrorState({ error = "An unexpected error occurred while fetching data." }: { error?: string }) {
    return (
        <div className="flex flex-col items-start justify-center p-6 mt-6 rounded-[1.25rem] border border-red-200 bg-red-50 text-left animate-in fade-in duration-500">
            <div className="flex items-center space-x-3 mb-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <h3 className="text-md font-bold text-red-800">Connection Failed</h3>
            </div>
            <p className="text-[0.875rem] text-red-600/90 ml-8">{error}</p>
            <button className="text-[0.85rem] font-bold text-red-700 hover:text-red-800 hover:underline mt-4 ml-8 transition-all">Try again</button>
        </div>
    )
}
