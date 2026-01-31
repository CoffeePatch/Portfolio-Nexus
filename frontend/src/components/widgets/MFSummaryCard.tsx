import { mockPortfolioSummary } from "../../data/mockMutualFundData";

export const MFSummaryCard = () => {
  const data = mockPortfolioSummary;

  const StatBlock = ({ label, value, change, isPositive = true }: any) => (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
        <span className={`text-[10px] ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
          {change}
        </span>
      </div>
      <div className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
        {value}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-8 pt-4 md:grid-cols-4">
      <StatBlock 
        label="My Portfolio" 
        value={`₹${data.totalCurrentValue.toLocaleString()}`} 
        change="▲ +24%"
      />
      <StatBlock 
        label="Invested" 
        value={`₹${data.totalInvested.toLocaleString()}`} 
        change="▲ +18%"
      />
      <StatBlock 
        label="Total Gain" 
        value={`₹${data.totalGain.toLocaleString()}`} 
        change="+22%"
      />
      <StatBlock 
        label="XIRR" 
        value={`${data.xirr}%`} 
        change="Anl."
      />
    </div>
  );
};
