import { marketDataClient } from "./client";

export type StockPrice = {
  symbol: string;
  current_price: number;
  change_24h: number;
  change_percent_24h: number;
  high_24h: number;
  low_24h: number;
  volume_24h: number;
  market_cap?: number;
  timestamp: string;
};

export type MutualFundPrice = {
  scheme_code: string;
  scheme_name: string;
  nav: number;
  date: string;
};

export type CryptoPrice = {
  coin_id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
};

export type AiSearchResponse = {
  response: string;
  timestamp: string;
};

export type MarketSearchType = "stock" | "mutual_fund" | "crypto";

export type MarketSearchResult = {
  symbol: string;
  name: string;
  type: MarketSearchType;
};

export const getStockPrice = async (symbol: string): Promise<StockPrice> => {
  try {
    const response = await marketDataClient.get(`/price/stock/${symbol}`);
    const data = response.data;

    // Safely map the Python response to the React TypeScript interface
    return {
      symbol: data.symbol,
      current_price: data.price, // Safely mapping 'price' to 'current_price'
      change_24h: 0,             // Safe fallback until backend provides this
      change_percent_24h: 0,     // Safe fallback
      high_24h: data.price,      // Safe fallback
      low_24h: data.price,       // Safe fallback
      volume_24h: 0,             // Safe fallback
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Failed to fetch live data for ${symbol}`, error);
    throw error;
  }
};

export const getMutualFundPrice = async (
  schemeCode: string
): Promise<MutualFundPrice> => {
  const response = await marketDataClient.get(`/price/mf/${schemeCode}`);
  return response.data;
};

export const getCryptoPrice = async (coinId: string): Promise<CryptoPrice> => {
  const response = await marketDataClient.get(`/price/crypto/${coinId}`);
  return response.data;
};

export const searchAi = async (message: string): Promise<AiSearchResponse> => {
  const response = await marketDataClient.post("/v1/ds/message", {
    message,
  });
  return response.data;
};

const normalizeSearchResult = (
  item: Record<string, unknown>,
  type: MarketSearchType
): MarketSearchResult | null => {
  if (type === "stock") {
    const symbol = String(item.displaySymbol ?? item.symbol ?? "").trim();
    const name = String(item.description ?? item.name ?? symbol).trim();

    if (!symbol) {
      return null;
    }

    return { symbol, name, type };
  }

  if (type === "mutual_fund") {
    const symbol = String(item.code ?? item.scheme_code ?? item.symbol ?? "").trim();
    const name = String(item.name ?? item.scheme_name ?? symbol).trim();

    if (!symbol) {
      return null;
    }

    return { symbol, name, type };
  }

  const symbol = String(item.symbol ?? item.id ?? "").trim();
  const name = String(item.name ?? symbol).trim();

  if (!symbol) {
    return null;
  }

  return { symbol, name, type };
};

export const searchMarketInstruments = async (
  query: string,
  type: MarketSearchType
): Promise<MarketSearchResult[]> => {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const endpointByType: Record<MarketSearchType, string> = {
    stock: "/search/stock",
    mutual_fund: "/search/mf",
    crypto: "/search/crypto",
  };

  try {
    const response = await marketDataClient.get(endpointByType[type], {
      params: { q: trimmedQuery },
    });

    const rawItems: unknown[] = Array.isArray(response.data)
      ? response.data
      : Array.isArray(response.data?.results)
        ? response.data.results
        : [];

    return rawItems
      .map((item: unknown): MarketSearchResult | null =>
        normalizeSearchResult((item ?? {}) as Record<string, unknown>, type)
      )
      .filter((item: MarketSearchResult | null): item is MarketSearchResult => item !== null)
      .slice(0, 8);
  } catch (error) {
    console.error(`Search failed for ${type} query "${trimmedQuery}"`, error);
    return [];
  }
};
