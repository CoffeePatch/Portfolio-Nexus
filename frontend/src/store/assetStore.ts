/**
 * Asset Store - State Management for Vault
 * 
 * This store manages the hybrid model:
 * - Manual entry (quantity, weight, estimated value)
 * - Live price fetching (gold, crypto)
 * - Automatic value calculation
 */

export type AssetType = 'GOLD' | 'REAL_ESTATE' | 'CRYPTO';

export type Asset = {
  id: string;
  type: AssetType;
  name: string;
  
  // Manual Entry Fields
  quantity: number; // Sqft for property, Grams for gold, Coins for crypto
  buyPrice: number; // Original purchase price per unit
  purchaseDate: string;
  
  // Calculated/Fetched Fields
  currentPricePerUnit: number; // Live price (gold/crypto) or manual (real estate)
  currentValue: number; // quantity × currentPricePerUnit
  lastUpdated: string;
  
  // Optional Fields
  linkedLoanId?: string; // Link to a liability
  location?: string; // For real estate
  notes?: string;
  updateReminder?: {
    enabled: boolean;
    intervalMonths: number; // e.g., 6 months for real estate
    nextReminderDate: string;
  };
  
  // Metadata
  createdAt: string;
  category: string; // "24K Gold Bars", "Bitcoin", "Residential Property"
  icon: string;
  iconBg: string;
};

export type Loan = {
  id: string;
  loanType: 'HOME' | 'CAR' | 'PERSONAL' | 'EDUCATION' | 'OTHER';
  linkedAssetId: string; // ID of the asset this loan is for
  linkedAssetName: string;
  
  loanAmount: number; // Original loan amount
  outstandingBalance: number; // Current outstanding
  monthlyEMI: number;
  interestRate: number; // Annual percentage
  
  startDate: string;
  endDate: string;
  
  icon: string;
  iconBg: string;
};

export type VaultState = {
  assets: Asset[];
  loans: Loan[];
  
  // Aggregated values
  totalAssetValue: number;
  totalLoanValue: number;
  netWorth: number;
  
  // Price cache (for live fetching)
  livePrices: {
    gold: {
      pricePerGram: number;
      lastFetched: string;
      currency: 'USD';
    };
    crypto: {
      [symbol: string]: {
        priceUSD: number;
        change24h: number;
        lastFetched: string;
      };
    };
  };
};

// Dummy initial state with manual + live hybrid data
export const initialVaultState: VaultState = {
  assets: [
    {
      id: 'apt-1',
      type: 'REAL_ESTATE',
      name: '2BHK Apartment - Indiranagar',
      quantity: 1200, // Sqft
      buyPrice: 1500, // Per sqft
      purchaseDate: '2020-03-15',
      currentPricePerUnit: 1542, // Manual update
      currentValue: 1850400, // 1200 × 1542
      lastUpdated: '2024-12-01',
      location: 'Indiranagar, Bangalore',
      category: 'Residential Property',
      icon: 'apartment',
      iconBg: 'bg-indigo-500',
      linkedLoanId: 'loan-1',
      updateReminder: {
        enabled: true,
        intervalMonths: 6,
        nextReminderDate: '2025-06-01',
      },
      notes: 'Near metro station, good appreciation',
      createdAt: '2020-03-15',
    },
    {
      id: 'gold-1',
      type: 'GOLD',
      name: 'Sovereign Gold Bond',
      quantity: 6750, // Grams
      buyPrice: 55.5, // Per gram
      purchaseDate: '2021-04-01',
      currentPricePerUnit: 62.96, // LIVE FETCHED
      currentValue: 424980, // 6750 × 62.96 (auto-calculated)
      lastUpdated: '2024-12-07T09:00:00Z',
      category: '24K Gold Bond',
      icon: 'workspace_premium',
      iconBg: 'bg-yellow-600',
      notes: 'Series IV - 2021, 2.5% interest',
      createdAt: '2021-04-01',
    },
    {
      id: 'crypto-1',
      type: 'CRYPTO',
      name: 'Bitcoin Wallet',
      quantity: 0.5, // BTC
      buyPrice: 45230, // Per BTC
      purchaseDate: '2023-01-10',
      currentPricePerUnit: 45126, // LIVE FETCHED from CoinGecko
      currentValue: 22563, // 0.5 × 45126 (auto-calculated)
      lastUpdated: '2024-12-07T09:00:00Z',
      category: 'Bitcoin',
      icon: 'currency_bitcoin',
      iconBg: 'bg-orange-500',
      notes: 'Cold wallet storage',
      createdAt: '2023-01-10',
    },
  ],
  
  loans: [
    {
      id: 'loan-1',
      loanType: 'HOME',
      linkedAssetId: 'apt-1',
      linkedAssetName: '2BHK Apartment - Indiranagar',
      loanAmount: 1500000,
      outstandingBalance: 850000,
      monthlyEMI: 15250,
      interestRate: 8.5,
      startDate: '2020-04-01',
      endDate: '2035-12-31',
      icon: 'home',
      iconBg: 'bg-red-500',
    },
  ],
  
  totalAssetValue: 0, // Calculated on init
  totalLoanValue: 0, // Calculated on init
  netWorth: 0, // Calculated on init
  
  livePrices: {
    gold: {
      pricePerGram: 62.96,
      lastFetched: '2024-12-07T09:00:00Z',
      currency: 'USD',
    },
    crypto: {
      BTC: {
        priceUSD: 45126,
        change24h: 5.67,
        lastFetched: '2024-12-07T09:00:00Z',
      },
      ETH: {
        priceUSD: 2350,
        change24h: 12.3,
        lastFetched: '2024-12-07T09:00:00Z',
      },
    },
  },
};

// Helper function to calculate totals
export const calculateVaultTotals = (state: VaultState): VaultState => {
  const totalAssetValue = state.assets.reduce(
    (sum, asset) => sum + asset.currentValue,
    0
  );
  
  const totalLoanValue = state.loans.reduce(
    (sum, loan) => sum + loan.outstandingBalance,
    0
  );
  
  const netWorth = totalAssetValue - totalLoanValue;
  
  return {
    ...state,
    totalAssetValue,
    totalLoanValue,
    netWorth,
  };
};

// Update asset with live price
export const updateAssetWithLivePrice = (
  asset: Asset,
  livePrice: number
): Asset => {
  return {
    ...asset,
    currentPricePerUnit: livePrice,
    currentValue: asset.quantity * livePrice,
    lastUpdated: new Date().toISOString(),
  };
};

// Calculate appreciation for an asset
export const calculateAssetAppreciation = (asset: Asset) => {
  const invested = asset.quantity * asset.buyPrice;
  const current = asset.currentValue;
  const gain = current - invested;
  const gainPercent = (gain / invested) * 100;
  
  return {
    invested,
    current,
    gain,
    gainPercent,
    isPositive: gain >= 0,
  };
};

export default initialVaultState;
