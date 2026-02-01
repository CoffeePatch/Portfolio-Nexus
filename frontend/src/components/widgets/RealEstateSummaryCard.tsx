// src/components/widgets/RealEstateSummaryCard.tsx
// Matches CryptoSummaryCard layout

import React from "react";

interface StatBlockProps {
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}

const StatBlock: React.FC<StatBlockProps> = ({
  label,
  value,
  change,
  changeType = "neutral",
}) => {
  const changeColors = {
    positive: "text-emerald-400",
    negative: "text-red-400",
    neutral: "text-gray-400",
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium tracking-wide text-white/50 uppercase">
        {label}
      </span>
      <span className="text-lg font-semibold text-white">{value}</span>
      {change && (
        <span className={`text-sm font-medium ${changeColors[changeType]}`}>
          {change}
        </span>
      )}
    </div>
  );
};

interface RealEstateSummaryCardProps {
  portfolioValue: number;
  totalInvestment: number;
  totalAppreciation: number;
  appreciationPercent: number;
  netEquity: number;
  monthlyRental: number;
  totalProperties: number;
}

export const RealEstateSummaryCard: React.FC<RealEstateSummaryCardProps> = ({
  portfolioValue,
  totalInvestment,
  totalAppreciation,
  appreciationPercent,
  netEquity,
  monthlyRental,
  totalProperties,
}) => {
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const formatCrores = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    } else if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} L`;
    }
    return formatCurrency(val);
  };

  const formatPercent = (val: number) =>
    `${val >= 0 ? "+" : ""}${val.toFixed(2)}%`;

  const isGainPositive = totalAppreciation >= 0;

  return (
    <div className="grid grid-cols-6 gap-4">
      <StatBlock
        label="Portfolio Value"
        value={formatCrores(portfolioValue)}
        change={`${totalProperties} Properties`}
        changeType="neutral"
      />
      <StatBlock
        label="Invested"
        value={formatCrores(totalInvestment)}
      />
      <StatBlock
        label="Total Appreciation"
        value={`${isGainPositive ? "+" : ""}${formatCrores(totalAppreciation)}`}
        changeType={isGainPositive ? "positive" : "negative"}
      />
      <StatBlock
        label="Returns"
        value={formatPercent(appreciationPercent)}
        changeType={appreciationPercent >= 0 ? "positive" : "negative"}
      />
      <StatBlock
        label="Net Equity"
        value={formatCrores(netEquity)}
        change="After Mortgages"
        changeType="neutral"
      />
      <StatBlock
        label="Monthly Rental"
        value={formatCurrency(monthlyRental)}
        change="Passive Income"
        changeType="positive"
      />
    </div>
  );
};

export default RealEstateSummaryCard;
