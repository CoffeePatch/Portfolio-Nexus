// Mock data for Real Estate Portfolio - For Builders & Investors

export type PropertyType = 'Residential' | 'Commercial' | 'Land' | 'REIT' | 'Industrial' | 'Mixed-Use';
export type PropertyStatus = 'Owned' | 'Under Construction' | 'Pre-Launch' | 'Rented' | 'Vacant' | 'For Sale';
export type PropertyCategory = 'Investment' | 'Self-Use' | 'Development';
export type TenantStatus = 'Occupied' | 'Vacant' | 'Notice Period';

export interface PropertyMortgage {
  lender: string;
  principalAmount: number;
  outstandingAmount: number;
  interestRate: number;
  emiAmount: number;
  tenure: number; // in months
  startDate: string;
  endDate: string;
  emiPaid: number;
  emiRemaining: number;
}

export interface TenantInfo {
  name: string;
  status: TenantStatus;
  leaseStart: string;
  leaseEnd: string;
  monthlyRent: number;
  securityDeposit: number;
  rentDueDate: number; // day of month
  lastPaymentDate: string;
  contactPhone: string;
  contactEmail: string;
}

export interface ConstructionProgress {
  phase: string;
  percentComplete: number;
  estimatedCompletion: string;
  lastUpdated: string;
  milestones: {
    name: string;
    status: 'completed' | 'in-progress' | 'pending';
    date?: string;
  }[];
}

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  status: PropertyStatus;
  category: PropertyCategory;
  
  // Location
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  
  // Property Details
  carpetArea: number; // sq ft
  builtUpArea: number; // sq ft
  superBuiltUpArea?: number; // sq ft
  bedrooms?: number;
  bathrooms?: number;
  floor?: number;
  totalFloors?: number;
  parkingSpots?: number;
  facing?: string;
  yearBuilt?: number;
  
  // Financial
  purchaseDate: string;
  purchasePrice: number;
  stampDuty: number;
  registrationCharges: number;
  otherCharges: number;
  totalInvestment: number;
  currentMarketValue: number;
  appreciation: number;
  appreciationPercent: number;
  
  // Rental (if applicable)
  isRented: boolean;
  rentalIncome?: number; // monthly
  annualRentalYield?: number; // percentage
  tenant?: TenantInfo;
  
  // Mortgage (if applicable)
  hasMortgage: boolean;
  mortgage?: PropertyMortgage;
  
  // Construction (if under construction)
  isUnderConstruction: boolean;
  constructionProgress?: ConstructionProgress;
  possessionDate?: string;
  
  // Builder Info (for under construction)
  builder?: string;
  projectName?: string;
  reraNumber?: string;
  
  // Documents
  hasDocuments: boolean;
  documents?: string[];
  
  // Additional
  amenities?: string[];
  notes?: string;
}

// Builder-specific interfaces
export interface BuilderProject {
  id: string;
  projectName: string;
  location: string;
  city: string;
  type: PropertyType;
  reraNumber: string;
  launchDate: string;
  possessionDate: string;
  status: 'Pre-Launch' | 'Under Construction' | 'Ready to Move' | 'Completed';
  
  // Units
  totalUnits: number;
  soldUnits: number;
  availableUnits: number;
  blockedUnits: number;
  
  // Financial
  totalProjectValue: number;
  collectedAmount: number;
  pendingAmount: number;
  
  // Pricing
  pricePerSqFt: number;
  minPrice: number;
  maxPrice: number;
  
  // Progress
  constructionProgress: number;
  
  // Unit types
  unitTypes: {
    type: string;
    count: number;
    size: string;
    price: number;
  }[];
}

export interface RealEstateSummary {
  totalProperties: number;
  totalInvestment: number;
  currentPortfolioValue: number;
  totalAppreciation: number;
  appreciationPercent: number;
  
  // Rental
  totalRentalIncome: number; // monthly
  annualRentalIncome: number;
  averageRentalYield: number;
  occupiedProperties: number;
  vacantProperties: number;
  
