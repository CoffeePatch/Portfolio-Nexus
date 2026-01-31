import { LineChart, Line, ResponsiveContainer } from "recharts";
import { mockFunds } from "../../data/mockMutualFundData";

export const FundHoldingsTable = () => {
  const funds = mockFunds;

  return (
    <div className="rounded-3xl border border-white/10 bg-black/70 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Your Holdings</h3>
        <button className="text-sm font-medium text-blue-400 hover:text-blue-300">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="h-[320px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs font-bold uppercase tracking-wider text-slate-500">
              <th className="py-4 pl-2">Fund Name</th>
              <th className="py-4">Category</th>
              <th className="py-4 text-right">NAV</th>
              <th className="py-4 text-right">Units</th>
              <th className="py-4 text-right">Value</th>
              <th className="py-4 text-right">XIRR</th>
              <th className="py-4 text-right pr-2">7D Trend</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-300">
            {funds.map((fund) => (
              <tr 
                key={fund.id} 
                className="group border-b border-white/5 transition-colors hover:bg-white/5 last:border-none"
              >
                {/* Fund Name */}
                <td className="py-4 pl-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-slate-300">
                      {fund.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{fund.name}</p>
                      <p className="text-xs text-slate-500">{fund.subCategory}</p>
                    </div>
                  </div>
                </td>

                {/* Category Badge */}
                <td className="py-4">
                  <span className="inline-block rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs font-medium text-slate-300">
                    {fund.category}
                  </span>
                </td>

                {/* NAV */}
                <td className="py-4 text-right font-medium text-slate-200">
                  ₹{fund.nav.toFixed(2)}
                </td>

                {/* Units */}
                <td className="py-4 text-right text-slate-400">
                  {fund.units.toFixed(2)}
                </td>

                {/* Current Value */}
                <td className="py-4 text-right">
                  <div className="font-bold text-white">
                    ₹{fund.currentValue.toLocaleString()}
                  </div>
                  <div className="text-xs text-green-400">
                    +₹{(fund.currentValue - fund.investedAmount).toLocaleString()}
                  </div>
                </td>

                {/* XIRR */}
                <td className="py-4 text-right font-bold text-green-400">
                  {fund.xirr}%
                </td>

                {/* Sparkline Chart */}
                <td className="py-4 pr-2">
                  <div className="ml-auto h-10 w-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={fund.trend.map((val, i) => ({ i, val }))}>
                        <Line
                          type="monotone"
                          dataKey="val"
                          stroke={fund.xirr >= 0 ? "#10b981" : "#ef4444"}
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};
