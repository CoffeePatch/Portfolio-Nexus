// Mock data for Precious Metals (Gold, Silver, Platinum, etc.)

export type MetalType = 'Gold' | 'Silver' | 'Platinum' | 'Palladium';
export type MetalForm = 'Coin' | 'Bar' | 'Biscuit' | 'Jewelry' | 'ETF';
export type GoldPurity = '24K' | '22K' | '18K' | '14K';
export type SilverPurity = '999' | '925' | '900';
export type WeightUnit = 'gram' | 'tola' | 'ounce' | 'kg';

export interface PreciousMetal {
  id: string;
  metalType: MetalType;
  form: MetalForm;
  purity: string;
  description: string;
  weightGrams: number;
  weightDisplay: string;
  purchaseDate: string;
  purchasePricePerGram: number;
  totalPurchasePrice: number;
  currentPricePerGram: number;
  currentValue: number;
  profitLoss: number;
  returnPercent: number;
  vendor: string;
  storageLocation: string;
  certificate?: string;
  hallmark?: string;
}

export interface MetalSummary {
  totalInvested: number;
  currentValue: number;
  totalProfitLoss: number;
  overallReturn: number;
  totalWeightGold: number;
  totalWeightSilver: number;
  totalItems: number;
}

export interface MetalPriceHistory {
  date: string;
  gold: number;
  silver: number;
  platinum: number;
}

export interface MetalAllocation {
  type: MetalType;
  invested: number;
  currentValue: number;
  weight: number;
  color: string;
}

// Current market prices (per gram in INR)
export const currentMarketPrices = {
  gold24K: 6850,
  gold22K: 6280,
  gold18K: 5140,
  silver999: 85,
  silver925: 78,
  platinum: 3200,
  palladium: 3800,
};