  // Mortgage
  totalMortgageOutstanding: number;
  totalEmiPerMonth: number;
  
  // Net worth
  netEquity: number; // Current value - Outstanding mortgage
  
  // By type
  residentialValue: number;
  commercialValue: number;
  landValue: number;
  reitValue: number;
}

export interface PropertyValueHistory {
  date: string;
  residential: number;
  commercial: number;
  land: number;
  total: number;
}

export interface PropertyAllocation {
  type: PropertyType;
  value: number;
  count: number;
  percentage: number;
  color: string;
}

export interface CityWiseDistribution {
  city: string;
  properties: number;
  value: number;
  percentage: number;
}

// Mock Properties Data
export const properties: Property[] = [
  {
    id: 'prop-001',
    name: '3BHK Premium Apartment',
    type: 'Residential',
    status: 'Rented',
    category: 'Investment',
    address: 'Tower B, Floor 12, Prestige Lakeside Habitat',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560103',
    landmark: 'Near Whitefield Metro',
    carpetArea: 1450,
    builtUpArea: 1680,
    superBuiltUpArea: 1950,
    bedrooms: 3,
    bathrooms: 3,
    floor: 12,
    totalFloors: 24,
    parkingSpots: 2,
    facing: 'East',
    yearBuilt: 2021,
    purchaseDate: '2020-03-15',
    purchasePrice: 12500000,
    stampDuty: 625000,
    registrationCharges: 125000,
    otherCharges: 250000,
    totalInvestment: 13500000,
    currentMarketValue: 17500000,
    appreciation: 4000000,
    appreciationPercent: 29.63,
    isRented: true,
    rentalIncome: 45000,
    annualRentalYield: 3.09,
    tenant: {
      name: 'Rajesh Sharma',
      status: 'Occupied',
      leaseStart: '2024-06-01',
      leaseEnd: '2025-05-31',
      monthlyRent: 45000,
      securityDeposit: 135000,
      rentDueDate: 5,
      lastPaymentDate: '2026-01-05',
      contactPhone: '+91 98765 43210',
      contactEmail: 'rajesh.sharma@email.com'
    },
    hasMortgage: true,
    mortgage: {
      lender: 'HDFC Bank',
      principalAmount: 10000000,
      outstandingAmount: 7850000,
      interestRate: 8.5,
      emiAmount: 89500,
      tenure: 240,
      startDate: '2020-04-01',
      endDate: '2040-03-31',
      emiPaid: 70,
      emiRemaining: 170
    },
    isUnderConstruction: false,
    hasDocuments: true,
    documents: ['Sale Deed', 'Encumbrance Certificate', 'Property Tax Receipt', 'Society NOC'],
    amenities: ['Swimming Pool', 'Gym', 'Clubhouse', 'Power Backup', '24/7 Security']
  },
  {
    id: 'prop-002',
    name: 'Commercial Office Space',
    type: 'Commercial',
    status: 'Rented',
    category: 'Investment',
    address: 'Unit 405-406, World Trade Center',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400051',
    landmark: 'Cuffe Parade',
    carpetArea: 2200,
    builtUpArea: 2600,
    superBuiltUpArea: 3000,
    floor: 4,
    totalFloors: 12,
    parkingSpots: 4,
    facing: 'South',
    yearBuilt: 2018,
    purchaseDate: '2019-08-20',
    purchasePrice: 45000000,
    stampDuty: 2700000,
    registrationCharges: 135000,
    otherCharges: 500000,
    totalInvestment: 48335000,
    currentMarketValue: 58000000,
    appreciation: 9665000,
    appreciationPercent: 20.00,
    isRented: true,
    rentalIncome: 175000,
    annualRentalYield: 3.62,
    tenant: {
      name: 'TechCorp Solutions Pvt Ltd',
      status: 'Occupied',
      leaseStart: '2023-01-01',
      leaseEnd: '2027-12-31',
      monthlyRent: 175000,
      securityDeposit: 1050000,
      rentDueDate: 1,
      lastPaymentDate: '2026-01-01',
      contactPhone: '+91 22 4567 8900',
      contactEmail: 'admin@techcorp.com'
    },
    hasMortgage: false,
    isUnderConstruction: false,
    hasDocuments: true,
    documents: ['Sale Deed', 'Society Share Certificate', 'Lease Agreement', 'TDS Certificate'],
    amenities: ['Central AC', 'High-speed Lift', 'Fire Safety', 'Visitor Parking', 'Cafeteria']
  },
  {
    id: 'prop-003',
    name: 'Agricultural Land',
    type: 'Land',
    status: 'Owned',
    category: 'Investment',
    address: 'Survey No. 45/2, Village Khandala',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '410301',
    carpetArea: 43560, // 1 acre
    builtUpArea: 43560,
    purchaseDate: '2018-05-10',
    purchasePrice: 8500000,
    stampDuty: 510000,
    registrationCharges: 85000,
    otherCharges: 150000,
    totalInvestment: 9245000,
    currentMarketValue: 15000000,
    appreciation: 5755000,
    appreciationPercent: 62.25,
    isRented: false,
    hasMortgage: false,
    isUnderConstruction: false,
    hasDocuments: true,
    documents: ['7/12 Extract', 'Mutation Entry', 'NA Order (Applied)'],
    notes: 'Near proposed ring road. NA conversion in progress.'
  },
  {
    id: 'prop-004',
    name: '4BHK Villa - Under Construction',
    type: 'Residential',
    status: 'Under Construction',
    category: 'Self-Use',
    address: 'Plot 23, DLF Garden City',
    city: 'Gurgaon',
    state: 'Haryana',
    pincode: '122018',
    landmark: 'Sector 91',
    carpetArea: 2800,
    builtUpArea: 3200,
    superBuiltUpArea: 4000,
    bedrooms: 4,
    bathrooms: 5,
    parkingSpots: 3,
    facing: 'North-East',
    purchaseDate: '2024-02-15',
    purchasePrice: 35000000,
    stampDuty: 2100000,
    registrationCharges: 175000,
    otherCharges: 725000,
    totalInvestment: 38000000,
    currentMarketValue: 42000000,
    appreciation: 4000000,
    appreciationPercent: 10.53,
    isRented: false,
    hasMortgage: true,
    mortgage: {
      lender: 'SBI Home Loans',
      principalAmount: 28000000,
      outstandingAmount: 26500000,
      interestRate: 8.25,
      emiAmount: 245000,
      tenure: 180,
      startDate: '2024-03-01',
      endDate: '2039-02-28',
      emiPaid: 23,
      emiRemaining: 157
    },
    isUnderConstruction: true,
    constructionProgress: {
      phase: 'Super Structure',
      percentComplete: 65,
      estimatedCompletion: '2026-12-31',
      lastUpdated: '2026-01-15',
      milestones: [
        { name: 'Foundation', status: 'completed', date: '2024-08-15' },
        { name: 'Plinth', status: 'completed', date: '2024-11-20' },
        { name: 'Super Structure', status: 'in-progress' },
        { name: 'Brick Work', status: 'pending' },
        { name: 'Plastering', status: 'pending' },
        { name: 'Flooring & Finishing', status: 'pending' },
        { name: 'Handover', status: 'pending' }
      ]
    },
    possessionDate: '2026-12-31',
    builder: 'DLF Limited',
    projectName: 'DLF Garden City Phase 3',
    reraNumber: 'HRERA/GGM/2024/1234',
    hasDocuments: true,
    documents: ['Allotment Letter', 'Payment Receipts', 'Construction Agreement', 'RERA Certificate'],
    amenities: ['Private Garden', 'Rooftop Terrace', 'Home Automation', 'EV Charging']
  },
  {
    id: 'prop-005',
    name: 'Embassy REIT Units',
    type: 'REIT',
    status: 'Owned',
    category: 'Investment',
    address: 'NSE Listed - Embassy Office Parks REIT',
    city: 'Pan India',
    state: 'Multiple',
    pincode: '-',
    carpetArea: 0,
    builtUpArea: 0,
    purchaseDate: '2022-06-15',
    purchasePrice: 2500000,
    stampDuty: 0,
    registrationCharges: 2500,
    otherCharges: 1500,
    totalInvestment: 2504000,
    currentMarketValue: 3150000,
    appreciation: 646000,
    appreciationPercent: 25.80,
    isRented: false,
    rentalIncome: 18750, // Quarterly dividend converted to monthly
    annualRentalYield: 7.14,
    hasMortgage: false,
    isUnderConstruction: false,
    hasDocuments: true,
    documents: ['DEMAT Statement', 'Dividend History'],
    notes: '7,500 units @ avg ₹333.33 per unit. Current NAV: ₹420'
  },
  {
    id: 'prop-006',
    name: 'Retail Shop - Mall Space',
    type: 'Commercial',
    status: 'Rented',
    category: 'Investment',
    address: 'Shop G-15, Phoenix MarketCity',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600119',
    landmark: 'Velachery',
    carpetArea: 450,
    builtUpArea: 520,
    floor: 0,
    totalFloors: 4,
    parkingSpots: 0,
    facing: 'Main Atrium',
    yearBuilt: 2015,
    purchaseDate: '2021-11-20',
    purchasePrice: 18000000,
    stampDuty: 1260000,
    registrationCharges: 180000,
    otherCharges: 360000,
    totalInvestment: 19800000,
    currentMarketValue: 23500000,
    appreciation: 3700000,
    appreciationPercent: 18.69,
    isRented: true,
    rentalIncome: 95000,
    annualRentalYield: 4.85,
    tenant: {
      name: 'Lifestyle International Pvt Ltd',
      status: 'Occupied',
      leaseStart: '2022-01-01',
      leaseEnd: '2030-12-31',
      monthlyRent: 95000,
      securityDeposit: 570000,
      rentDueDate: 10,
      lastPaymentDate: '2026-01-10',
      contactPhone: '+91 44 2345 6789',
      contactEmail: 'realestate@lifestyle.com'
    },
    hasMortgage: false,
    isUnderConstruction: false,
    hasDocuments: true,
    documents: ['Sale Deed', 'Mall NOC', 'Lease Agreement', 'Fire Safety Certificate'],
    amenities: ['AC Common Area', 'Escalator Access', 'Loading Bay Access', 'Mall Parking']
  },
  {
    id: 'prop-007',
    name: '2BHK Flat - Vacant',
    type: 'Residential',
    status: 'Vacant',
    category: 'Investment',
    address: 'A-502, Godrej Infinity',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411057',
    landmark: 'Keshav Nagar',
    carpetArea: 980,
    builtUpArea: 1150,
    superBuiltUpArea: 1350,
    bedrooms: 2,
    bathrooms: 2,
    floor: 5,
    totalFloors: 18,
    parkingSpots: 1,
    facing: 'West',
    yearBuilt: 2022,
    purchaseDate: '2022-09-01',
    purchasePrice: 7800000,
    stampDuty: 468000,
    registrationCharges: 78000,
    otherCharges: 154000,
    totalInvestment: 8500000,
    currentMarketValue: 9200000,
    appreciation: 700000,
    appreciationPercent: 8.24,
    isRented: false,
    hasMortgage: true,
    mortgage: {
      lender: 'ICICI Bank',
      principalAmount: 6000000,
      outstandingAmount: 5200000,
      interestRate: 8.75,
      emiAmount: 57800,
      tenure: 180,
      startDate: '2022-10-01',
      endDate: '2037-09-30',
      emiPaid: 40,
      emiRemaining: 140
    },
    isUnderConstruction: false,
    hasDocuments: true,
    documents: ['Sale Deed', 'OC Certificate', 'Society Formation Docs'],
    amenities: ['Garden', 'Children Play Area', 'Gym', 'Community Hall'],
    notes: 'Previous tenant vacated in Dec 2025. Looking for new tenant.'
  },
  {
    id: 'prop-008',
    name: 'Industrial Warehouse',
    type: 'Industrial',
    status: 'Rented',
    category: 'Investment',
    address: 'Plot 12, MIDC Industrial Area',
    city: 'Nashik',
    state: 'Maharashtra',
    pincode: '422010',
    landmark: 'Ambad',
    carpetArea: 15000,
    builtUpArea: 16500,
    parkingSpots: 20,
    yearBuilt: 2019,
    purchaseDate: '2020-12-01',
    purchasePrice: 28000000,
    stampDuty: 1680000,
    registrationCharges: 280000,
    otherCharges: 540000,
    totalInvestment: 30500000,
    currentMarketValue: 38000000,
    appreciation: 7500000,
    appreciationPercent: 24.59,
    isRented: true,
    rentalIncome: 180000,
    annualRentalYield: 5.68,
    tenant: {
      name: 'FastTrack Logistics India Ltd',
      status: 'Occupied',
      leaseStart: '2021-04-01',
      leaseEnd: '2029-03-31',
      monthlyRent: 180000,
      securityDeposit: 1080000,
      rentDueDate: 15,
      lastPaymentDate: '2026-01-15',
      contactPhone: '+91 253 234 5678',
      contactEmail: 'property@fasttrack.com'
    },
    hasMortgage: false,
    isUnderConstruction: false,
    hasDocuments: true,
    documents: ['Sale Deed', 'MIDC Allotment', 'Factory License', 'Pollution Board NOC'],
    amenities: ['Loading Docks', 'High Ceiling', '3-Phase Power', 'Water Supply', 'Security Cabin']
  }
];

