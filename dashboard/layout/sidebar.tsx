"use client"

import Link from "next/link"
import React from "react"
import { Component, LayoutDashboard, PlusCircle, History, Settings, X, Mail, User, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ProfileData {
    username: string
    email: string
    role: string
}

interface SidebarProps {
    className?: string
    isCollapsed: boolean
    profile: ProfileData | null
}

export function Sidebar({ className, isCollapsed, profile }: SidebarProps) {
    const [showProfile, setShowProfile] = React.useState(false)

    const displayName = profile?.username ?? "User"
    const displayRole = profile?.role ?? "Loan Officer"

    return (
        <>
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

                    {/* User Profile — click to open panel */}
                    <button
                        onClick={() => setShowProfile(true)}
                        className={cn(
                            "w-full mt-2 flex items-center border-t border-white/10 pt-6 pb-2 transition-all duration-300 text-left hover:opacity-80",
                            isCollapsed ? "justify-center px-0 flex-col space-y-2" : "space-x-3 px-4"
                        )}
                    >
                        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white/10 hover:ring-blue-400/50 transition-all">
                            <img src="https://i.pravatar.cc/150?u=a04258" alt="User Avatar" className="h-full w-full object-cover" />
                        </div>
                        {!isCollapsed && (
                            <div className="flex flex-col overflow-hidden animate-in fade-in duration-300">
                                <span className="text-sm font-bold text-white hover:text-blue-400 truncate transition-colors">{displayName}</span>
                                <span className="text-[0.7rem] font-medium text-blue-400/80 uppercase tracking-wider mt-0.5 whitespace-nowrap">{displayRole}</span>
                            </div>
                        )}
                    </button>
                </div>
            </aside>

            {/* Profile Modal */}
            {showProfile && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setShowProfile(false)}
                    />

                    {/* Panel */}
                    <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white shadow-2xl border border-slate-200/70 animate-in fade-in zoom-in-95 duration-300">
                        {/* Header gradient band */}
                        <div className="h-24 bg-gradient-to-br from-[#0A66C2] to-[#004182] relative rounded-t-2xl overflow-hidden">
                            <button
                                onClick={() => setShowProfile(false)}
                                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Avatar — overlaps gradient/white boundary */}
                        <div className="flex justify-center -mt-12 mb-3 px-6 relative z-10">
                            <div className="h-24 w-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100">
                                <img src="https://i.pravatar.cc/150?u=a04258" alt="Profile" className="h-full w-full object-cover" />
                            </div>
                        </div>

                        {/* Name & Role */}
                        <div className="text-center px-6 pb-1">
                            <p className="text-[1.15rem] font-bold text-slate-900">{profile?.username ?? "—"}</p>
                            <span className="inline-flex items-center mt-1.5 rounded-full bg-blue-50 px-3 py-0.5 text-[0.72rem] font-bold text-[#0A66C2] uppercase tracking-wider ring-1 ring-inset ring-blue-500/20">
                                {profile?.role ?? "—"}
                            </span>
                        </div>

                        {/* Details */}
                        <div className="px-6 py-5 space-y-3 mt-2">
                            {[
                                { Icon: User,   label: "Username", value: profile?.username },
                                { Icon: Mail,   label: "Email",    value: profile?.email    },
                                { Icon: Shield, label: "Role",     value: profile?.role     },
                            ].map(({ Icon, label, value }) => (
                                <div key={label} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3">
                                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0A66C2]">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[0.72rem] font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
                                        <p className="text-[0.875rem] font-bold text-slate-800 truncate">{value ?? "—"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Close button */}
                        <div className="px-6 pb-6">
                            <button
                                onClick={() => setShowProfile(false)}
                                className="w-full rounded-xl bg-[#0A66C2] py-2.5 text-[0.875rem] font-bold text-white hover:bg-[#004182] transition-all shadow-md shadow-blue-500/20"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
