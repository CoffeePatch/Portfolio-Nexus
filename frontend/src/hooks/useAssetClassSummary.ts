import { useQuery } from "@tanstack/react-query";
import { getAllHoldings } from "../api/portfolioService";

export type AssetClassSummary = {
  type: string;
  icon: string;
  totalValue: number;
  totalInvested: number;
  gainLoss: number;
  gainLossPercent: number;
  count: number;
};

const makeSummary = (
  type: string,
  icon: string,
  totalInvested: number,
  totalValue: number,
  count: number
): AssetClassSummary => {
  const gainLoss = totalValue - totalInvested;
  const gainLossPercent = totalInvested > 0 ? (gainLoss / totalInvested) * 100 : 0;
  return { type, icon, totalValue, totalInvested, gainLoss, gainLossPercent, count };
};

export const useAssetClassSummary = () => {
  return useQuery({
    queryKey: ["assetClassSummary"],
    queryFn: async () => {
      const { stocks, mutualFunds, cryptos, manuals } = await getAllHoldings();
      const summaries: AssetClassSummary[] = [];

      if (stocks.length > 0) {
        let inv = 0, val = 0;
        stocks.forEach((s) => { const c = s.quantity * s.purchasePrice; inv += c; val += c * 1.05; });
        summaries.push(makeSummary("Stocks", "show_chart", inv, val, stocks.length));
      }

      if (cryptos.length > 0) {
        let inv = 0, val = 0;
        cryptos.forEach((c) => { const cost = c.quantity * c.purchasePrice; inv += cost; val += cost * 1.10; });
        summaries.push(makeSummary("Crypto", "currency_bitcoin", inv, val, cryptos.length));
      }

      if (mutualFunds.length > 0) {
        let inv = 0, val = 0;
        mutualFunds.forEach((mf) => { const cost = mf.quantity * mf.purchasePrice; inv += cost; val += cost * 1.08; });
        summaries.push(makeSummary("Mutual Funds", "pie_chart", inv, val, mutualFunds.length));
      }

      if (manuals.length > 0) {
        const iconMap: Record<string, string> = {
          Gold: "diamond", Silver: "diamond", "Real Estate": "home",
          NPS: "savings", Bond: "account_balance", FD: "savings",
        };
        const byType: Record<string, typeof manuals> = {};
        manuals.forEach((m) => { (byType[m.assetType] ??= []).push(m); });

        Object.entries(byType).forEach(([assetType, assets]) => {
          const inv = assets.reduce((s, a) => s + a.investedValue, 0);
          const val = assets.reduce((s, a) => s + a.currentValue, 0);
          summaries.push(makeSummary(assetType, iconMap[assetType] || "account_balance", inv, val, assets.length));
        });
      }

      return summaries;
    },
    staleTime: 1000 * 60 * 5,
  });
};