// Builder Projects Data (for builders/developers)
export const builderProjects: BuilderProject[] = [
  {
    id: 'bp-001',
    projectName: 'Sunrise Heights',
    location: 'Andheri East',
    city: 'Mumbai',
    type: 'Residential',
    reraNumber: 'P51800025678',
    launchDate: '2024-03-01',
    possessionDate: '2027-06-30',
    status: 'Under Construction',
    totalUnits: 120,
    soldUnits: 85,
    availableUnits: 30,
    blockedUnits: 5,
    totalProjectValue: 480000000,
    collectedAmount: 289000000,
    pendingAmount: 191000000,
    pricePerSqFt: 18500,
    minPrice: 12500000,
    maxPrice: 28000000,
    constructionProgress: 45,
    unitTypes: [
      { type: '1 BHK', count: 40, size: '550-650 sq ft', price: 12500000 },
      { type: '2 BHK', count: 50, size: '950-1100 sq ft', price: 19000000 },
      { type: '3 BHK', count: 30, size: '1400-1600 sq ft', price: 28000000 }
    ]
  },
  {
    id: 'bp-002',
    projectName: 'Green Valley Villas',
    location: 'Sarjapur Road',
    city: 'Bangalore',
    type: 'Residential',
    reraNumber: 'PRM/KA/RERA/1251/2023',
    launchDate: '2023-09-15',
    possessionDate: '2026-03-31',
    status: 'Under Construction',
    totalUnits: 45,
    soldUnits: 38,
    availableUnits: 5,
    blockedUnits: 2,
    totalProjectValue: 315000000,
    collectedAmount: 252000000,
    pendingAmount: 63000000,
    pricePerSqFt: 8500,
    minPrice: 55000000,
    maxPrice: 85000000,
    constructionProgress: 78,
    unitTypes: [
      { type: '3 BHK Villa', count: 25, size: '2400-2800 sq ft', price: 55000000 },
      { type: '4 BHK Villa', count: 20, size: '3200-3800 sq ft', price: 85000000 }
    ]
  }
];