// Individual precious metal holdings
export const metalHoldings: PreciousMetal[] = [
  {
    id: 'PM001',
    metalType: 'Gold',
    form: 'Coin',
    purity: '24K',
    description: 'Gold Sovereign Coin (8g)',
    weightGrams: 8,
    weightDisplay: '8 grams',
    purchaseDate: '2022-11-14',
    purchasePricePerGram: 5450,
    totalPurchasePrice: 43600,
    currentPricePerGram: 6850,
    currentValue: 54800,
    profitLoss: 11200,
    returnPercent: 25.69,
    vendor: 'Tanishq',
    storageLocation: 'Home Locker',
    hallmark: 'BIS Hallmark',
  },
  {
    id: 'PM002',
    metalType: 'Gold',
    form: 'Biscuit',
    purity: '24K',
    description: 'Gold Biscuit 10g MMTC-PAMP',
    weightGrams: 10,
    weightDisplay: '10 grams',
    purchaseDate: '2023-04-22',
    purchasePricePerGram: 5980,
    totalPurchasePrice: 59800,
    currentPricePerGram: 6850,
    currentValue: 68500,
    profitLoss: 8700,
    returnPercent: 14.55,
    vendor: 'MMTC-PAMP',
    storageLocation: 'Bank Locker',
    certificate: 'Assay Certified',
    hallmark: 'BIS Hallmark',
  },
  {
    id: 'PM003',
    metalType: 'Gold',
    form: 'Jewelry',
    purity: '22K',
    description: 'Gold Chain Necklace',
    weightGrams: 25,
    weightDisplay: '25 grams',
    purchaseDate: '2021-05-15',
    purchasePricePerGram: 4650,
    totalPurchasePrice: 116250,
    currentPricePerGram: 6280,
    currentValue: 157000,
    profitLoss: 40750,
    returnPercent: 35.05,
    vendor: 'Kalyan Jewellers',
    storageLocation: 'Home Locker',
    hallmark: 'BIS Hallmark',
  },
  {
    id: 'PM004',
    metalType: 'Gold',
    form: 'Jewelry',
    purity: '22K',
    description: 'Gold Bangles (Pair)',
    weightGrams: 40,
    weightDisplay: '40 grams',
    purchaseDate: '2020-10-28',
    purchasePricePerGram: 4850,
    totalPurchasePrice: 194000,
    currentPricePerGram: 6280,
    currentValue: 251200,
    profitLoss: 57200,
    returnPercent: 29.48,
    vendor: 'Malabar Gold',
    storageLocation: 'Bank Locker',
    hallmark: 'BIS Hallmark',
  },
  {
    id: 'PM005',
    metalType: 'Gold',
    form: 'Bar',
    purity: '24K',
    description: 'Gold Bar 50g',
    weightGrams: 50,
    weightDisplay: '50 grams',
    purchaseDate: '2024-01-10',
    purchasePricePerGram: 6320,
    totalPurchasePrice: 316000,
    currentPricePerGram: 6850,
    currentValue: 342500,
    profitLoss: 26500,
    returnPercent: 8.39,
    vendor: 'HDFC Bank',
    storageLocation: 'Bank Locker',
    certificate: 'Assay Certified',
    hallmark: 'BIS Hallmark',
  },
  {
    id: 'PM006',
    metalType: 'Gold',
    form: 'Coin',
    purity: '22K',
    description: 'Lakshmi Gold Coin 5g',
    weightGrams: 5,
    weightDisplay: '5 grams',
    purchaseDate: '2023-10-24',
    purchasePricePerGram: 5750,
    totalPurchasePrice: 28750,
    currentPricePerGram: 6280,
    currentValue: 31400,
    profitLoss: 2650,
    returnPercent: 9.22,
    vendor: 'Joyalukkas',
    storageLocation: 'Home Locker',
    hallmark: 'BIS Hallmark',
  },
  {
    id: 'PM007',
    metalType: 'Silver',
    form: 'Bar',
    purity: '999',
    description: 'Silver Bar 1kg MMTC',
    weightGrams: 1000,
    weightDisplay: '1 kg',
    purchaseDate: '2023-03-18',
    purchasePricePerGram: 68,
    totalPurchasePrice: 68000,
    currentPricePerGram: 85,
    currentValue: 85000,
    profitLoss: 17000,
    returnPercent: 25.00,
    vendor: 'MMTC',
    storageLocation: 'Home Locker',
    certificate: 'Assay Certified',
  },
  {
    id: 'PM008',
    metalType: 'Silver',
    form: 'Coin',
    purity: '999',
    description: 'Silver Coins Set (10 x 100g)',
    weightGrams: 1000,
    weightDisplay: '1 kg',
    purchaseDate: '2022-08-12',
    purchasePricePerGram: 58,
    totalPurchasePrice: 58000,
    currentPricePerGram: 85,
    currentValue: 85000,
    profitLoss: 27000,
    returnPercent: 46.55,
    vendor: 'SBI',
    storageLocation: 'Bank Locker',
    certificate: 'Bank Certified',
  },
  {
    id: 'PM009',
    metalType: 'Silver',
    form: 'Jewelry',
    purity: '925',
    description: 'Silver Anklets (Pair)',
    weightGrams: 200,
    weightDisplay: '200 grams',
    purchaseDate: '2024-06-05',
    purchasePricePerGram: 72,
    totalPurchasePrice: 14400,
    currentPricePerGram: 78,
    currentValue: 15600,
    profitLoss: 1200,
    returnPercent: 8.33,
    vendor: 'Local Jeweller',
    storageLocation: 'Home',
    hallmark: '925 Sterling',
  },
  {
    id: 'PM010',
    metalType: 'Silver',
    form: 'Bar',
    purity: '999',
    description: 'Silver Biscuit 500g',
    weightGrams: 500,
    weightDisplay: '500 grams',
    purchaseDate: '2024-09-20',
    purchasePricePerGram: 82,
    totalPurchasePrice: 41000,
    currentPricePerGram: 85,
    currentValue: 42500,
    profitLoss: 1500,
    returnPercent: 3.66,
    vendor: 'Axis Bank',
    storageLocation: 'Bank Locker',
    certificate: 'Assay Certified',
  },
  {
    id: 'PM011',
    metalType: 'Platinum',
    form: 'Bar',
    purity: '999',
    description: 'Platinum Bar 20g',
    weightGrams: 20,
    weightDisplay: '20 grams',
    purchaseDate: '2023-07-14',
    purchasePricePerGram: 2950,
    totalPurchasePrice: 59000,
    currentPricePerGram: 3200,
    currentValue: 64000,
    profitLoss: 5000,
    returnPercent: 8.47,
    vendor: 'MMTC-PAMP',
    storageLocation: 'Bank Locker',
    certificate: 'Assay Certified',
  },
  {
    id: 'PM012',
    metalType: 'Gold',
    form: 'Jewelry',
    purity: '18K',
    description: 'Gold Ring with Diamond',
    weightGrams: 6,
    weightDisplay: '6 grams',
    purchaseDate: '2022-02-14',
    purchasePricePerGram: 4200,
    totalPurchasePrice: 25200,
    currentPricePerGram: 5140,
    currentValue: 30840,
    profitLoss: 5640,
    returnPercent: 22.38,
    vendor: 'CaratLane',
    storageLocation: 'Home',
    hallmark: 'BIS Hallmark',
  },
];

