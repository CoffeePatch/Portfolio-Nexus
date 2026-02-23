export type ModalTab = "transaction" | "transfer" | "invest";

export type MessageTone = "success" | "error";

export type TransactionType = "IN" | "OUT";

export type InvestAssetClass =
  | "Mutual Fund"
  | "Stock"
  | "Crypto"
  | "Fixed Deposit"
  | "Real Estate";

export type TransactionEntry = {
  id: string;
  internalTags: string[];
  dateTime: string;
  account: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  tags: string;
  notes: string;
};

export type TransferEntry = {
  id: string;
  internalTags: string[];
  dateTime: string;
  title: string;
  amount: number;
  outAccount: string;
  inAccount: string;
  category: string;
  tags: string;
  notes: string;
};

export type InvestmentEntry = {
  id: string;
  internalTags: string[];
  dateTime: string;
  outAccount: string;
  assetClass: InvestAssetClass;
  assetName: string;
  amount: number;
  pricePerUnit?: number;
  units?: number;
  expectedRoi?: number;
  maturityDate?: string;
  tags: string;
  notes: string;
};

export type MarketInstrument = {
  symbol: string;
  name: string;
  assetClass: "Mutual Fund" | "Stock" | "Crypto";
  mockPrice: number;
};

export type TransactionForm = {
  dateTime: string;
  account: string;
  title: string;
  amount: string;
  type: TransactionType;
  category: string;
  tags: string;
  notes: string;
};

export type TransferForm = {
  dateTime: string;
  title: string;
  amount: string;
  outAccount: string;
  inAccount: string;
  category: string;
  tags: string;
  notes: string;
};

export type InvestForm = {
  dateTime: string;
  outAccount: string;
  assetClass: InvestAssetClass;
  searchQuery: string;
  selectedSymbol: string;
  investmentAmount: string;
  pricePerUnit: string;
  units: string;
  unitsManuallyEdited: boolean;
  assetName: string;
  expectedRoi: string;
  maturityDate: string;
  tags: string;
  notes: string;
};