// Calculate Summary
const calculateSummary = (): RealEstateSummary => {
  const totalProperties = properties.length;
  const totalInvestment = properties.reduce((sum, p) => sum + p.totalInvestment, 0);
  const currentPortfolioValue = properties.reduce((sum, p) => sum + p.currentMarketValue, 0);
  const totalAppreciation = currentPortfolioValue - totalInvestment;
  const appreciationPercent = (totalAppreciation / totalInvestment) * 100;
  
  const rentedProperties = properties.filter(p => p.isRented && p.rentalIncome);
  const totalRentalIncome = rentedProperties.reduce((sum, p) => sum + (p.rentalIncome || 0), 0);
  const annualRentalIncome = totalRentalIncome * 12;
  const averageRentalYield = rentedProperties.length > 0
    ? rentedProperties.reduce((sum, p) => sum + (p.annualRentalYield || 0), 0) / rentedProperties.length
    : 0;
  
  const occupiedProperties = properties.filter(p => p.isRented).length;
  const vacantProperties = properties.filter(p => p.status === 'Vacant').length;
  
  const mortgagedProperties = properties.filter(p => p.hasMortgage && p.mortgage);
  const totalMortgageOutstanding = mortgagedProperties.reduce((sum, p) => sum + (p.mortgage?.outstandingAmount || 0), 0);
  const totalEmiPerMonth = mortgagedProperties.reduce((sum, p) => sum + (p.mortgage?.emiAmount || 0), 0);
  
  const netEquity = currentPortfolioValue - totalMortgageOutstanding;
  
  const residentialValue = properties.filter(p => p.type === 'Residential').reduce((sum, p) => sum + p.currentMarketValue, 0);
  const commercialValue = properties.filter(p => p.type === 'Commercial' || p.type === 'Industrial').reduce((sum, p) => sum + p.currentMarketValue, 0);
  const landValue = properties.filter(p => p.type === 'Land').reduce((sum, p) => sum + p.currentMarketValue, 0);
  const reitValue = properties.filter(p => p.type === 'REIT').reduce((sum, p) => sum + p.currentMarketValue, 0);
  
  return {
    totalProperties,
    totalInvestment,
    currentPortfolioValue,
    totalAppreciation,
    appreciationPercent,
    totalRentalIncome,
    annualRentalIncome,
    averageRentalYield,
    occupiedProperties,
    vacantProperties,
    totalMortgageOutstanding,
    totalEmiPerMonth,
    netEquity,
    residentialValue,
    commercialValue,
    landValue,
    reitValue
  };
};

