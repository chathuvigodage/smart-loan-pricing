import Link from "next/link"
import React from "react"
import { Component, LayoutDashboard, PlusCircle, History, Settings, Shield, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
    className?: string
    isCollapsed: boolean
}

export function Sidebar({ className, isCollapsed }: SidebarProps) {
    return (
        <aside
            className={cn(
                "hidden flex-col bg-[#111827] text-slate-300 md:flex transition-all duration-300 ease-in-out border-r border-[#1e293b] relative",
                isCollapsed ? "w-[90px]" : "w-[280px]",
                className
            )}
        >
            {/* Brand Header */}
            <div className={cn(
                "flex items-center py-8 transition-all duration-300 ease-in-out",
                isCollapsed ? "justify-center px-0" : "px-6 space-x-3"
            )}>
                <div className="flex flex-shrink-0 h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-white to-slate-200 shadow-md">
                    <Component className="h-5 w-5 text-[#111827]" strokeWidth={2.5} />
                </div>
                {!isCollapsed && (
                    <span className="text-[1.35rem] font-bold tracking-tight text-white animate-in fade-in duration-300 whitespace-nowrap">
                        HyperLoan
                    </span>
                )}
            </div>

            {/* Main Navigation */}
            <div className="flex-1 px-4 py-4 overflow-hidden">
                <nav className="space-y-1.5 flex flex-col items-center sm:items-stretch">

                    <Link
                        href="/dashboard"
                        title={isCollapsed ? "Dashboard" : undefined}
                        className={cn(
                            "group flex items-center rounded-xl transition-all relative overflow-hidden",
                            isCollapsed ? "justify-center p-3 hover:bg-white/10" : "space-x-3 px-4 py-3.5 bg-white/10 hover:bg-white/15"
                        )}
                    >
                        <div className={cn(
                            "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-blue-500 rounded-r-md transition-opacity duration-300",
                            isCollapsed ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                        )} />
                        <LayoutDashboard className={cn(
                            "h-[1.15rem] w-[1.15rem] flex-shrink-0",
                            !isCollapsed && "text-blue-400",
                            isCollapsed && "text-slate-400 group-hover:text-white"
                        )} />
                        {!isCollapsed && <span className="text-sm font-semibold text-white whitespace-nowrap">Dashboard</span>}
                    </Link>

                    <Link
                        href="/new-application"
                        title={isCollapsed ? "New Application" : undefined}
                        className={cn(
                            "group flex items-center rounded-xl transition-all text-slate-400 hover:bg-white/5 hover:text-white",
                            isCollapsed ? "justify-center p-3" : "space-x-3 px-4 py-3.5"
                        )}
                    >
                        <PlusCircle className="h-[1.15rem] w-[1.15rem] flex-shrink-0 transition-colors" />
                        {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">New Application</span>}
                    </Link>

                    <Link
                        href="/application-history"
                        title={isCollapsed ? "Application History" : undefined}
                        className={cn(
                            "group flex items-center rounded-xl transition-all text-slate-400 hover:bg-white/5 hover:text-white",
                            isCollapsed ? "justify-center p-3" : "space-x-3 px-4 py-3.5"
                        )}
                    >
                        <History className="h-[1.15rem] w-[1.15rem] flex-shrink-0 transition-colors" />
                        {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">Application History</span>}
                    </Link>
                </nav>
            </div>

            {/* Bottom Area */}
            <div className="p-4 space-y-4 overflow-hidden">
                <Link
                    href="#"
                    title={isCollapsed ? "Settings" : undefined}
                    className={cn(
                        "group flex items-center rounded-xl transition-all text-slate-400 hover:bg-white/5 hover:text-white mx-auto",
                        isCollapsed ? "justify-center p-3" : "space-x-3 px-4 py-3.5"
                    )}
                >
                    <Settings className="h-[1.15rem] w-[1.15rem] flex-shrink-0 transition-colors" />
                    {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">Settings</span>}
                </Link>

                {/* User Profile */}
                <div className={cn(
                    "mt-2 flex items-center border-t border-white/10 pt-6 pb-2 transition-all duration-300",
                    isCollapsed ? "justify-center px-0 flex-col space-y-2" : "space-x-3 px-4"
                )}>
                    <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white/10 group-hover:ring-white/20 transition-all cursor-pointer hover:ring-blue-400/50">
                        <img src="https://i.pravatar.cc/150?u=a04258" alt="User Avatar" className="h-full w-full object-cover" />
                    </div>
                    {!isCollapsed && (
                        <div className="flex flex-col cursor-pointer overflow-hidden animate-in fade-in duration-300">
                            <span className="text-sm font-bold text-white transition-colors hover:text-blue-400 truncate">John Doe</span>
                            <span className="text-[0.7rem] font-medium text-blue-400/80 uppercase tracking-wider mt-0.5 whitespace-nowrap">Loan Officer</span>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    )
}
