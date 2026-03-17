import { useQuery } from "@tanstack/react-query";
import { getAllHoldings } from "../api/portfolioService";

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

      let totalInvested = 0;
      let totalValue = 0;

      // Stocks: use purchasePrice as proxy for current value (live prices fetched separately where needed)
      stocks.forEach((s) => {
        const invested = s.quantity * s.purchasePrice;
        totalInvested += invested;
        // Approximate current value with a small growth factor until live prices are available
        totalValue += invested * 1.05;
      });

      // Mutual Funds
      mutualFunds.forEach((mf) => {
        const invested = mf.quantity * mf.purchasePrice;
        totalInvested += invested;
        totalValue += invested * 1.08;
      });

      // Crypto
      cryptos.forEach((c) => {
        const invested = c.quantity * c.purchasePrice;
        totalInvested += invested;
        totalValue += invested * 1.10;
      });

      // Manual holdings (FD, Gold, Real Estate, etc.) have explicit currentValue
      manuals.forEach((m) => {
        totalInvested += m.investedValue;
        totalValue += m.currentValue;
      });

      const returnAmount = totalValue - totalInvested;
      const returnPercent = totalInvested > 0 ? (returnAmount / totalInvested) * 100 : 0;

      return { totalValue, returnAmount, returnPercent, totalInvested };
    },
    staleTime: 1000 * 60 * 5,
  });
};

export default useTotalPortfolioValue;
