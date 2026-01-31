// src/components/widgets/CryptoSummaryCard.tsx
// Matches StockSummaryCard / MFSummaryCard layout

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

interface CryptoSummaryCardProps {
  currentValue: number;
  investedAmount: number;
  totalGain: number;
  totalReturnPercent: number;
  dayPnL: number;
  dayPnLPercent: number;
}

const CryptoSummaryCard: React.FC<CryptoSummaryCardProps> = ({
  currentValue,
  investedAmount,
  totalGain,
  totalReturnPercent,
  dayPnL,
  dayPnLPercent,
}) => {
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const formatPercent = (val: number) =>
    `${val >= 0 ? "+" : ""}${val.toFixed(2)}%`;

  const isGainPositive = totalGain >= 0;
  const isDayPositive = dayPnL >= 0;

  return (
    <div className="grid grid-cols-4 gap-4">
      <StatBlock
        label="My Portfolio"
        value={formatCurrency(currentValue)}
        change={`Day: ${isDayPositive ? "+" : ""}${formatCurrency(dayPnL)} (${formatPercent(dayPnLPercent)})`}
        changeType={isDayPositive ? "positive" : "negative"}
      />
      <StatBlock
        label="Invested"
        value={formatCurrency(investedAmount)}
      />
      <StatBlock
        label="Total Gain"
        value={`${isGainPositive ? "+" : ""}${formatCurrency(totalGain)}`}
        changeType={isGainPositive ? "positive" : "negative"}
      />
      <StatBlock
        label="Returns"
        value={formatPercent(totalReturnPercent)}
        changeType={totalReturnPercent >= 0 ? "positive" : "negative"}
      />
    </div>
  );
};

export default CryptoSummaryCard;
