// Dummy data for expense tracker dashboard

export interface Transaction {
  id: string;
  date: string;
  category: string;
  description: string;
  account: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  status: 'completed' | 'pending' | 'failed';
}

export interface Account {
  id: string;
  name: string;
  type: 'bank' | 'cash' | 'credit' | 'investment';
  balance: number;
  icon: string;
  color: string;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  color: string;
  percentage: number;
}

export interface BudgetCard {
  title: string;
  amount: number;
  change: number;
  trend: number[];
  icon: string;
  color: string;
}

export interface CashFlowData {
  date: string;
  income: number;
  expense: number;
}

// Accounts Data
export const accountsData: Account[] = [
  {
    id: '1',
    name: 'HDFC Bank',
    type: 'bank',
    balance: 145000,
    icon: 'account_balance',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id: '2',
    name: 'Physical Wallet',
    type: 'cash',
    balance: 4500,
    icon: 'account_balance_wallet',
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    id: '3',
    name: 'SBI Credit Card',
    type: 'credit',
    balance: -12000,
    icon: 'credit_card',
    color: 'from-red-500/20 to-rose-500/20',
  },
  {
    id: '4',
    name: 'Zerodha Funds',
    type: 'investment',
    balance: 5000,
    icon: 'trending_up',
    color: 'from-purple-500/20 to-violet-500/20',
  },
];

