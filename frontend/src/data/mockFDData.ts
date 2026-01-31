// Mock data for Fixed Deposits (FD) page

export type FDType = 'Bank FD' | 'Post Office TD' | 'Corporate FD' | 'Tax Saver FD' | 'Senior Citizen FD' | 'NSC' | 'KVP';
export type FDStatus = 'Active' | 'Matured' | 'Premature Closed';
export type InterestPayout = 'Monthly' | 'Quarterly' | 'Half-Yearly' | 'Yearly' | 'At Maturity';

export interface FixedDeposit {
  id: string;
  bankName: string;
  bankLogo?: string;
  accountNumber: string;
  fdType: FDType;
  principalAmount: number;
  interestRate: number;
  tenureMonths: number;
  startDate: string;
  maturityDate: string;
  maturityAmount: number;
  interestEarned: number;
  interestAccrued: number;
  status: FDStatus;
  interestPayout: InterestPayout;
  nominee: string;
  autoRenewal: boolean;
  tdsDeducted: number;
  branch?: string;
}

export interface FDSummary {
  totalInvested: number;
  totalMaturityValue: number;
  totalInterestEarned: number;
  totalInterestAccrued: number;
  activeDeposits: number;
  maturedDeposits: number;
  averageInterestRate: number;
  upcomingMaturities: number;
  thisMonthMaturities: number;
}

export interface FDByType {
  type: FDType;
  count: number;
  totalAmount: number;
  color: string;
}

export interface InterestTrend {
  month: string;
  interest: number;
  cumulative: number;
}

