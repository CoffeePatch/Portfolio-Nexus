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

export type AssetClassSummary = {
  type: string;
  icon: string;
  totalValue: number;
  totalInvested: number;
  gainLoss: number;
  gainLossPercent: number;
  count: number;
};

export const useAssetClassSummary = () => {
  return useQuery({
    queryKey: ["assetClassSummary"],
    queryFn: async () => {
      const summaries: AssetClassSummary[] = [];

      // Process Stocks
      if (MOCK_STOCKS.length > 0) {
        let totalValue = 0;
        let totalInvested = 0;
        
        MOCK_STOCKS.forEach((stock) => {
          const currentPrice = STOCK_PRICES[stock.symbol] || stock.purchasePrice * 1.05;
          totalValue += stock.quantity * currentPrice;
          totalInvested += stock.quantity * stock.purchasePrice;
        });

        const gainLoss = totalValue - totalInvested;
        const gainLossPercent = totalInvested > 0 ? (gainLoss / totalInvested) * 100 : 0;

        summaries.push({
          type: "Stocks",
          icon: "show_chart",
          totalValue,
          totalInvested,
          gainLoss,
          gainLossPercent,
          count: MOCK_STOCKS.length,
        });
      }

      // Process Crypto
      if (MOCK_CRYPTO.length > 0) {
        let totalValue = 0;
        let totalInvested = 0;

        MOCK_CRYPTO.forEach((crypto) => {
          const currentPrice = CRYPTO_PRICES[crypto.symbol] || crypto.purchasePrice * 1.1;
          totalValue += crypto.quantity * currentPrice;
          totalInvested += crypto.quantity * crypto.purchasePrice;
        });

        const gainLoss = totalValue - totalInvested;
        const gainLossPercent = totalInvested > 0 ? (gainLoss / totalInvested) * 100 : 0;

        summaries.push({
          type: "Crypto",
          icon: "currency_bitcoin",
          totalValue,
          totalInvested,
          gainLoss,
          gainLossPercent,
          count: MOCK_CRYPTO.length,
        });
      }

      // Process Mutual Funds
      if (MOCK_MF.length > 0) {
        let totalValue = 0;
        let totalInvested = 0;

        MOCK_MF.forEach((mf) => {
          const currentNav = MF_NAVS[mf.schemeCode] || mf.purchasePrice * 1.1;
          totalValue += mf.quantity * currentNav;
          totalInvested += mf.quantity * mf.purchasePrice;
        });

        const gainLoss = totalValue - totalInvested;
        const gainLossPercent = totalInvested > 0 ? (gainLoss / totalInvested) * 100 : 0;

        summaries.push({
          type: "Mutual Funds",
          icon: "pie_chart",
          totalValue,
          totalInvested,
          gainLoss,
          gainLossPercent,
          count: MOCK_MF.length,
        });
      }

      // Process Manual Assets (grouped by type)
      if (MOCK_MANUAL.length > 0) {
        const manualsByType: { [key: string]: typeof MOCK_MANUAL } = {};
        MOCK_MANUAL.forEach((manual) => {
          if (!manualsByType[manual.assetType]) {
            manualsByType[manual.assetType] = [];
          }
          manualsByType[manual.assetType].push(manual);
        });

        Object.entries(manualsByType).forEach(([assetType, assets]) => {
          const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
          const totalInvested = assets.reduce((sum, asset) => sum + asset.investedValue, 0);
          const gainLoss = totalValue - totalInvested;
          const gainLossPercent = totalInvested > 0 ? (gainLoss / totalInvested) * 100 : 0;

          // Icon mapping for manual asset types
          const iconMap: { [key: string]: string } = {
            Gold: "diamond",
            Silver: "diamond",
            "Real Estate": "home",
            NPS: "savings",
            Bond: "account_balance",
            Bonds: "account_balance",
          };

          summaries.push({
            type: assetType,
            icon: iconMap[assetType] || "account_balance",
            totalValue,
            totalInvested,
            gainLoss,
            gainLossPercent,
            count: assets.length,
          });
        });
      }

      return summaries;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
