"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Button } from "@/shared/components/ui/button"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isValid, setIsValid] = useState(false)

    // Format validation logic for email
    const validateEmail = (value: string) => {
        if (!value) return "Email is required"
        const isFormatOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        if (!isFormatOk) return "Please enter a valid email address"
        return ""
    }

    // Length and condition checks for password
    const validatePassword = (value: string) => {
        if (!value) return "Password is required"
        if (value.length < 8) return "Password must be at least 8 characters"
        return ""
    }

    // Check valid status on typing
    useEffect(() => {
        const isEmailOk = validateEmail(email) === ""
        const isPasswordOk = validatePassword(password) === ""
        setIsValid(isEmailOk && isPasswordOk)
    }, [email, password])

    // Handle blurs for individual field validation feedback
    const handleEmailBlur = () => setEmailError(validateEmail(email))
    const handlePasswordBlur = () => setPasswordError(validatePassword(password))

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Final check before submission
        const eError = validateEmail(email)
        const pError = validatePassword(password)
        setEmailError(eError)
        setPasswordError(pError)

        if (eError || pError) {
            setIsValid(false)
            return
        }

        setIsSubmitting(true)

        // Simulating API loading request
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSuccess(true)

            // Simulate redirection / clearing state
            setTimeout(() => setIsSuccess(false), 2500)
        }, 1500)
    }

    return (
        <div className="flex min-h-screen bg-white font-sans text-slate-900 selection:bg-[#0A66C2]/20 selection:text-[#0A66C2]">
            {/* Left pane - Image/Brand with Glassmorphism */}
            <div className="hidden w-1/2 flex-col items-center justify-center relative overflow-hidden lg:flex bg-slate-950">

                {/* Subtle animated gradient background */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0A66C2]/20 via-[#004182]/40 to-slate-950" />

                {/* The background overlay Image */}
                <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay" aria-hidden="true">
                    {/* Note: since Next.js standard image is required, placeholder url here if auth-bg not found */}
                    <div className="w-full h-full bg-[url('/auth-bg.png')] bg-cover bg-center" />
                </div>

                {/* Decorative lighting elements */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0A66C2]/30 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

                {/* Content on top of image */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-md px-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
                    <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-[1.5rem] bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl border border-white/10 relative group">
                        <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="flex flex-col items-center">
                            <ShieldCheck className="h-10 w-10 text-cyan-400 mb-1.5 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" aria-hidden="true" />
                            <span className="text-[0.65rem] font-bold tracking-[0.2em] text-white/90 uppercase">HyPerLoan</span>
                        </div>
                    </div>

                    <h1 className="mb-5 text-4xl font-bold tracking-tight text-white drop-shadow-md lg:text-5xl leading-tight">
                        HyperLoan Pricing
                    </h1>

                    <p className="text-lg font-medium text-slate-300 drop-shadow-sm leading-relaxed max-w-sm">
                        Intelligent Pricing. Smarter Lending. Leverage AI to optimize your portfolio.
                    </p>
                </div>
            </div>

            {/* Right pane - Form */}
            <div className="flex w-full flex-col justify-center px-6 lg:w-1/2 xl:px-24 bg-white relative">
                {/* Subtle grid pattern for texture */}
                <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-multiply" />

                <div className="mx-auto w-full max-w-[26rem] relative z-10 animate-in fade-in slide-in-from-right-8 duration-700 ease-out delay-150 fill-mode-both">
                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-[2.25rem] font-bold tracking-tight text-slate-900">Welcome Back</h2>
                        <p className="mt-2.5 text-[1rem] text-slate-500 font-medium">Log in to securely access your workspace.</p>
                    </div>

                    {isSuccess && (
                        <div className="mb-6 rounded-lg bg-emerald-50 border border-emerald-200 p-4 animate-in slide-in-from-top-4 fade-in duration-300">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-semibold text-emerald-800">Login Successful</h3>
                                    <div className="mt-1 text-sm text-emerald-700">
                                        <p>Redirecting to your dashboard...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                        <div className="space-y-1.5 group">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Ex. jane@company.com"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    if (emailError) setEmailError("")
                                }}
                                onBlur={handleEmailBlur}
                                error={emailError}
                                disabled={isSubmitting || isSuccess}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between mb-2">
                                <Label htmlFor="password" className="mb-0">Password</Label>
                                <Link
                                    href="#"
                                    className="text-[0.85rem] font-bold text-[#0A66C2] hover:text-[#004182] transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]/60 focus-visible:ring-offset-2"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    if (passwordError) setPasswordError("")
                                }}
                                onBlur={handlePasswordBlur}
                                error={passwordError}
                                disabled={isSubmitting || isSuccess}
                            />
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="w-full h-12 text-[1rem] group"
                                disabled={!isValid || isSubmitting || isSuccess}
                                isLoading={isSubmitting}
                                aria-live="polite"
                            >
                                {!isSubmitting && !isSuccess ? (
                                    <>
                                        Sign In
                                        <ArrowRight className="ml-2 h-4 w-4 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300" aria-hidden="true" />
                                    </>
                                ) : isSuccess ? "Success" : "Authenticating"}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-10 text-center text-[0.95rem]">
                        <span className="text-slate-500 font-medium">Don't have an account? </span>
                        <Link
                            href="/register"
                            className="font-bold text-[#0A66C2] hover:text-[#004182] hover:underline underline-offset-4 transition-all duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]/60 focus-visible:ring-offset-2"
                        >
                            Create an account
                        </Link>
                    </div>

                    <div className="mt-12 text-center text-[0.80rem] font-medium text-slate-400">
                        &copy; {new Date().getFullYear()} Adaptive Corp. All Rights Reserved.
                    </div>
                </div>
            </div>
        </div>
    )
}
