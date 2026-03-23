export type AppStatus = "Accepted" | "Rejected" | "Pending" | "Conditional"

// ── API response types ─────────────────────────────────────────────────────
export interface LoanListResponse {
    loanId: string
    customerName: string
    createdAt: string
    offeredRate: string
    confidence: string
    status: string
}

export interface LoanHistoryResponse {
    loanListResponse: LoanListResponse[]
    noOfApplications: string
    avgAcceptance: string
    avgRejection: string
}

export interface ApplicationRecord {
    id: string
    applicationId: string
    customerName: string
    date: string
    offeredRate: string | null
    confidence: number
    status: AppStatus
    profitLoss: number
    loanAmount: string
}

export const mockApplications: ApplicationRecord[] = [
    { id: "1", applicationId: "8D3F-4B7C", customerName: "John Doe", date: "2023-10-26", offeredRate: "5.25%", confidence: 92, status: "Accepted", profitLoss: 2150, loanAmount: "$25,000" },
    { id: "2", applicationId: "A1E9-C5F2", customerName: "Jane Smith", date: "2023-10-25", offeredRate: null, confidence: 78, status: "Rejected", profitLoss: -45, loanAmount: "$15,000" },
    { id: "3", applicationId: "B2C8-D6E1", customerName: "Sam Wilson", date: "2023-10-24", offeredRate: "6.10%", confidence: 95, status: "Accepted", profitLoss: 1880, loanAmount: "$40,000" },
    { id: "4", applicationId: "F7A4-E3B9", customerName: "Maria Garcia", date: "2023-10-23", offeredRate: "4.95%", confidence: 65, status: "Pending", profitLoss: 0, loanAmount: "$18,500" },
    { id: "5", applicationId: "C3D1-G8H5", customerName: "Alex Johnson", date: "2023-10-22", offeredRate: "5.50%", confidence: 89, status: "Accepted", profitLoss: 2400, loanAmount: "$32,000" },
    { id: "6", applicationId: "H9J2-K4L0", customerName: "Priya Patel", date: "2023-10-21", offeredRate: "7.20%", confidence: 71, status: "Conditional", profitLoss: 920, loanAmount: "$22,000" },
    { id: "7", applicationId: "M5N6-P8Q2", customerName: "David Lee", date: "2023-10-20", offeredRate: "5.80%", confidence: 88, status: "Accepted", profitLoss: 3100, loanAmount: "$55,000" },
    { id: "8", applicationId: "R1S3-T9U7", customerName: "Emily Chen", date: "2023-10-19", offeredRate: null, confidence: 52, status: "Rejected", profitLoss: -120, loanAmount: "$8,500" },
    { id: "9", applicationId: "V6W2-X4Y0", customerName: "Carlos Rivera", date: "2023-10-18", offeredRate: "6.40%", confidence: 80, status: "Accepted", profitLoss: 1650, loanAmount: "$28,000" },
    { id: "10", applicationId: "Z8A1-B3C5", customerName: "Sarah Kim", date: "2023-10-17", offeredRate: "5.10%", confidence: 76, status: "Pending", profitLoss: 0, loanAmount: "$19,000" },
    { id: "11", applicationId: "D4E7-F2G6", customerName: "Raj Sharma", date: "2023-10-16", offeredRate: "8.00%", confidence: 60, status: "Conditional", profitLoss: 510, loanAmount: "$12,000" },
    { id: "12", applicationId: "H1I9-J5K3", customerName: "Lisa Turner", date: "2023-10-15", offeredRate: "5.75%", confidence: 93, status: "Accepted", profitLoss: 2800, loanAmount: "$48,000" },
    { id: "13", applicationId: "L7M2-N0P8", customerName: "Omar Hassan", date: "2023-10-14", offeredRate: null, confidence: 45, status: "Rejected", profitLoss: -200, loanAmount: "$7,000" },
    { id: "14", applicationId: "Q4R6-S1T9", customerName: "Fatima Al-Zahra", date: "2023-10-13", offeredRate: "6.85%", confidence: 84, status: "Accepted", profitLoss: 1990, loanAmount: "$35,000" },
    { id: "15", applicationId: "U3V7-W5X1", customerName: "Tom Bradley", date: "2023-10-12", offeredRate: "5.40%", confidence: 97, status: "Accepted", profitLoss: 4200, loanAmount: "$75,000" },
]

export const summaryStats = {
    totalApplications: { value: "1,482", change: "+5.2%", up: true },
    acceptanceRate: { value: "72.3%", change: "-1.1%", up: false },
    avgProfitability: { value: "$1,240", change: "+2.4%", up: true },
    avgConfidence: { value: "88%", change: "+0.8%", up: true },
}
