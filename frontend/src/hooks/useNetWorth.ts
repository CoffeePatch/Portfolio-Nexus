import { useMemo } from "react";
import { useTotalPortfolioValue } from "./useTotalPortfolioValue";
import { useExpenses } from "./useExpenses";

export type NetWorthData = {
  netWorth: number;
  totalAssets: number;
  totalLiabilities: number;
  changeAmount: number;
  changePercent: number;
};

export type UseNetWorthReturn = {
  data: NetWorthData | null;
  isLoading: boolean;
  isError: boolean;
};

export const useNetWorth = (): UseNetWorthReturn => {
  const {
    data: portfolioValue,
    isLoading: loadingPortfolio,
    isError: portfolioError,
  } = useTotalPortfolioValue();
  
  const {
    data: expenses,
    isLoading: loadingExpenses,
    isError: expensesError,
  } = useExpenses();

  const data = useMemo(() => {
    // If portfolio data is not available, return null
    if (!portfolioValue) return null;

    // Total Assets from portfolio
    const totalAssets = portfolioValue.totalValue || 0;

    // Total Liabilities from expenses (treat as 0 if expenses fail to load)
    const totalLiabilities = expenses?.reduce((sum, expense) => {
      return sum + expense.amount;
    }, 0) || 0;

    // Calculate Net Worth
    const netWorth = totalAssets - totalLiabilities;

    // Calculate 24h change (using portfolio return for now)
    const changeAmount = portfolioValue.returnAmount || 0;
    const changePercent = portfolioValue.returnPercent || 0;

    return {
      netWorth,
      totalAssets,
      totalLiabilities,
      changeAmount,
      changePercent,
    };
  }, [portfolioValue, expenses]);

  return {
    data,
    isLoading: loadingPortfolio || loadingExpenses,
    // Only error if portfolio fails (expenses are optional)
    isError: portfolioError,
  };
};
