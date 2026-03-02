"use client"

import React, { useState } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed)
    }

    return (
        <div className="flex min-h-screen bg-[#F8F9FB] font-sans text-slate-900 selection:bg-[#0A66C2]/20 selection:text-[#0A66C2]">
            {/* Sidebar gets the shared state */}
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                className="shadow-2xl shadow-slate-900/10 z-20 flex-shrink-0"
            />

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col min-w-0">
                <Header
                    toggleSidebar={toggleSidebar}
                    isSidebarCollapsed={isSidebarCollapsed}
                />

                <main className="flex-1 overflow-y-auto w-full p-6 lg:p-8 xl:p-10 mx-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
