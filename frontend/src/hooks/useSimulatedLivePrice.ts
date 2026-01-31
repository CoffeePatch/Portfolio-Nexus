import { useState, useEffect } from "react";

/**
 * Simulates a live price feed update locally.
 * Returns a price that fluctuates slightly around the initial value.
 * @param initialPrice The starting price (e.g., from API)
 * @param refreshIntervalMs How often to update in ms (default 3000ms)
 * @param volatility How much the price moves (default 0.2%)
 */
export const useSimulatedLivePrice = (
  initialPrice: number,
  refreshIntervalMs: number = 3000,
  volatility: number = 0.002
) => {
  const [price, setPrice] = useState(initialPrice);
  const [trend, setTrend] = useState<"up" | "down" | "neutral">("neutral");

  useEffect(() => {
    // If initial price changes (e.g. data loaded), reset
    setPrice(initialPrice);
  }, [initialPrice]);

  useEffect(() => {
    if (initialPrice === 0) return;

    const interval = setInterval(() => {
      setPrice((prev) => {
        // Random change: +/- volatility
        const change = prev * volatility * (Math.random() - 0.5); 
        const newPrice = prev + change;
        
        // Determine trend for UI coloring (Green/Red)
        setTrend(newPrice > prev ? "up" : "down");
        
        return newPrice;
      });
    }, refreshIntervalMs);

    return () => clearInterval(interval);
  }, [initialPrice, refreshIntervalMs, volatility]);

  return { price, trend };
};
