import React from "react"
import { cn } from "@/lib/utils"

const activityData = [
    { id: "#ALP-84321", status: "Approved", amount: "$250,000", date: "2024-07-21" },
    { id: "#ALP-84320", status: "Pending", amount: "$75,000", date: "2024-07-20" },
    { id: "#ALP-84319", status: "Approved", amount: "$500,000", date: "2024-07-19" },
    { id: "#ALP-84318", status: "Rejected", amount: "$150,000", date: "2024-07-18" },
    { id: "#ALP-84317", status: "Approved", amount: "$95,000", date: "2024-07-17" },
]

export function ActivityTable() {
    return (
        <div className="mt-10 flex flex-col space-y-5 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 fill-mode-both">
            <h3 className="text-[1.35rem] font-bold tracking-tight text-slate-800">Recent Activity</h3>

            <div className="overflow-hidden rounded-[1.25rem] bg-white shadow-sm ring-1 ring-slate-200/70">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-[0.925rem] whitespace-nowrap mb-2">
                        <thead className="border-b border-slate-100 bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-600/90 w-1/4">Applicant ID</th>
                                <th className="px-6 py-4 font-semibold text-slate-600/90 w-1/4">Status</th>
                                <th className="px-6 py-4 font-semibold text-slate-600/90 w-1/4">Amount</th>
                                <th className="px-6 py-4 font-semibold text-slate-600/90 w-1/4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80">
                            {activityData.map((item, idx) => (
                                <tr key={idx} className="transition-colors hover:bg-slate-50/80 group">
                                    <td className="px-6 py-4 font-medium text-slate-500 group-hover:text-[#0A66C2] transition-colors cursor-pointer">
                                        {item.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={cn(
                                                "inline-flex items-center rounded-md px-2.5 py-1 text-[0.75rem] font-bold uppercase tracking-wider",
                                                item.status === "Approved" && "bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-500/20",
                                                item.status === "Pending" && "bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-500/20",
                                                item.status === "Rejected" && "bg-rose-50 text-rose-600 ring-1 ring-inset ring-rose-500/20"
                                            )}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-800">
                                        {item.amount}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-500/80">
                                        {item.date}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
