import { useQuery } from "@tanstack/react-query";
import { MOCK_STOCKS, MOCK_CRYPTO, MOCK_MF, MOCK_MANUAL } from "../api/mock/mockPortfolioService";

// Simulated current prices
const STOCK_PRICES: Record<string, number> = {
  RELIANCE: 2540, TATASTEEL: 125, INFY: 1550, HDFCBANK: 1680, ITC: 455, TCS: 3650
};
const CRYPTO_PRICES: Record<string, number> = {
  BTC: 5950000, ETH: 235000, SOL: 5200, DOGE: 14
};
const MF_NAVS: Record<string, number> = {
  "120503": 52.5, "122639": 78.2
};

export type PortfolioValue = {
  totalValue: number;
  returnAmount: number;
  returnPercent: number;
  totalInvested: number;
};

export const useTotalPortfolioValue = () => {
  return useQuery({
    queryKey: ["totalPortfolioValue"],
    queryFn: async () => {
      let totalValue = 0;
      let totalInvested = 0;

      // Calculate stocks value
      MOCK_STOCKS.forEach((stock) => {
        const currentPrice = STOCK_PRICES[stock.symbol] || stock.purchasePrice * 1.05;
        totalValue += stock.quantity * currentPrice;
        totalInvested += stock.quantity * stock.purchasePrice;
      });

      // Calculate mutual funds value
      MOCK_MF.forEach((mf) => {
        const currentNav = MF_NAVS[mf.schemeCode] || mf.purchasePrice * 1.1;
        totalValue += mf.quantity * currentNav;
        totalInvested += mf.quantity * mf.purchasePrice;
      });

      // Calculate crypto value
      MOCK_CRYPTO.forEach((crypto) => {
        const currentPrice = CRYPTO_PRICES[crypto.symbol] || crypto.purchasePrice * 1.1;
        totalValue += crypto.quantity * currentPrice;
        totalInvested += crypto.quantity * crypto.purchasePrice;
      });

      // Add manual holdings
      MOCK_MANUAL.forEach((manual) => {
        totalValue += manual.currentValue;
        totalInvested += manual.investedValue;
      });

      const returnAmount = totalValue - totalInvested;
      const returnPercent = totalInvested > 0 ? (returnAmount / totalInvested) * 100 : 0;

      return {
        totalValue,
        returnAmount,
        returnPercent,
        totalInvested,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useTotalPortfolioValue;
