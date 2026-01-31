// src/data/mockStockData.ts

export interface Stock {
  id: string;
  name: string;
  symbol: string;
  exchange: string;
  sector: string;
  ltp: number; // Last Traded Price
  quantity: number;
  avgCost: number; // Average purchase price
  investedAmount: number;
  currentValue: number;
  dayChange: number; // Day change percentage
  totalReturn: number; // Percentage
  lastUpdated: string;
  trend: number[]; // 7-day price history
}

export interface StockPortfolioSummary {
  totalInvested: number;
  totalCurrentValue: number;
  totalGain: number;
  dayPnL: number;
  dayPnLPercent: number;
  totalReturnPercent: number;
}

export interface ChartDataPoint {
  month: string;
  invested: number;
  value: number;
}

export interface SectorAllocation {
  name: string;
  value: number;
  color: string;
}

// Different datasets for different timeframes
export const stockChartData1D: ChartDataPoint[] = [
  { month: "9AM", invested: 233000, value: 240000 },
  { month: "10AM", invested: 233000, value: 243500 },
  { month: "11AM", invested: 233000, value: 241000 },
  { month: "12PM", invested: 233000, value: 246000 },
  { month: "1PM", invested: 233000, value: 244500 },
  { month: "2PM", invested: 233000, value: 247000 },
  { month: "3PM", invested: 233000, value: 245450 },
];

export const stockChartData1W: ChartDataPoint[] = [
  { month: "Mon", invested: 233000, value: 238000 },
  { month: "Tue", invested: 233000, value: 244000 },
  { month: "Wed", invested: 233000, value: 240500 },
  { month: "Thu", invested: 233000, value: 247000 },
  { month: "Fri", invested: 233000, value: 243000 },
  { month: "Sat", invested: 233000, value: 246500 },
  { month: "Sun", invested: 233000, value: 245450 },
];

export const stockChartData1M: ChartDataPoint[] = [
  { month: "Week 1", invested: 210000, value: 218000 },
  { month: "Week 2", invested: 220000, value: 232000 },
  { month: "Week 3", invested: 228000, value: 235000 },
  { month: "Week 4", invested: 233000, value: 245450 },
];

export const stockChartData1Y: ChartDataPoint[] = [
  { month: "Jan", invested: 80000, value: 85000 },
  { month: "Feb", invested: 100000, value: 108000 },
  { month: "Mar", invested: 120000, value: 112000 },
  { month: "Apr", invested: 140000, value: 155000 },
  { month: "May", invested: 155000, value: 148000 },
  { month: "Jun", invested: 170000, value: 185000 },
  { month: "Jul", invested: 185000, value: 175000 },
  { month: "Aug", invested: 200000, value: 218000 },
  { month: "Sep", invested: 215000, value: 208000 },
  { month: "Oct", invested: 225000, value: 238000 },
  { month: "Nov", invested: 233000, value: 245450 },
];

export const stockChartDataMax: ChartDataPoint[] = [
  { month: "2021", invested: 50000, value: 58000 },
  { month: "2022", invested: 100000, value: 95000 },
  { month: "2023", invested: 160000, value: 185000 },
  { month: "2024", invested: 200000, value: 228000 },
  { month: "2025", invested: 233000, value: 245450 },
];

// --- MOCK DATA ---

export const mockStockSummary: StockPortfolioSummary = {
  totalInvested: 233000,
  totalCurrentValue: 245450,
  totalGain: 12450,
  dayPnL: 1850,
  dayPnLPercent: 0.76,
  totalReturnPercent: 5.34,
};

export const mockSectorAllocation: SectorAllocation[] = [
  { name: "Technology", value: 45, color: "#6366f1" },
  { name: "Financial Services", value: 25, color: "#3b82f6" },
  { name: "Consumer Goods", value: 18, color: "#10b981" },
  { name: "Energy", value: 12, color: "#f59e0b" },
];

export const mockStocks: Stock[] = [
  {
    id: "s1",
    name: "Reliance Industries Ltd",
    symbol: "RELIANCE",
    exchange: "NSE",
    sector: "Energy",
    ltp: 2540,
    quantity: 50,
    avgCost: 2400,
    investedAmount: 120000,
    currentValue: 127000,
    dayChange: 1.2,
    totalReturn: 5.83,
    lastUpdated: "2026-01-31",
    trend: [2480, 2510, 2495, 2520, 2535, 2550, 2540],
  },
  {
    id: "s2",
    name: "Tata Steel Ltd",
    symbol: "TATASTEEL",
    exchange: "NSE",
    sector: "Materials",
    ltp: 125,
    quantity: 100,
    avgCost: 110,
    investedAmount: 11000,
    currentValue: 12500,
    dayChange: -0.5,
    totalReturn: 13.64,
    lastUpdated: "2026-01-31",
    trend: [108, 112, 118, 115, 122, 126, 125],
  },
  {
    id: "s3",
    name: "Infosys Ltd",
    symbol: "INFY",
    exchange: "NSE",
    sector: "Technology",
    ltp: 1550,
    quantity: 25,
    avgCost: 1600,
    investedAmount: 40000,
    currentValue: 38750,
    dayChange: 0.8,
    totalReturn: -3.13,
    lastUpdated: "2026-01-31",
    trend: [1580, 1560, 1545, 1555, 1548, 1540, 1550],
  },
  {
    id: "s4",
    name: "HDFC Bank Ltd",
    symbol: "HDFCBANK",
    exchange: "NSE",
    sector: "Financial Services",
    ltp: 1680,
    quantity: 40,
    avgCost: 1550,
    investedAmount: 62000,
    currentValue: 67200,
    dayChange: 1.5,
    totalReturn: 8.39,
    lastUpdated: "2026-01-31",
    trend: [1620, 1640, 1655, 1648, 1665, 1672, 1680],
  },
];

export const topGainers = [
  { symbol: "TATASTEEL", change: 13.64 },
  { symbol: "HDFCBANK", change: 8.39 },
  { symbol: "RELIANCE", change: 5.83 },
];

export const topLosers = [
  { symbol: "INFY", change: -3.13 },
];
