import { useSimulatedLivePrice } from "../../hooks/useSimulatedLivePrice";

// Internal component for a single ticker item
const TickerItem = ({ basePrice, label }: { symbol: string, basePrice: number, label: string }) => {
  const { price, trend } = useSimulatedLivePrice(basePrice, 5000, 0.001); // Slower updates for indices
  
  const color = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-slate-400';
  const icon = trend === 'up' ? '▲' : trend === 'down' ? '▼' : '-';

  return (
    <div className="flex items-center gap-2 px-6 border-r border-slate-800/50">
      <span className="font-bold text-slate-300 text-xs tracking-wider">{label}</span>
      <span className={`text-xs font-mono font-medium ${color}`}>
        {price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
      <span className={`text-[10px] ${color}`}>{icon}</span>
    </div>
  );
};

export const MarketTicker = () => {
  // Hardcoded indices for the top tape
  const indices = [
    { symbol: "NIFTY", label: "NIFTY 50", base: 19500 },
    { symbol: "SENSEX", label: "SENSEX", base: 65000 },
    { symbol: "BANKNIFTY", label: "BANK NIFTY", base: 44500 },
    { symbol: "NSDQ", label: "NASDAQ", base: 13500 },
    { symbol: "DOW", label: "DOW JONES", base: 34500 },
    { symbol: "BTC", label: "BITCOIN", base: 5800000 },
    { symbol: "GOLD", label: "GOLD", base: 1950 },
  ];

  return (
    <div className="w-full bg-[#050505] border-b border-slate-800 h-10 overflow-hidden flex items-center relative z-20">
      {/* Gradient masks for smooth fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#050505] to-transparent z-10" />
      
      {/* Sliding Track - Duplicate items for seamless loop */}
      <div className="flex animate-scroll whitespace-nowrap">
        {[...indices, ...indices].map((idx, i) => (
          <TickerItem key={`${idx.symbol}-${i}`} {...idx} basePrice={idx.base} />
        ))}
      </div>
    </div>
  );
};
