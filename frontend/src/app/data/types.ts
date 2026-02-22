export interface Tenant {
  id: number;
  name: string;
  unit: string;
  phone: string;
  cnic: string;
  monthlyRent: number;
  agreementStart: string;
  agreementEnd: string;
  status: 'active' | 'expiring_soon' | 'expired';
  securityDeposit: number;
}

export interface RentPayment {
  id: number;
  tenantId: number;
  tenantName: string;
  month: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
}

export interface Expenditure {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  type: 'maintenance' | 'tax' | 'utility' | 'other';
}

export interface MaintenanceRequest {
  id: number;
  tenantId: number;
  tenantName: string;
  unit: string;
  category: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  dateSubmitted: string;
  priority: 'low' | 'medium' | 'high';
}

export interface UtilityReading {
  id: number;
  tenantId: number;
  tenantName: string;
  unit: string;
  month: string;
  electricityUnits: number;
  gasUnits: number;
  electricityRate: number;
  gasRate: number;
  electricityBill: number;
  gasBill: number;
  totalBill: number;
}

export const mockTenants: Tenant[] = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    unit: 'Shop 1',
    phone: '+92 300 1234567',
    cnic: '42101-1234567-1',
    monthlyRent: 25000,
    agreementStart: '2024-01-01',
    agreementEnd: '2025-12-31',
    status: 'active',
    securityDeposit: 50000,
  },
  {
    id: 2,
    name: 'Fatima Khan',
    unit: 'Shop 2',
    phone: '+92 321 7654321',
    cnic: '42101-7654321-2',
    monthlyRent: 30000,
    agreementStart: '2024-06-01',
    agreementEnd: '2026-05-31',
    status: 'active',
    securityDeposit: 60000,
  },
  {
    id: 3,
    name: 'Muhammad Ali',
    unit: 'Shop 3',
    phone: '+92 333 9876543',
    cnic: '42101-9876543-3',
    monthlyRent: 20000,
    agreementStart: '2023-03-01',
    agreementEnd: '2025-02-28',
    status: 'expiring_soon',
    securityDeposit: 40000,
  },
  {
    id: 4,
    name: 'Ayesha Malik',
    unit: 'Shop 4',
    phone: '+92 345 1122334',
    cnic: '42101-1122334-4',
    monthlyRent: 28000,
    agreementStart: '2024-09-01',
    agreementEnd: '2026-08-31',
    status: 'active',
    securityDeposit: 56000,
  },
];

export const mockRentPayments: RentPayment[] = [
  {
    id: 1,
    tenantId: 1,
    tenantName: 'Ahmed Hassan',
    month: 'February 2026',
    amount: 25000,
    status: 'pending',
  },
  {
    id: 2,
    tenantId: 2,
    tenantName: 'Fatima Khan',
    month: 'February 2026',
    amount: 30000,
    status: 'paid',
    paidDate: '2026-02-01',
  },
  {
    id: 3,
    tenantId: 3,
    tenantName: 'Muhammad Ali',
    month: 'February 2026',
    amount: 20000,
    status: 'paid',
    paidDate: '2026-02-05',
  },
  {
    id: 4,
    tenantId: 4,
    tenantName: 'Ayesha Malik',
    month: 'February 2026',
    amount: 28000,
    status: 'pending',
  },
  {
    id: 5,
    tenantId: 1,
    tenantName: 'Ahmed Hassan',
    month: 'January 2026',
    amount: 25000,
    status: 'paid',
    paidDate: '2026-01-10',
  },
  {
    id: 6,
    tenantId: 2,
    tenantName: 'Fatima Khan',
    month: 'January 2026',
    amount: 30000,
    status: 'paid',
    paidDate: '2026-01-02',
  },
];

export const mockExpenditures: Expenditure[] = [
  {
    id: 1,
    date: '2026-02-15',
    category: 'Building Maintenance',
    description: 'Roof repair work',
    amount: 15000,
    type: 'maintenance',
  },
  {
    id: 2,
    date: '2026-02-10',
    category: 'Property Tax',
    description: 'Q1 2026 property tax',
    amount: 12000,
    type: 'tax',
  },
  {
    id: 3,
    date: '2026-02-05',
    category: 'Electricity',
    description: 'Common area electricity bill',
    amount: 5000,
    type: 'utility',
  },
  {
    id: 4,
    date: '2026-01-28',
    category: 'Plumbing',
    description: 'Water tank cleaning',
    amount: 8000,
    type: 'maintenance',
  },
  {
    id: 5,
    date: '2026-01-20',
    category: 'Security',
    description: 'Security guard salary',
    amount: 20000,
    type: 'other',
  },
];

export const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: 1,
    tenantId: 1,
    tenantName: 'Ahmed Hassan',
    unit: 'Shop 1',
    category: 'Electrical',
    description: 'Light switch in the main hall is not working',
    status: 'pending',
    dateSubmitted: '2026-02-18',
    priority: 'medium',
  },
  {
    id: 2,
    tenantId: 3,
    tenantName: 'Muhammad Ali',
    unit: 'Shop 3',
    category: 'Plumbing',
    description: 'Water leakage from bathroom ceiling',
    status: 'pending',
    dateSubmitted: '2026-02-19',
    priority: 'high',
  },
  {
    id: 3,
    tenantId: 2,
    tenantName: 'Fatima Khan',
    unit: 'Shop 2',
    category: 'AC/Cooling',
    description: 'Air conditioner making loud noise',
    status: 'approved',
    dateSubmitted: '2026-02-17',
    priority: 'low',
  },
  {
    id: 4,
    tenantId: 4,
    tenantName: 'Ayesha Malik',
    unit: 'Shop 4',
    category: 'General',
    description: 'Door lock needs replacement',
    status: 'completed',
    dateSubmitted: '2026-02-10',
    priority: 'medium',
  },
];

export const mockUtilityReadings: UtilityReading[] = [
  {
    id: 1,
    tenantId: 1,
    tenantName: 'Ahmed Hassan',
    unit: 'Shop 1',
    month: 'January 2026',
    electricityUnits: 450,
    gasUnits: 120,
    electricityRate: 18,
    gasRate: 25,
    electricityBill: 8100,
    gasBill: 3000,
    totalBill: 11100,
  },
  {
    id: 2,
    tenantId: 2,
    tenantName: 'Fatima Khan',
    unit: 'Shop 2',
    month: 'January 2026',
    electricityUnits: 520,
    gasUnits: 150,
    electricityRate: 18,
    gasRate: 25,
    electricityBill: 9360,
    gasBill: 3750,
    totalBill: 13110,
  },
  {
    id: 3,
    tenantId: 3,
    tenantName: 'Muhammad Ali',
    unit: 'Shop 3',
    month: 'January 2026',
    electricityUnits: 380,
    gasUnits: 100,
    electricityRate: 18,
    gasRate: 25,
    electricityBill: 6840,
    gasBill: 2500,
    totalBill: 9340,
  },
  {
    id: 4,
    tenantId: 4,
    tenantName: 'Ayesha Malik',
    unit: 'Shop 4',
    month: 'January 2026',
    electricityUnits: 470,
    gasUnits: 130,
    electricityRate: 18,
    gasRate: 25,
    electricityBill: 8460,
    gasBill: 3250,
    totalBill: 11710,
  },
];
