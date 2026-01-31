import type { 
  StockHolding, 
  MutualFundHolding, 
  CryptoHolding, 
  ManualHolding, 
  PortfolioHistory 
} from "../portfolioService";

// Helper to generate dates relative to today
const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

// --- MOCK HOLDINGS DATA ---

export const MOCK_STOCKS: StockHolding[] = [
  {
    id: 1, externalId: "stk_001", userId: "user_1",
    symbol: "RELIANCE", exchange: "NSE", quantity: 50, purchasePrice: 2400,
    purchaseDate: daysAgo(150), createdAt: daysAgo(150), updatedAt: daysAgo(1)
  },
  {
    id: 2, externalId: "stk_002", userId: "user_1",
    symbol: "TATASTEEL", exchange: "NSE", quantity: 100, purchasePrice: 110,
    purchaseDate: daysAgo(45), createdAt: daysAgo(45), updatedAt: daysAgo(1)
  },
  {
    id: 3, externalId: "stk_003", userId: "user_1",
    symbol: "INFY", exchange: "NSE", quantity: 25, purchasePrice: 1600,
    purchaseDate: daysAgo(200), createdAt: daysAgo(200), updatedAt: daysAgo(1)
  },
  {
    id: 4, externalId: "stk_004", userId: "user_1",
    symbol: "HDFCBANK", exchange: "NSE", quantity: 40, purchasePrice: 1550,
    purchaseDate: daysAgo(100), createdAt: daysAgo(100), updatedAt: daysAgo(1)
  }
];

export const MOCK_CRYPTO: CryptoHolding[] = [
  {
    id: 1, externalId: "cry_001", userId: "user_1",
    coinId: "bitcoin", symbol: "BTC", quantity: 0.045, purchasePrice: 3500000,
    purchaseDate: daysAgo(300), createdAt: daysAgo(300), updatedAt: daysAgo(1)
  },
  {
    id: 2, externalId: "cry_002", userId: "user_1",
    coinId: "ethereum", symbol: "ETH", quantity: 1.2, purchasePrice: 180000,
    purchaseDate: daysAgo(120), createdAt: daysAgo(120), updatedAt: daysAgo(1)
  },
  {
    id: 3, externalId: "cry_003", userId: "user_1",
    coinId: "solana", symbol: "SOL", quantity: 15, purchasePrice: 4500,
    purchaseDate: daysAgo(60), createdAt: daysAgo(60), updatedAt: daysAgo(1)
  }
];

export const MOCK_MF: MutualFundHolding[] = [
  {
    id: 1, externalId: "mf_001", userId: "user_1",
    schemeCode: "120503", quantity: 1500.5, purchasePrice: 45.2,
    purchaseDate: daysAgo(365), createdAt: daysAgo(365), updatedAt: daysAgo(1)
  },
  {
    id: 2, externalId: "mf_002", userId: "user_1",
    schemeCode: "122639", quantity: 800, purchasePrice: 68.5,
    purchaseDate: daysAgo(180), createdAt: daysAgo(180), updatedAt: daysAgo(1)
  }
];

export const MOCK_MANUAL: ManualHolding[] = [
  {
    id: 1, externalId: "man_001", userId: "user_1",
    assetName: "Gold Sovereign Bond", assetType: "Bond", investedValue: 50000, currentValue: 58000,
    purchaseDate: daysAgo(400), maturityDate: daysAgo(-1000), createdAt: daysAgo(400), updatedAt: daysAgo(1)
  }
];

// --- MOCK HISTORY GENERATOR (The "Growth Curve") ---

export const getMockPortfolioHistory = async (period: string = "1M"): Promise<PortfolioHistory[]> => {
  // Simulate network delay to check loading states
  await new Promise(resolve => setTimeout(resolve, 600));

  const history: PortfolioHistory[] = [];
  const points = period === "1Y" ? 12 : period === "1M" ? 30 : period === "1W" ? 7 : 24;
  
  // Starting base value (approx total of mock holdings)
  let baseValue = 1200000; 

  for (let i = points; i >= 0; i--) {
    // Add controlled randomness to simulate market fluctuation
    const volatility = period === "1D" ? 2000 : 15000; 
    const trend = i * 500; // Slight upward trend over time
    const change = (Math.random() - 0.45) * volatility; 
    
    baseValue = baseValue - trend + change;
    
    // Ensure value doesn't drop unrealistically low
    if (baseValue < 800000) baseValue = 800000;

    history.push({
      id: i,
      userId: "user_1",
      snapshotDate: daysAgo(i),
      totalValue: Math.floor(baseValue)
    });
  }
  // Return reversed array so oldest is first (for charts)
  return history.reverse();
};

// --- API SIMULATORS ---
// These functions match the signature of your real API calls

export const getMockStockHoldings = async () => Promise.resolve(MOCK_STOCKS);
export const getMockCryptoHoldings = async () => Promise.resolve(MOCK_CRYPTO);
export const getMockMutualFundHoldings = async () => Promise.resolve(MOCK_MF);
export const getMockManualHoldings = async () => Promise.resolve(MOCK_MANUAL);

export const getMockAllHoldings = async () => {
  // Simulate slight delay
  await new Promise(resolve => setTimeout(resolve, 400));
  return {
    stocks: MOCK_STOCKS,
    mutualFunds: MOCK_MF,
    cryptos: MOCK_CRYPTO,
    manuals: MOCK_MANUAL
  };
};
