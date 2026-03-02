import React from "react"
import { cn } from "@/lib/utils"
import { User, FileText, DollarSign, Percent, Calendar, CreditCard } from "lucide-react"

interface InfoRow {
    label: string
    value: string
    icon?: React.ReactNode
}

interface OfferDetailsSectionProps {
    customerRows: InfoRow[]
    loanRows: InfoRow[]
}

function DataRow({ label, value }: InfoRow) {
    return (
        <div className="flex items-center justify-between py-3.5 border-b border-slate-100 last:border-0">
            <span className="text-[0.875rem] font-medium text-slate-500">{label}</span>
            <span className="text-[0.925rem] font-bold text-slate-800">{value}</span>
        </div>
    )
}

export function OfferDetailsSection({ customerRows, loanRows }: OfferDetailsSectionProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Customer Information */}
            <div className="rounded-2xl bg-white border border-slate-200/70 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[#0A66C2] ring-4 ring-blue-50">
                        <User className="h-4 w-4" />
                    </div>
                    <h3 className="text-[0.9rem] font-bold text-slate-800">Customer Information</h3>
                </div>
                <div className="px-6 py-1">
                    {customerRows.map(r => <DataRow key={r.label} {...r} />)}
                </div>
            </div>

            {/* Loan Offer Details */}
            <div className="rounded-2xl bg-white border border-slate-200/70 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-50 text-violet-600 ring-4 ring-violet-50">
                        <FileText className="h-4 w-4" />
                    </div>
                    <h3 className="text-[0.9rem] font-bold text-slate-800">Loan Offer Details</h3>
                </div>
                <div className="px-6 py-1">
                    {loanRows.map(r => <DataRow key={r.label} {...r} />)}
                </div>
            </div>
        </div>
    )
}
