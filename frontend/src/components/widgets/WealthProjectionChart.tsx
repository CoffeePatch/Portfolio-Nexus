import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export const WealthProjectionChart = () => {
  // 1. State for the "What-If" sliders
  const [monthlyContribution, setMonthlyContribution] = useState(25000);
  const [expectedReturn, setExpectedReturn] = useState(12); // 12% CAGR
  const [years, setYears] = useState(10);
  const [initialCorpus] = useState(1000000); // Start with 10 Lakhs

  // 2. Real-time Calculation Engine
  const projectionData = useMemo(() => {
    const data: { year: number; invested: number; wealth: number }[] = [];
    let currentWealth = initialCorpus;
    let totalInvested = initialCorpus;

    const currentYear = new Date().getFullYear();

    for (let i = 0; i <= years; i++) {
      data.push({
        year: currentYear + i,
        invested: Math.round(totalInvested),
        wealth: Math.round(currentWealth),
      });

      // Calculate next year's value
      // Future Value = (Current + Annual Contribution) * Growth Rate
      const annualContribution = monthlyContribution * 12;
      currentWealth =
        (currentWealth + annualContribution) * (1 + expectedReturn / 100);
      totalInvested += annualContribution;
    }
    return data;
  }, [monthlyContribution, expectedReturn, years, initialCorpus]);

  const finalValue = projectionData[projectionData.length - 1].wealth;
  const finalInvested = projectionData[projectionData.length - 1].invested;
  const totalGain = finalValue - finalInvested;

  return (
    <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-slate-800/50 shadow-xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Controls */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Wealth Projector</h3>
            <p className="text-sm text-slate-400">
              Simulate your financial freedom
            </p>
          </div>

          {/* Slider 1: Monthly Savings */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Monthly Savings</span>
              <span className="text-indigo-400 font-mono font-bold">
                ₹{monthlyContribution.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="200000"
              step="1000"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          {/* Slider 2: Expected Return */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Expected Return (CAGR)</span>
              <span className="text-emerald-400 font-mono font-bold">
                {expectedReturn}%
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="25"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Slider 3: Time Period */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Time Period</span>
              <span className="text-blue-400 font-mono font-bold">
                {years} Years
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Result Summary Box */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 mt-4">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">
              Projected Wealth
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              ₹{(finalValue / 10000000).toFixed(2)} Cr
            </div>

            <div className="flex justify-between text-xs pt-3 border-t border-slate-800">
              <span className="text-slate-500">
                Invested: {" "}
                <span className="text-slate-300">
                  ₹{(finalInvested / 10000000).toFixed(2)} Cr
                </span>
              </span>
              <span className="text-slate-500">
                Gain: {" "}
                <span className="text-green-400">
                  ₹{(totalGain / 10000000).toFixed(2)} Cr
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Chart */}
        <div className="w-full lg:w-2/3 min-h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={projectionData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="colorInvested"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="year" stroke="#475569" tick={{ fill: "#475569" }} />
              <YAxis
                stroke="#475569"
                tick={{ fill: "#475569", fontSize: 10 }}
                tickFormatter={(value) => `₹${value / 100000}L`}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#1e293b",
                  color: "#f8fafc",
                }}
                formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="wealth"
                name="Projected Value"
                stroke="#6366f1"
                fillOpacity={1}
                fill="url(#colorWealth)"
                strokeWidth={3}
              />
              <Area
                type="monotone"
                dataKey="invested"
                name="Principal Invested"
                stroke="#94a3b8"
                fillOpacity={1}
                fill="url(#colorInvested)"
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
