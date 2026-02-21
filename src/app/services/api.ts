import {
    Tenant,
    RentPayment,
    Expenditure,
    MaintenanceRequest,
    UtilityReading,
    mockTenants,
    mockRentPayments,
    mockExpenditures,
    mockMaintenanceRequests,
    mockUtilityReadings
} from '../data/mockData';

// Simulated network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Temporary mutable state to mock a database for the session
let db = {
    tenants: [...mockTenants],
    rentPayments: [...mockRentPayments],
    expenditures: [...mockExpenditures],
    maintenanceRequests: [...mockMaintenanceRequests],
    utilityReadings: [...mockUtilityReadings],
};

// --- Tenants API ---
export const getTenants = async (): Promise<Tenant[]> => {
    await delay(600);
    return [...db.tenants];
};

export const addTenant = async (tenantData: Partial<Tenant>): Promise<Tenant> => {
    await delay(800);
    const newTenant: Tenant = {
        ...tenantData,
        id: String(Date.now()),
    } as Tenant;
    db.tenants = [...db.tenants, newTenant];
    return newTenant;
};

export const updateTenant = async (id: string, tenantData: Partial<Tenant>): Promise<Tenant> => {
    await delay(600);
    const index = db.tenants.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Tenant not found');

    db.tenants[index] = { ...db.tenants[index], ...tenantData };
    return db.tenants[index];
};

export const deleteTenant = async (id: string): Promise<void> => {
    await delay(600);
    db.tenants = db.tenants.filter(t => t.id !== id);
};

// --- Rent Payments API ---
export const getRentPayments = async (): Promise<RentPayment[]> => {
    await delay(600);
    return [...db.rentPayments];
};

export const updateRentPaymentStatus = async (id: string, status: 'paid' | 'pending' | 'overdue', paidDate?: string): Promise<RentPayment> => {
    await delay(400);
    const index = db.rentPayments.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Payment not found');

    db.rentPayments[index] = {
        ...db.rentPayments[index],
        status,
        ...(paidDate !== undefined ? { paidDate } : { paidDate: undefined })
    };
    return db.rentPayments[index];
};

// --- Expenditures API ---
export const getExpenditures = async (): Promise<Expenditure[]> => {
    await delay(600);
    return [...db.expenditures];
};

export const addExpenditure = async (expData: Partial<Expenditure>): Promise<Expenditure> => {
    await delay(800);
    const newExp: Expenditure = {
        ...expData,
        id: String(Date.now()),
    } as Expenditure;
    db.expenditures = [newExp, ...db.expenditures]; // Add to front for chronological mock
    return newExp;
};

export const updateExpenditure = async (id: string, expData: Partial<Expenditure>): Promise<Expenditure> => {
    await delay(600);
    const index = db.expenditures.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Expenditure not found');

    db.expenditures[index] = { ...db.expenditures[index], ...expData };
    return db.expenditures[index];
};

export const deleteExpenditure = async (id: string): Promise<void> => {
    await delay(600);
    db.expenditures = db.expenditures.filter(e => e.id !== id);
};
