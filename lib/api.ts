/**
 * Shared API base URL — sourced from the NEXT_PUBLIC_API_URL environment variable.
 * Set NEXT_PUBLIC_API_URL in .env.local for local development,
 * and in the Vercel project settings for staging/production.
 */
export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081"