// Calculate summary
const calculateSummary = (): MetalSummary => {
  const totalInvested = metalHoldings.reduce((sum, m) => sum + m.totalPurchasePrice, 0);
  const currentValue = metalHoldings.reduce((sum, m) => sum + m.currentValue, 0);
  const totalProfitLoss = currentValue - totalInvested;
  const overallReturn = (totalProfitLoss / totalInvested) * 100;
  
  const goldHoldings = metalHoldings.filter(m => m.metalType === 'Gold');
  const silverHoldings = metalHoldings.filter(m => m.metalType === 'Silver');
  
  return {
    totalInvested,
    currentValue,
    totalProfitLoss,
    overallReturn,
    totalWeightGold: goldHoldings.reduce((sum, m) => sum + m.weightGrams, 0),
    totalWeightSilver: silverHoldings.reduce((sum, m) => sum + m.weightGrams, 0),
    totalItems: metalHoldings.length,
  };
};

export const metalSummary = calculateSummary();

// Metal allocation by type
export const metalAllocation: MetalAllocation[] = [
  {
    type: 'Gold',
    invested: metalHoldings.filter(m => m.metalType === 'Gold').reduce((sum, m) => sum + m.totalPurchasePrice, 0),
    currentValue: metalHoldings.filter(m => m.metalType === 'Gold').reduce((sum, m) => sum + m.currentValue, 0),
    weight: metalHoldings.filter(m => m.metalType === 'Gold').reduce((sum, m) => sum + m.weightGrams, 0),
    color: '#fbbf24',
  },
  {
    type: 'Silver',
    invested: metalHoldings.filter(m => m.metalType === 'Silver').reduce((sum, m) => sum + m.totalPurchasePrice, 0),
    currentValue: metalHoldings.filter(m => m.metalType === 'Silver').reduce((sum, m) => sum + m.currentValue, 0),
    weight: metalHoldings.filter(m => m.metalType === 'Silver').reduce((sum, m) => sum + m.weightGrams, 0),
    color: '#94a3b8',
  },
  {
    type: 'Platinum',
    invested: metalHoldings.filter(m => m.metalType === 'Platinum').reduce((sum, m) => sum + m.totalPurchasePrice, 0),
    currentValue: metalHoldings.filter(m => m.metalType === 'Platinum').reduce((sum, m) => sum + m.currentValue, 0),
    weight: metalHoldings.filter(m => m.metalType === 'Platinum').reduce((sum, m) => sum + m.weightGrams, 0),
    color: '#e5e7eb',
  },
];

// Price history for chart (last 12 months - price per gram)
export const metalPriceHistory: MetalPriceHistory[] = [
  { date: 'Feb', gold: 5650, silver: 65, platinum: 2850 },
  { date: 'Mar', gold: 5780, silver: 68, platinum: 2920 },
  { date: 'Apr', gold: 5920, silver: 70, platinum: 2980 },
  { date: 'May', gold: 6050, silver: 72, platinum: 3020 },
  { date: 'Jun', gold: 6180, silver: 74, platinum: 3050 },
  { date: 'Jul', gold: 6250, silver: 75, platinum: 3080 },
  { date: 'Aug', gold: 6380, silver: 77, platinum: 3100 },
  { date: 'Sep', gold: 6520, silver: 79, platinum: 3120 },
  { date: 'Oct', gold: 6650, silver: 81, platinum: 3150 },
  { date: 'Nov', gold: 6720, silver: 83, platinum: 3180 },
  { date: 'Dec', gold: 6780, silver: 84, platinum: 3190 },
  { date: 'Jan', gold: 6850, silver: 85, platinum: 3200 },
];

// Form-wise distribution
export const formDistribution = [
  { form: 'Jewelry', count: 4, value: metalHoldings.filter(m => m.form === 'Jewelry').reduce((sum, m) => sum + m.currentValue, 0), color: '#f472b6' },
  { form: 'Bar', count: 4, value: metalHoldings.filter(m => m.form === 'Bar').reduce((sum, m) => sum + m.currentValue, 0), color: '#fbbf24' },
  { form: 'Coin', count: 3, value: metalHoldings.filter(m => m.form === 'Coin').reduce((sum, m) => sum + m.currentValue, 0), color: '#a78bfa' },
  { form: 'Biscuit', count: 1, value: metalHoldings.filter(m => m.form === 'Biscuit').reduce((sum, m) => sum + m.currentValue, 0), color: '#34d399' },
];

// Storage location summary
export const storageDistribution = [
  { location: 'Bank Locker', count: metalHoldings.filter(m => m.storageLocation === 'Bank Locker').length, value: metalHoldings.filter(m => m.storageLocation === 'Bank Locker').reduce((sum, m) => sum + m.currentValue, 0) },
  { location: 'Home Locker', count: metalHoldings.filter(m => m.storageLocation === 'Home Locker').length, value: metalHoldings.filter(m => m.storageLocation === 'Home Locker').reduce((sum, m) => sum + m.currentValue, 0) },
  { location: 'Home', count: metalHoldings.filter(m => m.storageLocation === 'Home').length, value: metalHoldings.filter(m => m.storageLocation === 'Home').reduce((sum, m) => sum + m.currentValue, 0) },
];
