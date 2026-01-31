import { useSimulatedLivePrice } from "../../hooks/useSimulatedLivePrice";
import { SparklineChart } from "../shared/SparklineChart";

interface MarketRowProps {
  symbol: string;
  name: string;
  basePrice: number; // The "yesterday" price or initial fetch
  volume: number;
  type: 'stock' | 'crypto';
}

export const MarketRow = ({ symbol, name, basePrice, volume, type }: MarketRowProps) => {
  // Each row has its own "Live Connection"
  const { price } = useSimulatedLivePrice(basePrice);

  // Calculate change based on the "Simulated Live" price vs the "Base" price
  const change = price - basePrice;
  const changePercent = (change / basePrice) * 100;
  
  const isPositive = change >= 0;
  const colorClass = isPositive ? "text-emerald-400" : "text-rose-400";
  const bgClass = isPositive ? "bg-emerald-500/5" : "bg-rose-500/5";

  // Generate a fake history array for the sparkline based on the current price
  // In a real app, this would come from the API
  const mockHistory = Array.from({ length: 15 }).map(() => {
    return { v: price * (1 + (Math.random() * 0.1 - 0.05)) };
  });

  return (
    <tr className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors group cursor-pointer">
      {/* Symbol & Name */}
      <td className="py-4 pl-4">
        <div className="flex items-center gap-3">
          <div className={`w-1 h-8 rounded-full ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          <div>
            <div className="font-bold text-slate-200">{symbol}</div>
            <div className="text-xs text-slate-500">{name}</div>
          </div>
        </div>
      </td>

      {/* Mini Chart (Sparkline) */}
      <td className="py-2 w-32">
        <div className="h-10 w-24">
          <SparklineChart 
            data={mockHistory} 
            color={isPositive ? "#34d399" : "#fb7185"} 
          />
        </div>
      </td>

      {/* Live Price */}
      <td className="py-4 text-right">
        <div className={`font-mono font-medium text-sm transition-colors duration-300 ${colorClass}`}>
          {type === 'crypto' ? '$' : '₹'}{price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </td>

      {/* Change % */}
      <td className="py-4 text-right">
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${bgClass} ${colorClass}`}>
          <span>{isPositive ? '+' : ''}{changePercent.toFixed(2)}%</span>
          <span className="material-symbols-outlined text-[10px]">
            {isPositive ? 'trending_up' : 'trending_down'}
          </span>
        </div>
      </td>

      {/* Volume */}
      <td className="py-4 text-right pr-4 hidden md:table-cell">
        <div className="text-xs text-slate-400 font-mono">
          {(volume / 1000000).toFixed(2)}M
        </div>
      </td>
      
      {/* Actions (Hover only) */}
      <td className="py-4 text-right pr-4 w-10">
         <button className="text-slate-600 hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined">more_vert</span>
         </button>
      </td>
    </tr>
  );
};