export const realEstateSummary = calculateSummary();

// Property Value History (last 12 months)
export const propertyValueHistory: PropertyValueHistory[] = [
  { date: 'Feb 25', residential: 65000000, commercial: 75000000, land: 13500000, total: 153500000 },
  { date: 'Mar 25', residential: 65500000, commercial: 75500000, land: 13700000, total: 154700000 },
  { date: 'Apr 25', residential: 66000000, commercial: 76000000, land: 13900000, total: 155900000 },
  { date: 'May 25', residential: 66500000, commercial: 77000000, land: 14100000, total: 157600000 },
  { date: 'Jun 25', residential: 67000000, commercial: 78000000, land: 14300000, total: 159300000 },
  { date: 'Jul 25', residential: 67500000, commercial: 78500000, land: 14500000, total: 160500000 },
  { date: 'Aug 25', residential: 68000000, commercial: 79000000, land: 14700000, total: 161700000 },
  { date: 'Sep 25', residential: 68200000, commercial: 79500000, land: 14800000, total: 162500000 },
  { date: 'Oct 25', residential: 68400000, commercial: 80000000, land: 14900000, total: 163300000 },
  { date: 'Nov 25', residential: 68600000, commercial: 80500000, land: 15000000, total: 164100000 },
  { date: 'Dec 25', residential: 68800000, commercial: 81000000, land: 15000000, total: 164800000 },
  { date: 'Jan 26', residential: 68700000, commercial: 81500000, land: 15000000, total: 165200000 },
];

