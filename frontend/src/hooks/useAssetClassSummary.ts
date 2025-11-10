import { useQuery } from "@tanstack/react-query";
import { getAllHoldings } from "../api/portfolioService";
import {
  getStockPrice,
  getMutualFundPrice,
  getCryptoPrice,
} from "../api/marketDataService";

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
      const { stocks, mutualFunds, cryptos, manuals } = await getAllHoldings();
      const summaries: AssetClassSummary[] = [];

      // Process Stocks
      if (stocks && stocks.length > 0) {
        const stockPrices = await Promise.all(
          stocks.map(async (stock) => {
            try {
              const price = await getStockPrice(stock.symbol);
              return {
                currentValue: stock.quantity * price.current_price,
                invested: stock.quantity * stock.purchasePrice,
              };
            } catch {
              return {
                currentValue: stock.quantity * stock.purchasePrice,
                invested: stock.quantity * stock.purchasePrice,
              };
            }
          })
        );

        const totalValue = stockPrices.reduce((sum, item) => sum + item.currentValue, 0);
        const totalInvested = stockPrices.reduce((sum, item) => sum + item.invested, 0);
        const gainLoss = totalValue - totalInvested;
        const gainLossPercent = totalInvested > 0 ? (gainLoss / totalInvested) * 100 : 0;

        summaries.push({
          type: "Stocks",
          icon: "show_chart",
          totalValue,
          totalInvested,
          gainLoss,
          gainLossPercent,
          count: stocks.length,
        });
      }

      // Process Crypto
      if (cryptos && cryptos.length > 0) {
        const cryptoPrices = await Promise.all(
          cryptos.map(async (crypto) => {
            try {
              const price = await getCryptoPrice(crypto.coinId);
              return {
                currentValue: crypto.quantity * price.current_price,
                invested: crypto.quantity * crypto.purchasePrice,
              };
            } catch {
              return {
                currentValue: crypto.quantity * crypto.purchasePrice,
                invested: crypto.quantity * crypto.purchasePrice,
              };
            }
          })
        );

        const totalValue = cryptoPrices.reduce((sum, item) => sum + item.currentValue, 0);
        const totalInvested = cryptoPrices.reduce((sum, item) => sum + item.invested, 0);
        const gainLoss = totalValue - totalInvested;
        const gainLossPercent = totalInvested > 0 ? (gainLoss / totalInvested) * 100 : 0;

        summaries.push({
          type: "Crypto",
          icon: "currency_bitcoin",
          totalValue,
          totalInvested,
          gainLoss,
          gainLossPercent,
          count: cryptos.length,
        });
      }

      // Process Mutual Funds
      if (mutualFunds && mutualFunds.length > 0) {
        const mfPrices = await Promise.all(
          mutualFunds.map(async (mf) => {
            try {
              const price = await getMutualFundPrice(mf.schemeCode);
              return {
                currentValue: mf.quantity * price.nav,
                invested: mf.quantity * mf.purchasePrice,
              };
            } catch {
              return {
                currentValue: mf.quantity * mf.purchasePrice,
                invested: mf.quantity * mf.purchasePrice,
              };
            }
          })
        );

        const totalValue = mfPrices.reduce((sum, item) => sum + item.currentValue, 0);
        const totalInvested = mfPrices.reduce((sum, item) => sum + item.invested, 0);
        const gainLoss = totalValue - totalInvested;
        const gainLossPercent = totalInvested > 0 ? (gainLoss / totalInvested) * 100 : 0;

        summaries.push({
          type: "Mutual Funds",
          icon: "pie_chart",
          totalValue,
          totalInvested,
          gainLoss,
          gainLossPercent,
          count: mutualFunds.length,
        });
      }

      // Process Manual Assets (grouped by type)
      if (manuals && manuals.length > 0) {
        const manualsByType: { [key: string]: any[] } = {};
        manuals.forEach((manual) => {
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
