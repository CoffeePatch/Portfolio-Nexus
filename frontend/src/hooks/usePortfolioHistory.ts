import { useQuery } from "@tanstack/react-query";
import { getPortfolioHistory } from "../api/portfolioService";

export type PortfolioHistoryPoint = {
  date: string;
  value: number;
  timestamp: string;
};

export const usePortfolioHistory = (period: string = "1M") => {
  return useQuery({
    queryKey: ["portfolioHistory", period],
    queryFn: () => getPortfolioHistory(period),

    // Transform the backend data to the format Recharts needs
    select: (data) =>
      data.map((point) => ({
        date: new Date(point.snapshotDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        value: point.totalValue,
        timestamp: new Date(point.snapshotDate).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      })),
  });
};