// Budget Cards Data
export const budgetCardsData: BudgetCard[] = [
  {
    title: 'Total Income',
    amount: 85000,
    change: 12.5,
    trend: [42000, 45000, 52000, 68000, 72000, 78000, 85000],
    icon: 'trending_up',
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    title: 'Total Expenses',
    amount: 52340,
    change: -7.2,
    trend: [58000, 56000, 54000, 55000, 53000, 54000, 52340],
    icon: 'trending_down',
    color: 'from-red-500/20 to-rose-500/20',
  },
  {
    title: 'Net Cash Flow',
    amount: 32660,
    change: 45.8,
    trend: [18000, 20000, 22000, 25000, 28000, 30000, 32660],
    icon: 'account_balance',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
];

// Category Breakdown Data
export const categoryBreakdownData: CategoryBreakdown[] = [
  { category: 'Food & Dining', amount: 15840, color: '#ef4444', percentage: 30.3 },
  { category: 'Transportation', amount: 8420, color: '#f59e0b', percentage: 16.1 },
  { category: 'Shopping', amount: 12650, color: '#8b5cf6', percentage: 24.2 },
  { category: 'Entertainment', amount: 5230, color: '#3b82f6', percentage: 10.0 },
  { category: 'Bills & Utilities', amount: 7800, color: '#10b981', percentage: 14.9 },
  { category: 'Others', amount: 2400, color: '#6b7280', percentage: 4.5 },
];

// Cash Flow Chart Data (Last 30 days)
export const cashFlowData: CashFlowData[] = [
  { date: 'Nov 1', income: 0, expense: 1200 },
  { date: 'Nov 2', income: 0, expense: 850 },
  { date: 'Nov 3', income: 0, expense: 2100 },
  { date: 'Nov 4', income: 0, expense: 1560 },
  { date: 'Nov 5', income: 45000, expense: 980 },
  { date: 'Nov 6', income: 0, expense: 1340 },
  { date: 'Nov 7', income: 0, expense: 2890 },
  { date: 'Nov 8', income: 0, expense: 1120 },
  { date: 'Nov 9', income: 0, expense: 3450 },
  { date: 'Nov 10', income: 0, expense: 890 },
  { date: 'Nov 11', income: 0, expense: 2340 },
  { date: 'Nov 12', income: 0, expense: 1780 },
  { date: 'Nov 13', income: 0, expense: 4200 },
  { date: 'Nov 14', income: 0, expense: 15000 },
  { date: 'Nov 15', income: 40000, expense: 1200 },
  { date: 'Nov 16', income: 0, expense: 980 },
  { date: 'Nov 17', income: 0, expense: 1560 },
  { date: 'Nov 18', income: 0, expense: 2340 },
  { date: 'Nov 19', income: 0, expense: 890 },
  { date: 'Nov 20', income: 0, expense: 3120 },
  { date: 'Nov 21', income: 0, expense: 1450 },
  { date: 'Nov 22', income: 0, expense: 2100 },
  { date: 'Nov 23', income: 0, expense: 1780 },
  { date: 'Nov 24', income: 0, expense: 2890 },
  { date: 'Nov 25', income: 0, expense: 1340 },
  { date: 'Nov 26', income: 0, expense: 980 },
];

// Transactions Data (50+ entries for scrolling)
export const transactionsData: Transaction[] = [
  { id: '1', date: '2024-11-26', category: 'Food & Dining', description: 'Starbucks Coffee', account: 'HDFC Bank', amount: 450, type: 'expense', status: 'completed' },
  { id: '2', date: '2024-11-26', category: 'Transportation', description: 'Uber Ride', account: 'Physical Wallet', amount: 280, type: 'expense', status: 'completed' },
  { id: '3', date: '2024-11-25', category: 'Shopping', description: 'Amazon Order', account: 'SBI Credit Card', amount: 3450, type: 'expense', status: 'completed' },
  { id: '4', date: '2024-11-25', category: 'Food & Dining', description: 'Swiggy Dinner', account: 'HDFC Bank', amount: 680, type: 'expense', status: 'completed' },
  { id: '5', date: '2024-11-24', category: 'Entertainment', description: 'Netflix Subscription', account: 'SBI Credit Card', amount: 649, type: 'expense', status: 'completed' },
  { id: '6', date: '2024-11-24', category: 'Food & Dining', description: 'Lunch at Paradise', account: 'Physical Wallet', amount: 1200, type: 'expense', status: 'completed' },
  { id: '7', date: '2024-11-23', category: 'Shopping', description: 'Zara Clothing', account: 'SBI Credit Card', amount: 4500, type: 'expense', status: 'completed' },
  { id: '8', date: '2024-11-23', category: 'Transportation', description: 'Petrol - Shell', account: 'HDFC Bank', amount: 2100, type: 'expense', status: 'completed' },
  { id: '9', date: '2024-11-22', category: 'Food & Dining', description: 'Grocery - DMart', account: 'HDFC Bank', amount: 3240, type: 'expense', status: 'completed' },
  { id: '10', date: '2024-11-22', category: 'Bills & Utilities', description: 'Electricity Bill', account: 'HDFC Bank', amount: 1850, type: 'expense', status: 'completed' },
  { id: '11', date: '2024-11-21', category: 'Entertainment', description: 'Movie Tickets', account: 'Physical Wallet', amount: 800, type: 'expense', status: 'completed' },
  { id: '12', date: '2024-11-21', category: 'Food & Dining', description: 'Cafe Coffee Day', account: 'HDFC Bank', amount: 340, type: 'expense', status: 'completed' },
  { id: '13', date: '2024-11-20', category: 'Shopping', description: 'Flipkart Electronics', account: 'SBI Credit Card', amount: 8900, type: 'expense', status: 'completed' },
  { id: '14', date: '2024-11-20', category: 'Transportation', description: 'Ola Auto', account: 'Physical Wallet', amount: 120, type: 'expense', status: 'completed' },
  { id: '15', date: '2024-11-19', category: 'Food & Dining', description: 'Dominos Pizza', account: 'HDFC Bank', amount: 890, type: 'expense', status: 'completed' },
  { id: '16', date: '2024-11-19', category: 'Bills & Utilities', description: 'Internet Bill - Airtel', account: 'HDFC Bank', amount: 999, type: 'expense', status: 'completed' },
  { id: '17', date: '2024-11-18', category: 'Food & Dining', description: 'Breakfast at Cafe', account: 'Physical Wallet', amount: 450, type: 'expense', status: 'completed' },
  { id: '18', date: '2024-11-18', category: 'Shopping', description: 'Nike Shoes', account: 'SBI Credit Card', amount: 6500, type: 'expense', status: 'completed' },
  { id: '19', date: '2024-11-17', category: 'Entertainment', description: 'Spotify Premium', account: 'HDFC Bank', amount: 119, type: 'expense', status: 'completed' },
  { id: '20', date: '2024-11-17', category: 'Food & Dining', description: 'Zomato Lunch', account: 'HDFC Bank', amount: 520, type: 'expense', status: 'completed' },
  { id: '21', date: '2024-11-16', category: 'Transportation', description: 'Metro Card Recharge', account: 'HDFC Bank', amount: 500, type: 'expense', status: 'completed' },
  { id: '22', date: '2024-11-15', category: 'Income', description: 'Salary Credit', account: 'HDFC Bank', amount: 40000, type: 'income', status: 'completed' },
  { id: '23', date: '2024-11-15', category: 'Food & Dining', description: 'Celebration Dinner', account: 'SBI Credit Card', amount: 2800, type: 'expense', status: 'completed' },
  { id: '24', date: '2024-11-14', category: 'Transportation', description: 'Flight Ticket - IndiGo', account: 'SBI Credit Card', amount: 15000, type: 'expense', status: 'completed' },
  { id: '25', date: '2024-11-14', category: 'Food & Dining', description: 'Airport Meal', account: 'Physical Wallet', amount: 850, type: 'expense', status: 'completed' },
  { id: '26', date: '2024-11-13', category: 'Shopping', description: 'Medicine - Apollo', account: 'HDFC Bank', amount: 1200, type: 'expense', status: 'completed' },
  { id: '27', date: '2024-11-13', category: 'Bills & Utilities', description: 'Water Bill', account: 'HDFC Bank', amount: 450, type: 'expense', status: 'completed' },
  { id: '28', date: '2024-11-12', category: 'Food & Dining', description: 'Breakfast Buffet', account: 'Physical Wallet', amount: 680, type: 'expense', status: 'completed' },
  { id: '29', date: '2024-11-12', category: 'Entertainment', description: 'Gaming Store', account: 'SBI Credit Card', amount: 2500, type: 'expense', status: 'completed' },
  { id: '30', date: '2024-11-11', category: 'Food & Dining', description: 'Quick Bite - McDonald\'s', account: 'Physical Wallet', amount: 390, type: 'expense', status: 'completed' },
  { id: '31', date: '2024-11-11', category: 'Transportation', description: 'Uber - Long Distance', account: 'HDFC Bank', amount: 1200, type: 'expense', status: 'completed' },
  { id: '32', date: '2024-11-10', category: 'Shopping', description: 'Book Store', account: 'HDFC Bank', amount: 1500, type: 'expense', status: 'completed' },
  { id: '33', date: '2024-11-10', category: 'Food & Dining', description: 'Dinner with Friends', account: 'SBI Credit Card', amount: 3200, type: 'expense', status: 'completed' },
  { id: '34', date: '2024-11-09', category: 'Bills & Utilities', description: 'Mobile Recharge', account: 'HDFC Bank', amount: 599, type: 'expense', status: 'completed' },
  { id: '35', date: '2024-11-09', category: 'Food & Dining', description: 'Street Food', account: 'Physical Wallet', amount: 250, type: 'expense', status: 'completed' },
  { id: '36', date: '2024-11-08', category: 'Shopping', description: 'Grocery - BigBasket', account: 'HDFC Bank', amount: 2100, type: 'expense', status: 'completed' },
  { id: '37', date: '2024-11-08', category: 'Entertainment', description: 'Concert Tickets', account: 'SBI Credit Card', amount: 4500, type: 'expense', status: 'completed' },
  { id: '38', date: '2024-11-07', category: 'Food & Dining', description: 'Italian Restaurant', account: 'HDFC Bank', amount: 1800, type: 'expense', status: 'completed' },
  { id: '39', date: '2024-11-07', category: 'Transportation', description: 'Parking Fee', account: 'Physical Wallet', amount: 100, type: 'expense', status: 'completed' },
  { id: '40', date: '2024-11-06', category: 'Bills & Utilities', description: 'Gas Cylinder', account: 'HDFC Bank', amount: 950, type: 'expense', status: 'completed' },
  { id: '41', date: '2024-11-06', category: 'Food & Dining', description: 'Burger King', account: 'Physical Wallet', amount: 420, type: 'expense', status: 'completed' },
  { id: '42', date: '2024-11-05', category: 'Income', description: 'Freelance Project', account: 'HDFC Bank', amount: 45000, type: 'income', status: 'completed' },
  { id: '43', date: '2024-11-05', category: 'Shopping', description: 'Fashion Store', account: 'SBI Credit Card', amount: 5600, type: 'expense', status: 'completed' },
  { id: '44', date: '2024-11-04', category: 'Food & Dining', description: 'Sushi Restaurant', account: 'HDFC Bank', amount: 2400, type: 'expense', status: 'completed' },
  { id: '45', date: '2024-11-04', category: 'Transportation', description: 'Taxi Service', account: 'Physical Wallet', amount: 350, type: 'expense', status: 'completed' },
  { id: '46', date: '2024-11-03', category: 'Entertainment', description: 'Gaming Subscription', account: 'HDFC Bank', amount: 499, type: 'expense', status: 'completed' },
  { id: '47', date: '2024-11-03', category: 'Food & Dining', description: 'Coffee & Pastry', account: 'Physical Wallet', amount: 280, type: 'expense', status: 'completed' },
  { id: '48', date: '2024-11-02', category: 'Bills & Utilities', description: 'Society Maintenance', account: 'HDFC Bank', amount: 3500, type: 'expense', status: 'completed' },
  { id: '49', date: '2024-11-02', category: 'Shopping', description: 'Home Decor', account: 'SBI Credit Card', amount: 4200, type: 'expense', status: 'completed' },
  { id: '50', date: '2024-11-01', category: 'Food & Dining', description: 'Monthly Groceries', account: 'HDFC Bank', amount: 5400, type: 'expense', status: 'completed' },
];

// Budget usage
export const budgetUsageData = {
  totalBudget: 65000,
  usedBudget: 52340,
  percentage: 80.5,
};
