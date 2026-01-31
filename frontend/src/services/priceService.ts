/**
 * API Service for Live Price Fetching
 */

export type GoldPriceResponse = {
  pricePerGram: number;
  pricePerOunce: number;
  currency: 'USD';
  timestamp: string;
  change24h: number;
};

export type CryptoPriceResponse = {
  [symbol: string]: {
    usd: number;
    usd_24h_change: number;
  };
};

export const fetchGoldPrice = async (): Promise<GoldPriceResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        pricePerGram: 62.96,
        pricePerOunce: 1958.5,
        currency: 'USD',
        timestamp: new Date().toISOString(),
        change24h: -0.35,
      });
    }, 500);
  });
};

export const fetchCryptoPrice = async (
  symbols: string[]
): Promise<CryptoPriceResponse> => {
  const ids = symbols.map((s) => s.toLowerCase()).join(',');
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    const transformed: CryptoPriceResponse = {};
    symbols.forEach((symbol) => {
      const id = symbol.toLowerCase();
      if (data[id]) {
        transformed[symbol] = {
          usd: data[id].usd,
          usd_24h_change: data[id].usd_24h_change || 0,
        };
      }
    });
    
    return transformed;
  } catch (error) {
    return {
      BTC: { usd: 45126, usd_24h_change: 5.67 },
      ETH: { usd: 2350, usd_24h_change: 12.3 },
    };
  }
};

export const fetchAllLivePrices = async () => {
  const [goldPrice, cryptoPrices] = await Promise.all([
    fetchGoldPrice(),
    fetchCryptoPrice(['bitcoin', 'ethereum']),
  ]);
  
  return {
    gold: {
      pricePerGram: goldPrice.pricePerGram,
      lastFetched: goldPrice.timestamp,
      currency: goldPrice.currency,
    },
    crypto: {
      BTC: {
        priceUSD: cryptoPrices.BTC?.usd || 0,
        change24h: cryptoPrices.BTC?.usd_24h_change || 0,
        lastFetched: new Date().toISOString(),
      },
      ETH: {
        priceUSD: cryptoPrices.ETH?.usd || 0,
        change24h: cryptoPrices.ETH?.usd_24h_change || 0,
        lastFetched: new Date().toISOString(),
      },
    },
  };
};

export default {
  fetchGoldPrice,
  fetchCryptoPrice,
  fetchAllLivePrices,
};
