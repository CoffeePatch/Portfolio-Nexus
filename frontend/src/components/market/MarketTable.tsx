import { useEffect, useState } from "react";
import { getMockStockPrice, getMockCryptoPrice } from "../../api/mock/mockMarketService";
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

  // Load initial "Base" data from our Mock Service
  useEffect(() => {
    const loadData = async () => {
      // Define the assets we want to track
      const stockSymbols = ["RELIANCE", "TCS", "INFY", "HDFCBANK", "ITC", "TATASTEEL"];
      const cryptoIds = ["bitcoin", "ethereum", "solana", "dogecoin"];

      const stockPromises = stockSymbols.map(async (sym) => {
        const data = await getMockStockPrice(sym);
        return {
          id: sym,
          symbol: sym,
          name: sym === "RELIANCE" ? "Reliance Industries" : sym === "TCS" ? "Tata Consultancy Services" : sym === "INFY" ? "Infosys Limited" : sym === "HDFCBANK" ? "HDFC Bank" : sym === "ITC" ? "ITC Limited" : "Tata Steel", // Simple mapping for demo
          basePrice: data.current_price, // This becomes the anchor for the row
          type: 'stock' as const
        };
      });

      const cryptoPromises = cryptoIds.map(async (id) => {
        const data = await getMockCryptoPrice(id);
        return {
          id: id,
          symbol: data.symbol.toUpperCase(),
          name: data.name,
          basePrice: data.current_price,
          type: 'crypto' as const
        };
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
