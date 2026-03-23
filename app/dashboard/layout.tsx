"use client"

import React, { useState, useEffect } from "react"
import { DashboardLayout } from "@/dashboard/layout/dashboard-layout"
import { ProfileData } from "@/dashboard/layout/sidebar"
import { API_BASE } from "@/lib/api"

export default function Layout({ children }: { children: React.ReactNode }) {
    const [profile, setProfile] = useState<ProfileData | null>(null)

    useEffect(() => {
        const load = async () => {
            try {
                const token = localStorage.getItem("token")
                const res = await fetch(`${API_BASE}/user/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                const json = await res.json()
                if (json?.code === "200" || json?.title?.toLowerCase() === "success") {
                    const d = json.data ?? json
                    setProfile({ username: d.username ?? "", email: d.email ?? "", role: d.role ?? "" })
                }
            } catch { /* profile unavailable — sidebar shows defaults */ }
        }
        load()
    }, [])

    return <DashboardLayout profile={profile}>{children}</DashboardLayout>
}
