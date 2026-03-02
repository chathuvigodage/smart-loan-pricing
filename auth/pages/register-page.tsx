"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Shield, ChevronDown, ArrowRight, CheckCircle2 } from "lucide-react"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Button } from "@/shared/components/ui/button"

export default function RegisterPage() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("loan_officer")

    const [fullNameError, setFullNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isValid, setIsValid] = useState(false)

    const hasNumber = /\d/.test(password)
    const isLongEnough = password.length >= 8

    let strengthLabel = "Weak"
    let strengthColor = "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]"
    let strengthTextClass = "text-rose-500"
    let isStrongEnough = false

    if (isLongEnough && hasNumber) {
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password) && /[A-Z]/.test(password)) {
            strengthLabel = "Strong"
            strengthColor = "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
            strengthTextClass = "text-emerald-600"
            isStrongEnough = true
        } else {
            strengthLabel = "Medium"
            strengthColor = "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]"
            strengthTextClass = "text-amber-600"
            isStrongEnough = true
        }
    }

    let barWidth = "w-1/4"
    if (strengthLabel === "Medium") barWidth = "w-1/2"
    if (strengthLabel === "Strong") barWidth = "w-full"
    if (password.length === 0) barWidth = "w-0"

    const validateFullName = (value: string) => {
        if (!value.trim()) return "Full name is required"
        if (value.length < 2) return "Name is too short"
        return ""
    }
    const validateEmail = (value: string) => {
        if (!value) return "Email is required"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address"
        return ""
    }
    const validatePassword = (value: string) => {
        if (!value) return "Password is required"
        if (!isLongEnough) return "Password must be at least 8 characters"
        if (!hasNumber) return "Password must include at least one number"
        return ""
    }

    useEffect(() => {
        setIsValid(
            validateFullName(fullName) === "" &&
            validateEmail(email) === "" &&
            validatePassword(password) === ""
        )
    }, [fullName, email, password])

    const handleNameBlur = () => setFullNameError(validateFullName(fullName))
    const handleEmailBlur = () => setEmailError(validateEmail(email))
    const handlePasswordBlur = () => setPasswordError(validatePassword(password))

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const nError = validateFullName(fullName)
        const eError = validateEmail(email)
        const pError = validatePassword(password)
        setFullNameError(nError); setEmailError(eError); setPasswordError(pError)
        if (nError || eError || pError) { setIsValid(false); return }
        setIsSubmitting(true)
        setTimeout(() => {
            setIsSubmitting(false); setIsSuccess(true)
            setTimeout(() => setIsSuccess(false), 3000)
        }, 1500)
    }

    return (
        <div className="flex min-h-screen bg-[#F8F9FB] font-sans text-slate-900 selection:bg-[#0A66C2]/20 selection:text-[#0A66C2]">

            {/* ── Consistent Sticky Header (top-left brand) ── */}
            <div className="absolute top-0 left-0 right-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-200/60 bg-white/85 backdrop-blur-md px-6 sm:px-10">
                <Link href="/login" className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]/40 rounded-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#0A66C2] to-[#004182] shadow-md">
                        <Shield className="h-4 w-4 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-slate-800">HyperLoan</span>
                </Link>
                <Link href="/login" className="text-[0.875rem] font-semibold text-slate-600 hover:text-[#0A66C2] transition-colors">
                    Already have an account? <span className="text-[#0A66C2] font-bold">Sign In</span>
                </Link>
            </div>

            {/* ── Page Content (centred, with top padding for header) ── */}
            <div className="flex w-full flex-col items-center justify-center px-4 pt-[88px] pb-12 sm:px-6 lg:px-8 relative overflow-hidden">

                {/* Decorative background accents */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#0A66C2]/8 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 -left-20 w-72 h-72 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

                {/* Subheading above card */}
                <div className="mb-7 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
                    <h1 className="text-[1.75rem] font-bold tracking-tight text-slate-900">Create Officer Account</h1>
                    <p className="mt-1.5 text-[0.925rem] font-medium text-slate-500">
                        Set up a secure profile for loan application oversight.
                    </p>
                </div>

                {/* Form Card */}
                <div className="w-full max-w-[28rem] rounded-2xl bg-white border border-slate-200/70 p-8 shadow-sm animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 fill-mode-both">

                    {isSuccess && (
                        <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4 animate-in slide-in-from-top-4 fade-in duration-300">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                                <div>
                                    <h3 className="text-sm font-bold text-emerald-800">Account Created</h3>
                                    <p className="text-sm text-emerald-700 mt-0.5">Your officer account has been securely provisioned.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                        <div className="space-y-1.5">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" name="fullName" type="text" placeholder="e.g. Jane Doe" autoComplete="name" required
                                value={fullName} onChange={e => { setFullName(e.target.value); if (fullNameError) setFullNameError("") }}
                                onBlur={handleNameBlur} error={fullNameError} disabled={isSubmitting || isSuccess} />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" name="email" type="email" placeholder="jane@company.com" autoComplete="email" required
                                value={email} onChange={e => { setEmail(e.target.value); if (emailError) setEmailError("") }}
                                onBlur={handleEmailBlur} error={emailError} disabled={isSubmitting || isSuccess} />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="Create a strong password" autoComplete="new-password" required
                                value={password} onChange={e => { setPassword(e.target.value); if (passwordError) setPasswordError("") }}
                                onBlur={handlePasswordBlur} error={passwordError} disabled={isSubmitting || isSuccess}
                                aria-describedby="password-strength" />
                        </div>

                        {/* Strength Indicator */}
                        <div id="password-strength" className="space-y-2">
                            <div className="flex items-center justify-between text-[0.78rem] font-bold">
                                <span className="text-slate-500">Password Strength</span>
                                <span className={password.length > 0 ? strengthTextClass : "text-slate-400"} aria-live="polite">
                                    {password.length > 0 ? strengthLabel : "None"}
                                </span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100" role="progressbar"
                                aria-valuenow={password.length === 0 ? 0 : strengthLabel === "Weak" ? 25 : strengthLabel === "Medium" ? 50 : 100}
                                aria-valuemin={0} aria-valuemax={100}>
                                <div className={`h-full rounded-full transition-all duration-500 ease-out ${strengthColor} ${barWidth}`} />
                            </div>
                            <p className="text-[0.77rem] font-medium text-slate-400">Min 8 characters, must include a number.</p>
                        </div>

                        {/* Role */}
                        <div className="space-y-1.5">
                            <Label htmlFor="role">Role Authorization</Label>
                            <div className="relative">
                                <select id="role" name="role" value={role} onChange={e => setRole(e.target.value)}
                                    disabled={isSubmitting || isSuccess}
                                    className="flex h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2 text-[0.9rem] font-semibold text-slate-800 shadow-sm transition-all focus:outline-none focus:border-[#0A66C2] focus:ring-4 focus:ring-[#0A66C2]/12 hover:border-slate-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
                                    <option value="loan_officer">Risk Loan Officer</option>
                                    <option value="manager">Portfolio Manager</option>
                                    <option value="admin">System Administrator</option>
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            </div>
                        </div>

                        <div className="pt-1">
                            <Button type="submit" className="w-full h-12 text-[0.95rem] group shadow-lg shadow-blue-500/15"
                                disabled={!isValid || isSubmitting || isSuccess} isLoading={isSubmitting} aria-live="polite">
                                {!isSubmitting && !isSuccess ? (
                                    <>Provision Account <ArrowRight className="ml-2 h-4 w-4 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300" /></>
                                ) : isSuccess ? "Success" : "Validating"}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-7 text-center text-[0.9rem] border-t border-slate-100 pt-6">
                        <span className="text-slate-500 font-medium">Already have an account? </span>
                        <Link href="/login" className="font-bold text-[#0A66C2] hover:text-[#004182] hover:underline underline-offset-4 transition-all">
                            Sign In to Portal
                        </Link>
                    </div>
                </div>

                <p className="mt-8 text-center text-[0.78rem] font-medium text-slate-400">
                    &copy; {new Date().getFullYear()} HyperLoan Inc. All rights reserved.
                </p>
            </div>
        </div>
    )
}
