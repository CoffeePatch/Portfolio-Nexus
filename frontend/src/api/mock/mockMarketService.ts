import type { StockPrice, CryptoPrice } from "../marketDataService";

// Helper to randomize price slightly (+/- volatility %)
const randomize = (base: number, volatility: number = 0.015) => {
  const change = base * volatility * (Math.random() - 0.5);
  return base + change;
};

export const getMockStockPrice = async (symbol: string): Promise<StockPrice> => {
  // Base prices for simulation (hardcoded "Anchors")
  const basePrices: Record<string, number> = {
    "RELIANCE": 2450,
    "TATASTEEL": 118,
    "INFY": 1450,
    "HDFCBANK": 1600,
    "ITC": 440,
    "TCS": 3500
  };

  const current = randomize(basePrices[symbol] || 500);

  return {
    symbol: symbol,
    current_price: current,
    change_24h: current - (basePrices[symbol] || 500),
    change_percent_24h: ((current - (basePrices[symbol] || 500)) / (basePrices[symbol] || 500)) * 100,
    high_24h: current * 1.02,
    low_24h: current * 0.98,
    volume_24h: Math.floor(Math.random() * 1000000),
    timestamp: new Date().toISOString()
  };
};

export const getMockCryptoPrice = async (coinId: string): Promise<CryptoPrice> => {
  const basePrices: Record<string, number> = {
    "bitcoin": 5800000,
    "ethereum": 220000,
    "solana": 4500,
    "dogecoin": 12
  };

  // Crypto is more volatile (5% swing)
  const current = randomize(basePrices[coinId] || 1000, 0.05); 

  return {
    coin_id: coinId,
    name: coinId.toUpperCase(),
    symbol: coinId === "bitcoin" ? "BTC" : coinId === "ethereum" ? "ETH" : "CRYPTO",
    current_price: current,
    price_change_24h: current * 0.02,
    price_change_percentage_24h: (Math.random() * 10) - 4, // Random % between -4% and +6%
    market_cap: 1000000000,
    total_volume: 50000000,
    high_24h: current * 1.05,
    low_24h: current * 0.95
  };
};
