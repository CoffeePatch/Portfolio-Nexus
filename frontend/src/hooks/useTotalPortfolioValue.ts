import { useQuery } from "@tanstack/react-query";
import { getAllHoldings } from "../api/portfolioService";
import {
  getStockPrice,
  getMutualFundPrice,
  getCryptoPrice,
} from "../api/marketDataService";

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
      const { stocks, mutualFunds, cryptos, manuals } = await getAllHoldings();

      let totalValue = 0;
      let totalInvested = 0;

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

      // Add manual holdings (Gold, Real Estate, etc.)
      const manualValues = (manuals || []).map((manual) => ({
        currentValue: manual.currentValue,
        invested: manual.investedValue,
      }));

      [...stockPrices, ...mfPrices, ...cryptoPrices, ...manualValues].forEach((item) => {
        totalValue += item.currentValue;
        totalInvested += item.invested;
      });

      const returnAmount = totalValue - totalInvested;
      const returnPercent =
        totalInvested > 0 ? (returnAmount / totalInvested) * 100 : 0;

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
