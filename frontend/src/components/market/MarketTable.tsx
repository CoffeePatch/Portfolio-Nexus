import { useEffect, useState } from "react";
import { getStockPrice, getCryptoPrice } from "../../api/marketDataService";
import { MarketRow } from "./MarketRow";

// Define what we display
interface MarketItem {
  id: string;
  symbol: string;
  name: string;
  basePrice: number;
  type: 'stock' | 'crypto';
}

export const MarketTable = () => {
  const [items, setItems] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load initial data from real market data service
  useEffect(() => {
    const loadData = async () => {
      const stockSymbols = ["RELIANCE", "TCS", "INFY", "HDFCBANK", "ITC", "TATASTEEL"];
      const cryptoIds = ["bitcoin", "ethereum", "solana"];

      const nameMap: Record<string, string> = {
        RELIANCE: "Reliance Industries", TCS: "Tata Consultancy Services",
        INFY: "Infosys Limited", HDFCBANK: "HDFC Bank", ITC: "ITC Limited", TATASTEEL: "Tata Steel",
      };

      // Fallback prices if API fails
      const fallbackStock: Record<string, number> = {
        RELIANCE: 2540, TCS: 3650, INFY: 1550, HDFCBANK: 1680, ITC: 455, TATASTEEL: 125,
      };
      const fallbackCrypto: Record<string, number> = {
        bitcoin: 5950000, ethereum: 235000, solana: 5200,
      };

      const stockPromises = stockSymbols.map(async (sym) => {
        try {
          const data = await getStockPrice(sym);
          return { id: sym, symbol: sym, name: nameMap[sym] || sym, basePrice: data.current_price, type: 'stock' as const };
        } catch {
          return { id: sym, symbol: sym, name: nameMap[sym] || sym, basePrice: fallbackStock[sym] || 500, type: 'stock' as const };
        }
      });

      const cryptoPromises = cryptoIds.map(async (id) => {
        try {
          const data = await getCryptoPrice(id);
          return { id, symbol: data.symbol?.toUpperCase() || id.toUpperCase(), name: data.name || id, basePrice: data.current_price, type: 'crypto' as const };
        } catch {
          return { id, symbol: id.toUpperCase(), name: id, basePrice: fallbackCrypto[id] || 1000, type: 'crypto' as const };
        }
      });

      const allData = await Promise.all([...stockPromises, ...cryptoPromises]);
      setItems(allData);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-500 animate-pulse">Loading market feed...</div>;
  }

  return (
    <div className="w-full bg-[#0a0a0a] rounded-xl border border-slate-800/50 overflow-hidden shadow-2xl">
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/20 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-200">Live Market</h3>
        <div className="flex gap-2">
            <button className="px-3 py-1 text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full hover:bg-indigo-500/20 transition">All</button>
            <button className="px-3 py-1 text-xs text-slate-400 hover:text-slate-200 transition">Stocks</button>
            <button className="px-3 py-1 text-xs text-slate-400 hover:text-slate-200 transition">Crypto</button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-900/10">
              <th className="px-4 py-3">Asset</th>
              <th className="px-4 py-3">Trend (7d)</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">24h %</th>
              <th className="px-4 py-3 text-right hidden md:table-cell">Vol</th>
              <th className="px-4 py-3 text-right w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {items.map((item) => (
              <MarketRow 
                key={item.id}
                symbol={item.symbol}
                name={item.name}
                basePrice={item.basePrice}
                volume={Math.random() * 50000000 + 1000000} // Mock volume for now
                type={item.type}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
