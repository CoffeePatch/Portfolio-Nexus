// src/data/mockMutualFundData.ts

export interface Fund {
  id: string;
  name: string;
  schemeCode: string; // AMFI Code
  category: "Equity" | "Debt" | "Hybrid" | "ELSS";
  subCategory: string; // e.g., "Large Cap", "Liquid Fund"
  nav: number; // Current NAV
  units: number;
  investedAmount: number; // Principal
  currentValue: number;
  xirr: number; // Percentage
  lastUpdated: string;
  trend: number[]; // 7-day NAV history
}

export interface PortfolioSummary {
  totalInvested: number;
  totalCurrentValue: number;
  totalGain: number;
  xirr: number;
  nextSipDate: string;
  nextSipAmount: number;
}

export interface ChartDataPoint {
  month: string;
  invested: number;
  value: number;
}

// Different datasets for different timeframes
export const chartData1D: ChartDataPoint[] = [
  { month: "9AM", invested: 248000, value: 310000 },
  { month: "10AM", invested: 249000, value: 318000 },
  { month: "11AM", invested: 249500, value: 308000 },
  { month: "12PM", invested: 249800, value: 322000 },
  { month: "1PM", invested: 250000, value: 315000 },
  { month: "2PM", invested: 250000, value: 325000 },
  { month: "3PM", invested: 250000, value: 315840 },
];

export const chartData1W: ChartDataPoint[] = [
  { month: "Mon", invested: 245000, value: 295000 },
  { month: "Tue", invested: 246000, value: 310000 },
  { month: "Wed", invested: 247000, value: 298000 },
  { month: "Thu", invested: 248000, value: 318000 },
  { month: "Fri", invested: 249000, value: 308000 },
  { month: "Sat", invested: 249500, value: 320000 },
  { month: "Sun", invested: 250000, value: 315840 },
];

export const chartData1M: ChartDataPoint[] = [
  { month: "Week 1", invested: 235000, value: 275000 },
  { month: "Week 2", invested: 240000, value: 295000 },
  { month: "Week 3", invested: 245000, value: 285000 },
  { month: "Week 4", invested: 250000, value: 315840 },
];

export const chartData1Y: ChartDataPoint[] = [
  { month: "Jan", invested: 100000, value: 105000 },
  { month: "Feb", invested: 115000, value: 128000 },
  { month: "Mar", invested: 130000, value: 118000 },
  { month: "Apr", invested: 145000, value: 162000 },
  { month: "May", invested: 160000, value: 145000 },
  { month: "Jun", invested: 175000, value: 198000 },
  { month: "Jul", invested: 190000, value: 175000 },
  { month: "Aug", invested: 205000, value: 245000 },
  { month: "Sep", invested: 220000, value: 215000 },
  { month: "Oct", invested: 235000, value: 295000 },
  { month: "Nov", invested: 250000, value: 315840 },
];

export const chartDataMax: ChartDataPoint[] = [
  { month: "2020", invested: 50000, value: 55000 },
  { month: "2021", invested: 100000, value: 125000 },
  { month: "2022", invested: 150000, value: 135000 },
  { month: "2023", invested: 200000, value: 245000 },
  { month: "2024", invested: 250000, value: 315840 },
];

export const mockPerformanceHistory: ChartDataPoint[] = chartData1Y;

export interface SIPScheduleItem {
  id: string;
  fundName: string;
  amount: number;
  date: string; // "5th Nov"
  status: "Upcoming" | "Paid" | "Processing";
}

export interface AllocationItem {
  name: string;
  value: number;
  color: string;
}

// --- MOCK DATA ---

export const mockPortfolioSummary: PortfolioSummary = {
  totalInvested: 250000,
  totalCurrentValue: 315840,
  totalGain: 65840,
  xirr: 18.4, // Healthy SIP return
  nextSipDate: "2025-11-05",
  nextSipAmount: 15000,
};

export const mockFunds: Fund[] = [
  {
    id: "f1",
    name: "Axis Bluechip Fund Direct Plan Growth",
    schemeCode: "120503",
    category: "Equity",
    subCategory: "Large Cap",
    nav: 54.23,
    units: 1200.5,
    investedAmount: 50000,
    currentValue: 65103,
    xirr: 14.2,
    lastUpdated: "2025-11-01",
    trend: [52.1, 52.5, 53.0, 52.8, 53.5, 54.0, 54.23],
  },
  {
    id: "f2",
    name: "Parag Parikh Flexi Cap Fund",
    schemeCode: "122639",
    category: "Equity",
    subCategory: "Flexi Cap",
    nav: 72.15,
    units: 1500,
    investedAmount: 80000,
    currentValue: 108225,
    xirr: 22.5,
    lastUpdated: "2025-11-01",
    trend: [68.5, 69.0, 69.8, 70.5, 71.0, 71.8, 72.15],
  },
  {
    id: "f3",
    name: "Mirae Asset Tax Saver Fund",
    schemeCode: "127042",
    category: "ELSS",
    subCategory: "Tax Saver",
    nav: 112.4,
    units: 450,
    investedAmount: 40000,
    currentValue: 50580,
    xirr: 16.8,
    lastUpdated: "2025-11-01",
    trend: [108.0, 109.5, 109.0, 110.2, 111.0, 111.8, 112.4],
  },
];

export const mockSIPSchedule: SIPScheduleItem[] = [
  { id: "s1", fundName: "Axis Bluechip", amount: 5000, date: "5th Nov", status: "Paid" },
  { id: "s2", fundName: "Parag Parikh", amount: 8000, date: "10th Nov", status: "Processing" },
  { id: "s3", fundName: "Mirae Asset", amount: 2000, date: "15th Nov", status: "Upcoming" },
];

export const mockAllocation: AllocationItem[] = [
  { name: "Large Cap", value: 45, color: "#3b82f6" }, // Blue
  { name: "Flexi Cap", value: 35, color: "#8b5cf6" }, // Purple
  { name: "ELSS", value: 15, color: "#10b981" },      // Emerald
  { name: "Small Cap", value: 5, color: "#f97316" },  // Orange
];