// Individual FD holdings
export const fdHoldings: FixedDeposit[] = [
  {
    id: 'FD001',
    bankName: 'State Bank of India',
    accountNumber: 'XXXX-XXXX-4521',
    fdType: 'Bank FD',
    principalAmount: 500000,
    interestRate: 7.10,
    tenureMonths: 24,
    startDate: '2024-03-15',
    maturityDate: '2026-03-15',
    maturityAmount: 574580,
    interestEarned: 74580,
    interestAccrued: 52000,
    status: 'Active',
    interestPayout: 'At Maturity',
    nominee: 'Priya Sharma',
    autoRenewal: true,
    tdsDeducted: 7458,
    branch: 'Koramangala, Bangalore',
  },
  {
    id: 'FD002',
    bankName: 'HDFC Bank',
    accountNumber: 'XXXX-XXXX-7832',
    fdType: 'Tax Saver FD',
    principalAmount: 150000,
    interestRate: 7.00,
    tenureMonths: 60,
    startDate: '2023-01-10',
    maturityDate: '2028-01-10',
    maturityAmount: 212850,
    interestEarned: 62850,
    interestAccrued: 22000,
    status: 'Active',
    interestPayout: 'At Maturity',
    nominee: 'Rajesh Kumar',
    autoRenewal: false,
    tdsDeducted: 6285,
    branch: 'Indiranagar, Bangalore',
  },
  {
    id: 'FD003',
    bankName: 'ICICI Bank',
    accountNumber: 'XXXX-XXXX-9156',
    fdType: 'Bank FD',
    principalAmount: 300000,
    interestRate: 6.90,
    tenureMonths: 12,
    startDate: '2025-06-01',
    maturityDate: '2026-06-01',
    maturityAmount: 320700,
    interestEarned: 20700,
    interestAccrued: 12000,
    status: 'Active',
    interestPayout: 'Quarterly',
    nominee: 'Anita Sharma',
    autoRenewal: true,
    tdsDeducted: 2070,
    branch: 'MG Road, Bangalore',
  },
  {
    id: 'FD004',
    bankName: 'Post Office',
    accountNumber: 'XXXX-XXXX-3345',
    fdType: 'Post Office TD',
    principalAmount: 200000,
    interestRate: 7.50,
    tenureMonths: 60,
    startDate: '2022-08-20',
    maturityDate: '2027-08-20',
    maturityAmount: 290125,
    interestEarned: 90125,
    interestAccrued: 52500,
    status: 'Active',
    interestPayout: 'Yearly',
    nominee: 'Vikram Singh',
    autoRenewal: false,
    tdsDeducted: 0,
    branch: 'Jayanagar Post Office',
  },
  {
    id: 'FD005',
    bankName: 'Axis Bank',
    accountNumber: 'XXXX-XXXX-6721',
    fdType: 'Senior Citizen FD',
    principalAmount: 1000000,
    interestRate: 7.75,
    tenureMonths: 36,
    startDate: '2024-01-05',
    maturityDate: '2027-01-05',
    maturityAmount: 1256750,
    interestEarned: 256750,
    interestAccrued: 85500,
    status: 'Active',
    interestPayout: 'Monthly',
    nominee: 'Meera Devi',
    autoRenewal: true,
    tdsDeducted: 25675,
    branch: 'Whitefield, Bangalore',
  },
  {
    id: 'FD006',
    bankName: 'Post Office',
    accountNumber: 'NSC-XXXX-8890',
    fdType: 'NSC',
    principalAmount: 100000,
    interestRate: 7.70,
    tenureMonths: 60,
    startDate: '2023-04-01',
    maturityDate: '2028-04-01',
    maturityAmount: 145800,
    interestEarned: 45800,
    interestAccrued: 18000,
    status: 'Active',
    interestPayout: 'At Maturity',
    nominee: 'Sunita Rao',
    autoRenewal: false,
    tdsDeducted: 0,
    branch: 'GPO Bangalore',
  },
  {
    id: 'FD007',
    bankName: 'Kotak Mahindra Bank',
    accountNumber: 'XXXX-XXXX-2234',
    fdType: 'Bank FD',
    principalAmount: 250000,
    interestRate: 7.20,
    tenureMonths: 18,
    startDate: '2025-01-15',
    maturityDate: '2026-07-15',
    maturityAmount: 277000,
    interestEarned: 27000,
    interestAccrued: 9000,
    status: 'Active',
    interestPayout: 'At Maturity',
    nominee: 'Arjun Reddy',
    autoRenewal: true,
    tdsDeducted: 2700,
    branch: 'HSR Layout, Bangalore',
  },
  {
    id: 'FD008',
    bankName: 'Punjab National Bank',
    accountNumber: 'XXXX-XXXX-5567',
    fdType: 'Bank FD',
    principalAmount: 400000,
    interestRate: 6.80,
    tenureMonths: 12,
    startDate: '2025-02-01',
    maturityDate: '2026-02-01',
    maturityAmount: 427200,
    interestEarned: 27200,
    interestAccrued: 27200,
    status: 'Matured',
    interestPayout: 'At Maturity',
    nominee: 'Kavitha Nair',
    autoRenewal: false,
    tdsDeducted: 2720,
    branch: 'BTM Layout, Bangalore',
  },
  {
    id: 'FD009',
    bankName: 'Bajaj Finance',
    accountNumber: 'XXXX-XXXX-1198',
    fdType: 'Corporate FD',
    principalAmount: 500000,
    interestRate: 8.25,
    tenureMonths: 24,
    startDate: '2024-07-01',
    maturityDate: '2026-07-01',
    maturityAmount: 587500,
    interestEarned: 87500,
    interestAccrued: 62000,
    status: 'Active',
    interestPayout: 'At Maturity',
    nominee: 'Deepak Gupta',
    autoRenewal: true,
    tdsDeducted: 8750,
    branch: 'Online',
  },
  {
    id: 'FD010',
    bankName: 'Post Office',
    accountNumber: 'KVP-XXXX-4456',
    fdType: 'KVP',
    principalAmount: 150000,
    interestRate: 7.50,
    tenureMonths: 115,
    startDate: '2023-06-15',
    maturityDate: '2033-01-15',
    maturityAmount: 300000,
    interestEarned: 150000,
    interestAccrued: 28000,
    status: 'Active',
    interestPayout: 'At Maturity',
    nominee: 'Lakshmi Iyer',
    autoRenewal: false,
    tdsDeducted: 0,
    branch: 'Jayanagar Post Office',
  },
];

