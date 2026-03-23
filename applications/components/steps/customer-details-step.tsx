"use client"

import React from "react"
import { CustomerDetails } from "@/types/application"
import { FormField, baseInputClass, baseSelectClass, errorInputClass } from "@/applications/components/ui/form-field"
import { cn } from "@/lib/utils"

type Errors = Partial<Record<keyof CustomerDetails, string>>

interface CustomerDetailsStepProps {
    data: Partial<CustomerDetails>
    errors: Errors
    onChange: (field: keyof CustomerDetails, value: string) => void
    onBlur: (field: keyof CustomerDetails) => void
}

const EMPLOYMENT_TYPES = [
    "Employed",
    "Self-Employed",
    "Unemployed",
]

const EDUCATION_LEVELS = [
    "High School",
    "Bachelor",
    "Master",
    "Associate",
    "Doctorate",
]

const MARITAL_STATUSES = [
    "Single",
    "Married",
    "Divorced",
    "Widowed",
]

export function CustomerDetailsStep({ data, errors, onChange, onBlur }: CustomerDetailsStepProps) {
    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 ease-out fill-mode-both">
            <div className="mb-8">
                <h2 className="text-[1.75rem] font-bold tracking-tight text-slate-900">Tell us about yourself</h2>
                <p className="mt-1.5 text-[0.975rem] font-medium text-slate-500">
                    Please fill out the information below to proceed.
                </p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200/70 p-6 sm:p-8 shadow-sm space-y-6">
                {/* Full Name */}
                <FormField label="Full Name" htmlFor="fullName" error={errors.fullName} required>
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={data.fullName ?? ""}
                        onChange={e => onChange("fullName", e.target.value)}
                        onBlur={() => onBlur("fullName")}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? "fullName-error" : undefined}
                        className={cn(baseInputClass, errors.fullName && errorInputClass)}
                    />
                </FormField>

                {/* Age + Employment Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Age" htmlFor="age" error={errors.age} required>
                        <input
                            id="age"
                            name="age"
                            type="number"
                            inputMode="numeric"
                            placeholder="e.g., 35"
                            min={18}
                            max={85}
                            value={data.age ?? ""}
                            onChange={e => onChange("age", e.target.value)}
                            onBlur={() => onBlur("age")}
                            aria-invalid={!!errors.age}
                            className={cn(baseInputClass, errors.age && errorInputClass)}
                        />
                    </FormField>

                    <FormField label="Employment Type" htmlFor="employmentType" error={errors.employmentType} required>
                        <div className="relative">
                            <select
                                id="employmentType"
                                name="employmentType"
                                value={data.employmentType ?? ""}
                                onChange={e => onChange("employmentType", e.target.value)}
                                onBlur={() => onBlur("employmentType")}
                                className={cn(baseSelectClass, errors.employmentType && errorInputClass)}
                            >
                                <option value="" disabled>Select employment type</option>
                                {EMPLOYMENT_TYPES.map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                    </FormField>
                </div>

                {/* Education + Marital Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Education Level" htmlFor="educationLevel" error={errors.educationLevel}>
                        <div className="relative">
                            <select
                                id="educationLevel"
                                name="educationLevel"
                                value={data.educationLevel ?? ""}
                                onChange={e => onChange("educationLevel", e.target.value)}
                                onBlur={() => onBlur("educationLevel")}
                                className={cn(baseSelectClass, errors.educationLevel && errorInputClass)}
                            >
                                <option value="" disabled>Select education level</option>
                                {EDUCATION_LEVELS.map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                    </FormField>

                    <FormField label="Marital Status" htmlFor="maritalStatus" error={errors.maritalStatus}>
                        <div className="relative">
                            <select
                                id="maritalStatus"
                                name="maritalStatus"
                                value={data.maritalStatus ?? ""}
                                onChange={e => onChange("maritalStatus", e.target.value)}
                                onBlur={() => onBlur("maritalStatus")}
                                className={cn(baseSelectClass, errors.maritalStatus && errorInputClass)}
                            >
                                <option value="" disabled>Select marital status</option>
                                {MARITAL_STATUSES.map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                    </FormField>
                </div>

                {/* Annual Income */}
                <FormField label="Annual Income" htmlFor="annualIncome" error={errors.annualIncome} hint="Enter your gross annual income in USD" required>
                    <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">$</span>
                        <input
                            id="annualIncome"
                            name="annualIncome"
                            type="text"
                            inputMode="decimal"
                            placeholder="Enter your annual income"
                            value={data.annualIncome ?? ""}
                            onChange={e => onChange("annualIncome", e.target.value.replace(/[^0-9.]/g, ""))}
                            onBlur={() => onBlur("annualIncome")}
                            aria-invalid={!!errors.annualIncome}
                            className={cn(baseInputClass, "pl-7", errors.annualIncome && errorInputClass)}
                        />
                    </div>
                </FormField>
            </div>
        </div>
    )
}