// Property Allocation
export const propertyAllocation: PropertyAllocation[] = [
  { type: 'Residential', value: 68700000, count: 3, percentage: 41.6, color: '#3b82f6' },
  { type: 'Commercial', value: 81500000, count: 2, percentage: 49.3, color: '#8b5cf6' },
  { type: 'Land', value: 15000000, count: 1, percentage: 9.1, color: '#22c55e' },
  { type: 'REIT', value: 3150000, count: 1, percentage: 1.9, color: '#f59e0b' },
  { type: 'Industrial', value: 38000000, count: 1, percentage: 23.0, color: '#ef4444' },
];

// City-wise Distribution
export const cityDistribution: CityWiseDistribution[] = [
  { city: 'Mumbai', properties: 2, value: 61150000, percentage: 29.5 },
  { city: 'Bangalore', properties: 1, value: 17500000, percentage: 8.4 },
  { city: 'Gurgaon', properties: 1, value: 42000000, percentage: 20.2 },
  { city: 'Pune', properties: 2, value: 24200000, percentage: 11.7 },
  { city: 'Chennai', properties: 1, value: 23500000, percentage: 11.3 },
  { city: 'Nashik', properties: 1, value: 38000000, percentage: 18.3 },
];

// Rental Income Breakdown
export const rentalIncomeBreakdown = [
  { property: 'WTC Office Space', city: 'Mumbai', income: 175000, yield: 3.62 },
  { property: 'Industrial Warehouse', city: 'Nashik', income: 180000, yield: 5.68 },
  { property: 'Retail Shop', city: 'Chennai', income: 95000, yield: 4.85 },
  { property: 'Premium Apartment', city: 'Bangalore', income: 45000, yield: 3.09 },
  { property: 'REIT Dividends', city: 'Pan India', income: 18750, yield: 7.14 },
];

