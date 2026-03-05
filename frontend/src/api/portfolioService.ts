import { portfolioClient } from "./client";

export type StockHolding = {
  id: number;
  externalId: string;
  userId: string;
  symbol: string;
  exchange: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
  createdAt: string;
  updatedAt: string;
};

export type MutualFundHolding = {
  id: number;
  externalId: string;
  userId: string;
  schemeCode: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
  createdAt: string;
  updatedAt: string;
};

export type CryptoHolding = {
  id: number;
  externalId: string;
  userId: string;
  coinId: string;
  symbol: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
  createdAt: string;
  updatedAt: string;
};

export type ManualHolding = {
  id: number;
  externalId: string;
  userId: string;
  assetName: string;
  assetType: string;
  investedValue: number;
  currentValue: number;
  purchaseDate: string;
  maturityDate: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PortfolioHistory = {
  id: number;
  userId: string;
  snapshotDate: string;
  totalValue: number;
};

export const getStockHoldings = async (): Promise<StockHolding[]> => {
  const response = await portfolioClient.get("/portfolio/v1/stocks");
  return response.data;
};

export const getMutualFundHoldings = async (): Promise<MutualFundHolding[]> => {
  const response = await portfolioClient.get("/portfolio/v1/mutual-funds");
  return response.data;
};

export const getCryptoHoldings = async (): Promise<CryptoHolding[]> => {
  const response = await portfolioClient.get("/portfolio/v1/cryptos");
  return response.data;
};

export const getManualHoldings = async (): Promise<ManualHolding[]> => {
  const response = await portfolioClient.get("/portfolio/v1/manuals");
  return response.data;
};

export const getAllHoldings = async () => {
  const [stocks, mutualFunds, cryptos, manuals] = await Promise.all([
    getStockHoldings(),
    getMutualFundHoldings(),
    getCryptoHoldings(),
    getManualHoldings(),
  ]);

  return { stocks, mutualFunds, cryptos, manuals };
};

export const getPortfolioHistory = async (
  period: string = "1M"
): Promise<PortfolioHistory[]> => {
  const response = await portfolioClient.get("/portfolio/v1/history", {
    params: { period },
  });
  return response.data;
};

/* ------------------------------------------------------------------ */
/*  Request DTOs — mirrors the Java @RequestBody classes exactly      */
/* ------------------------------------------------------------------ */

export type StockHoldingRequestDto = {
  symbol: string;
  exchange: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string; // "YYYY-MM-DD"
};

export type MutualFundHoldingRequestDto = {
  schemeCode: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
};

export type CryptoHoldingRequestDto = {
  coinId: string;
  symbol: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
};

export type ManualHoldingRequestDto = {
  assetName: string;
  assetType: string; // "FD" | "Real Estate" | "Gold" etc.
  investedValue: number;
  currentValue: number;
  purchaseDate: string;
  maturityDate: string | null;
};

/* ------------------------------------------------------------------ */
/*  POST — create holdings (persist to MySQL via portfolioService)    */
/* ------------------------------------------------------------------ */

export const addStockHolding = async (
  dto: StockHoldingRequestDto
): Promise<StockHolding> => {
  const response = await portfolioClient.post("/portfolio/v1/stock", dto);
  return response.data;
};

export const addMutualFundHolding = async (
  dto: MutualFundHoldingRequestDto
): Promise<MutualFundHolding> => {
  const response = await portfolioClient.post("/portfolio/v1/mutual-fund", dto);
  return response.data;
};

export const addCryptoHolding = async (
  dto: CryptoHoldingRequestDto
): Promise<CryptoHolding> => {
  const response = await portfolioClient.post("/portfolio/v1/crypto", dto);
  return response.data;
};

export const addManualHolding = async (
  dto: ManualHoldingRequestDto
): Promise<ManualHolding> => {
  const response = await portfolioClient.post("/portfolio/v1/manual", dto);
  return response.data;
};

/* ------------------------------------------------------------------ */
/*  DELETE — remove holdings                                          */
/* ------------------------------------------------------------------ */

export const deleteStockHolding = async (externalId: string): Promise<void> => {
  await portfolioClient.delete(`/portfolio/v1/stock/${externalId}`);
};

export const deleteMutualFundHolding = async (externalId: string): Promise<void> => {
  await portfolioClient.delete(`/portfolio/v1/mutual-fund/${externalId}`);
};

export const deleteCryptoHolding = async (externalId: string): Promise<void> => {
  await portfolioClient.delete(`/portfolio/v1/crypto/${externalId}`);
};

export const deleteManualHolding = async (externalId: string): Promise<void> => {
  await portfolioClient.delete(`/portfolio/v1/manual/${externalId}`);
};
