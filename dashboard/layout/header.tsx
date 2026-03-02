"use client"

import React, { useState, useRef, useEffect } from "react"
import { Search, Bell, Menu, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeaderProps {
    toggleSidebar: () => void
    isSidebarCollapsed: boolean
}

export function Header({ toggleSidebar, isSidebarCollapsed }: HeaderProps) {
    const [isNotifOpen, setIsNotifOpen] = useState(false)
    const notifRef = useRef<HTMLDivElement>(null)

    // Clicking outside the notification popover closes it
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setIsNotifOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <header className="sticky top-0 z-30 flex h-[80px] items-center justify-between border-b border-slate-200/60 bg-white/80 backdrop-blur-md px-4 sm:px-8">

            {/* Left side: Hamburger and Search */}
            <div className="flex items-center space-x-4 flex-1">
                <button
                    onClick={toggleSidebar}
                    className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    aria-label="Toggle sidebar"
                >
                    <Menu className="h-5 w-5" />
                </button>

                <div className="hidden sm:flex w-full max-w-[420px] items-center space-x-3 rounded-[0.85rem] bg-slate-100/80 px-4 py-2.5 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0A66C2]/30 focus-within:shadow-sm">
                    <Search className="h-[1.15rem] w-[1.15rem] text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search for applications, users..."
                        className="flex-1 bg-transparent text-[0.925rem] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none w-full"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4 sm:space-x-6 relative">
                <div ref={notifRef}>
                    <button
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                        className={cn(
                            "relative flex h-10 w-10 items-center justify-center text-slate-400 transition-colors focus:outline-none rounded-full",
                            isNotifOpen ? "bg-slate-100 text-slate-800" : "hover:text-slate-700 hover:bg-slate-100"
                        )}
                    >
                        <Bell className="h-5 w-5" strokeWidth={2} />
                        {/* Notification Dot */}
                        <span className="absolute top-2.5 right-2.5 h-[7px] w-[7px] rounded-full bg-red-500 ring-[1.5px] ring-white"></span>
                    </button>

                    {/* Notification Popover */}
                    {isNotifOpen && (
                        <div className="absolute right-12 top-14 mt-2 w-80 rounded-[1.25rem] bg-white border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] origin-top-right animate-in fade-in zoom-in-95 duration-200 z-50">
                            <div className="p-4 border-b border-slate-100 bg-slate-50/50 rounded-t-[1.25rem] flex items-center justify-between">
                                <h4 className="font-semibold text-slate-800 text-sm">Notifications</h4>
                                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">2 New</span>
                            </div>
                            <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
                                {/* Item 1 */}
                                <div className="flex gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 border border-emerald-200">
                                        <Check className="h-4 w-4 text-emerald-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">Loan #ALP-84321 was successfully approved.</p>
                                        <p className="text-[0.75rem] text-slate-500 mt-1">2 hours ago</p>
                                    </div>
                                </div>
                                {/* Item 2 */}
                                <div className="flex gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 border border-blue-200">
                                        <Bell className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">System maintenance scheduled for weekend.</p>
                                        <p className="text-[0.75rem] text-slate-500 mt-1">5 hours ago</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 border-t border-slate-100 text-center">
                                <button className="text-[0.8rem] font-semibold text-slate-500 hover:text-blue-600 transition-colors">Mark all as read</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Avatar Custom Abstract */}
                <button className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-orange-200/50 bg-gradient-to-br from-orange-100 to-orange-200 shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)] focus:outline-none ring-2 ring-transparent focus:ring-orange-200 transition-all hover:scale-105">
                    <div className="h-[45%] w-[35%] rounded-t-full bg-orange-300/80 mt-[35%]" />
                </button>
            </div>
        </header>
    )
}