// Mortgage Summary
export const mortgageSummary = {
  totalLoanAmount: 44000000,
  totalOutstanding: 39550000,
  totalPaid: 4450000,
  averageInterestRate: 8.5,
  totalEmi: 392300,
  properties: [
    { 
      name: 'Premium Apartment - Bangalore', 
      lender: 'HDFC Bank',
      outstanding: 7850000, 
      emi: 89500, 
      rate: 8.5,
      remainingYears: 14.2
    },
    { 
      name: 'Villa - Gurgaon', 
      lender: 'SBI',
      outstanding: 26500000, 
      emi: 245000, 
      rate: 8.25,
      remainingYears: 13.1
    },
    { 
      name: 'Flat - Pune', 
      lender: 'ICICI Bank',
      outstanding: 5200000, 
      emi: 57800, 
      rate: 8.75,
      remainingYears: 11.7
    },
  ]
};

// Upcoming Events
export const upcomingEvents = [
  { type: 'rent', title: 'Rent Due - WTC Office', date: '2026-02-01', amount: 175000 },
  { type: 'rent', title: 'Rent Due - Bangalore Apt', date: '2026-02-05', amount: 45000 },
  { type: 'emi', title: 'EMI - HDFC Bank', date: '2026-02-05', amount: 89500 },
  { type: 'emi', title: 'EMI - SBI Home Loan', date: '2026-02-05', amount: 245000 },
  { type: 'rent', title: 'Rent Due - Retail Shop', date: '2026-02-10', amount: 95000 },
  { type: 'milestone', title: 'Villa Construction Update', date: '2026-02-15', amount: 0 },
  { type: 'emi', title: 'EMI - ICICI Bank', date: '2026-02-15', amount: 57800 },
  { type: 'lease', title: 'Lease Renewal - Bangalore Apt', date: '2025-05-31', amount: 0 },
];
