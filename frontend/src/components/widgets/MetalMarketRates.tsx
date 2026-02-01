import { currentMarketPrices, storageDistribution } from '../../data/mockMetalsData';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const MetalMarketRates = () => {
  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold text-white mb-4">Live Market Rates</h3>
      <p className="text-[10px] text-slate-500 -mt-3 mb-4">Per gram • Updated just now</p>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
          <div className="flex items-center gap-3">
            <span className="text-xl">🥇</span>
            <div>
              <p className="text-sm font-medium text-white">Gold 24K</p>
              <p className="text-xs text-slate-500">Pure Gold</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-yellow-400">₹{currentMarketPrices.gold24K.toLocaleString()}</p>
            <p className="text-[10px] text-emerald-400">▲ +0.8%</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-yellow-500/5 border border-white/5">
          <div className="flex items-center gap-3">
            <span className="text-xl">🥇</span>
            <div>
              <p className="text-sm font-medium text-white">Gold 22K</p>
              <p className="text-xs text-slate-500">Jewelry Gold</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-yellow-300">₹{currentMarketPrices.gold22K.toLocaleString()}</p>
            <p className="text-[10px] text-emerald-400">▲ +0.7%</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-500/10 border border-slate-500/20">
          <div className="flex items-center gap-3">
            <span className="text-xl">🥈</span>
            <div>
              <p className="text-sm font-medium text-white">Silver 999</p>
              <p className="text-xs text-slate-500">Pure Silver</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-slate-300">₹{currentMarketPrices.silver999}</p>
            <p className="text-[10px] text-emerald-400">▲ +1.2%</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center gap-3">
            <span className="text-xl">💎</span>
            <div>
              <p className="text-sm font-medium text-white">Platinum</p>
              <p className="text-xs text-slate-500">999 Fine</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-300">₹{currentMarketPrices.platinum.toLocaleString()}</p>
            <p className="text-[10px] text-emerald-400">▲ +0.5%</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <h4 className="text-xs font-medium text-slate-400 mb-3">Storage Summary</h4>
        <div className="space-y-2">
          {storageDistribution.map((storage) => (
            <div key={storage.location} className="flex items-center justify-between text-xs">
              <span className="text-slate-400">{storage.location}</span>
              <div className="text-right">
                <span className="text-white font-medium">{formatCurrency(storage.value)}</span>
                <span className="text-slate-500 ml-2">({storage.count} items)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
