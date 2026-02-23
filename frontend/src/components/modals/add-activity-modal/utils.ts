import { marketAssetClasses } from "./constants";
import type { InvestAssetClass } from "./types";

export const toLocalDateTimeInputValue = () => {
  const date = new Date();
  const offsetMs = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
};

export const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);

export const isMarketAsset = (assetClass: InvestAssetClass) =>
  marketAssetClasses.includes(assetClass);

export const calculateUnits = (amount: string, pricePerUnit: string) => {
  const parsedAmount = Number(amount);
  const parsedPrice = Number(pricePerUnit);

  if (!parsedAmount || !parsedPrice || parsedPrice <= 0) {
    return "";
  }

  return (parsedAmount / parsedPrice).toFixed(6);
};