// Summary calculations
export const fdSummary: FDSummary = {
  totalInvested: fdHoldings.reduce((sum, fd) => sum + fd.principalAmount, 0),
  totalMaturityValue: fdHoldings.reduce((sum, fd) => sum + fd.maturityAmount, 0),
  totalInterestEarned: fdHoldings.reduce((sum, fd) => sum + fd.interestEarned, 0),
  totalInterestAccrued: fdHoldings.reduce((sum, fd) => sum + fd.interestAccrued, 0),
  activeDeposits: fdHoldings.filter(fd => fd.status === 'Active').length,
  maturedDeposits: fdHoldings.filter(fd => fd.status === 'Matured').length,
  averageInterestRate: fdHoldings.reduce((sum, fd) => sum + fd.interestRate, 0) / fdHoldings.length,
  upcomingMaturities: fdHoldings.filter(fd => {
    const maturityDate = new Date(fd.maturityDate);
    const now = new Date();
    const threeMonths = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
    return fd.status === 'Active' && maturityDate <= threeMonths;
  }).length,
  thisMonthMaturities: fdHoldings.filter(fd => {
    const maturityDate = new Date(fd.maturityDate);
    const now = new Date();
    return fd.status === 'Active' && 
           maturityDate.getMonth() === now.getMonth() && 
           maturityDate.getFullYear() === now.getFullYear();
  }).length,
};

// FD distribution by type
export const fdByType: FDByType[] = [
  { type: 'Bank FD', count: 4, totalAmount: 1450000, color: '#3b82f6' },
  { type: 'Tax Saver FD', count: 1, totalAmount: 150000, color: '#10b981' },
  { type: 'Senior Citizen FD', count: 1, totalAmount: 1000000, color: '#f59e0b' },
  { type: 'Post Office TD', count: 1, totalAmount: 200000, color: '#8b5cf6' },
  { type: 'Corporate FD', count: 1, totalAmount: 500000, color: '#ef4444' },
  { type: 'NSC', count: 1, totalAmount: 100000, color: '#06b6d4' },
  { type: 'KVP', count: 1, totalAmount: 150000, color: '#ec4899' },
];

// Monthly interest trend data
export const interestTrend: InterestTrend[] = [
  { month: 'Feb', interest: 18500, cumulative: 18500 },
  { month: 'Mar', interest: 19200, cumulative: 37700 },
  { month: 'Apr', interest: 19800, cumulative: 57500 },
  { month: 'May', interest: 20100, cumulative: 77600 },
  { month: 'Jun', interest: 20500, cumulative: 98100 },
  { month: 'Jul', interest: 21000, cumulative: 119100 },
  { month: 'Aug', interest: 21500, cumulative: 140600 },
  { month: 'Sep', interest: 22000, cumulative: 162600 },
  { month: 'Oct', interest: 22500, cumulative: 185100 },
  { month: 'Nov', interest: 23000, cumulative: 208100 },
  { month: 'Dec', interest: 23500, cumulative: 231600 },
  { month: 'Jan', interest: 24000, cumulative: 255600 },
];

// Upcoming maturities
export const upcomingMaturities = fdHoldings
  .filter(fd => fd.status === 'Active')
  .sort((a, b) => new Date(a.maturityDate).getTime() - new Date(b.maturityDate).getTime())
  .slice(0, 5);

// Bank-wise distribution
export const bankWiseDistribution = [
  { bank: 'SBI', amount: 500000, color: '#1e40af' },
  { bank: 'HDFC', amount: 150000, color: '#dc2626' },
  { bank: 'ICICI', amount: 300000, color: '#ea580c' },
  { bank: 'Post Office', amount: 450000, color: '#ca8a04' },
  { bank: 'Axis', amount: 1000000, color: '#7c3aed' },
  { bank: 'Kotak', amount: 250000, color: '#0891b2' },
  { bank: 'Bajaj Finance', amount: 500000, color: '#0d9488' },
  { bank: 'PNB', amount: 400000, color: '#be185d' },
];
