// src/data/mockCryptoData.ts

export interface Crypto {
  id: string;
  name: string;
  symbol: string;
  network: string;
  ltp: number; // Last Traded Price in INR
  quantity: number;
  avgCost: number;
  investedAmount: number;
  currentValue: number;
  change24h: number;
  totalReturn: number;
  lastUpdated: string;
  trend: number[]; // 7-day price history
}

export interface CryptoPortfolioSummary {
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

export interface CryptoAllocation {
  name: string;
  symbol: string;
  value: number;
  color: string;
}

// Different datasets for different timeframes
export const cryptoChartData1D: ChartDataPoint[] = [
  { month: "9AM", invested: 485000, value: 520000 },
  { month: "10AM", invested: 485000, value: 535000 },
  { month: "11AM", invested: 485000, value: 528000 },
  { month: "12PM", invested: 485000, value: 545000 },
  { month: "1PM", invested: 485000, value: 538000 },
  { month: "2PM", invested: 485000, value: 552000 },
  { month: "3PM", invested: 485000, value: 548500 },
];

export const cryptoChartData1W: ChartDataPoint[] = [
  { month: "Mon", invested: 485000, value: 510000 },
  { month: "Tue", invested: 485000, value: 532000 },
  { month: "Wed", invested: 485000, value: 518000 },
  { month: "Thu", invested: 485000, value: 545000 },
  { month: "Fri", invested: 485000, value: 535000 },
  { month: "Sat", invested: 485000, value: 555000 },
  { month: "Sun", invested: 485000, value: 548500 },
];

export const cryptoChartData1M: ChartDataPoint[] = [
  { month: "Week 1", invested: 420000, value: 445000 },
  { month: "Week 2", invested: 450000, value: 485000 },
  { month: "Week 3", invested: 470000, value: 510000 },
  { month: "Week 4", invested: 485000, value: 548500 },
];

export const cryptoChartData1Y: ChartDataPoint[] = [
  { month: "Jan", invested: 150000, value: 165000 },
  { month: "Feb", invested: 200000, value: 185000 },
  { month: "Mar", invested: 250000, value: 290000 },
  { month: "Apr", invested: 300000, value: 340000 },
  { month: "May", invested: 320000, value: 295000 },
  { month: "Jun", invested: 350000, value: 410000 },
  { month: "Jul", invested: 380000, value: 360000 },
  { month: "Aug", invested: 410000, value: 475000 },
  { month: "Sep", invested: 440000, value: 420000 },
  { month: "Oct", invested: 460000, value: 510000 },
  { month: "Nov", invested: 485000, value: 548500 },
];

export const cryptoChartDataMax: ChartDataPoint[] = [
  { month: "2021", invested: 100000, value: 180000 },
  { month: "2022", invested: 200000, value: 150000 },
  { month: "2023", invested: 320000, value: 420000 },
  { month: "2024", invested: 420000, value: 510000 },
  { month: "2025", invested: 485000, value: 548500 },
];

// --- MOCK DATA ---

export const mockCryptoSummary: CryptoPortfolioSummary = {
  totalInvested: 485000,
  totalCurrentValue: 548500,
  totalGain: 63500,
  dayPnL: 4250,
  dayPnLPercent: 0.78,
  totalReturnPercent: 13.09,
};

export const mockCryptoAllocation: CryptoAllocation[] = [
  { name: "Bitcoin", symbol: "BTC", value: 55, color: "#f7931a" },
  { name: "Ethereum", symbol: "ETH", value: 28, color: "#627eea" },
  { name: "Solana", symbol: "SOL", value: 12, color: "#00ffa3" },
  { name: "Dogecoin", symbol: "DOGE", value: 5, color: "#c2a633" },
];

export const mockCryptos: Crypto[] = [
  {
    id: "c1",
    name: "Bitcoin",
    symbol: "BTC",
    network: "Bitcoin",
    ltp: 5950000,
    quantity: 0.05,
    avgCost: 5400000,
    investedAmount: 270000,
    currentValue: 297500,
    change24h: 2.4,
    totalReturn: 10.19,
    lastUpdated: "2026-01-31",
    trend: [5800000, 5850000, 5900000, 5870000, 5920000, 5960000, 5950000],
  },
  {
    id: "c2",
    name: "Ethereum",
    symbol: "ETH",
    network: "Ethereum",
    ltp: 235000,
    quantity: 0.6,
    avgCost: 210000,
    investedAmount: 126000,
    currentValue: 141000,
    change24h: -0.8,
    totalReturn: 11.9,
    lastUpdated: "2026-01-31",
    trend: [228000, 232000, 230000, 234000, 236000, 238000, 235000],
  },
  {
    id: "c3",
    name: "Solana",
    symbol: "SOL",
    network: "Solana",
    ltp: 5200,
    quantity: 15,
    avgCost: 4800,
    investedAmount: 72000,
    currentValue: 78000,
    change24h: 3.5,
    totalReturn: 8.33,
    lastUpdated: "2026-01-31",
    trend: [4900, 5000, 5050, 5100, 5150, 5180, 5200],
  },
  {
    id: "c4",
    name: "Dogecoin",
    symbol: "DOGE",
    network: "Dogecoin",
    ltp: 14,
    quantity: 2000,
    avgCost: 12,
    investedAmount: 24000,
    currentValue: 28000,
    change24h: 5.2,
    totalReturn: 16.67,
    lastUpdated: "2026-01-31",
    trend: [12.5, 13, 13.2, 13.5, 13.8, 14.2, 14],
  },
];
