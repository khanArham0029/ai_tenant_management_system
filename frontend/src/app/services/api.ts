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
} from '../data/types';

const API_BASE_URL = 'http://localhost:8000/api';

// Temporary mutable state for endpoints not yet built in backend (like maintenance)
let db = {
    maintenanceRequests: [...mockMaintenanceRequests],
    utilityReadings: [...mockUtilityReadings],
};

// --- Tenants API ---
export const getTenants = async (): Promise<Tenant[]> => {
    const response = await fetch(`${API_BASE_URL}/tenants/`);
    if (!response.ok) throw new Error('Failed to fetch tenants');
    return response.json();
};

export const addTenant = async (tenantData: Partial<Tenant>): Promise<Tenant> => {
    const response = await fetch(`${API_BASE_URL}/tenants/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tenantData)
    });
    if (!response.ok) throw new Error('Failed to add tenant');
    return response.json();
};

export const updateTenant = async (id: number, tenantData: Partial<Tenant>): Promise<Tenant> => {
    const response = await fetch(`${API_BASE_URL}/tenants/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tenantData)
    });
    if (!response.ok) throw new Error('Failed to update tenant');
    return response.json();
};

export const deleteTenant = async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/tenants/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete tenant');
};

// --- Rent Payments API ---
export const getRentPayments = async (): Promise<RentPayment[]> => {
    const response = await fetch(`${API_BASE_URL}/rent/`);
    if (!response.ok) throw new Error('Failed to fetch rent payments');
    return response.json();
};

export const updateRentPaymentStatus = async (id: number, status: 'paid' | 'pending' | 'overdue', paidDate?: string): Promise<RentPayment> => {
    const body = { status, ...(paidDate !== undefined && { paid_date: paidDate }) };
    const response = await fetch(`${API_BASE_URL}/rent/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    if (!response.ok) throw new Error('Failed to update rent payment status');

    // Convert snake_case from python backend back to camelCase for frontend
    const data = await response.json();
    return {
        ...data,
        paidDate: data.paid_date
    };
};

// --- Expenditures API ---
export const getExpenditures = async (): Promise<Expenditure[]> => {
    const response = await fetch(`${API_BASE_URL}/expenditures/`);
    if (!response.ok) throw new Error('Failed to fetch expenditures');
    return response.json();
};

export const addExpenditure = async (expData: Partial<Expenditure>): Promise<Expenditure> => {
    const response = await fetch(`${API_BASE_URL}/expenditures/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expData)
    });
    if (!response.ok) throw new Error('Failed to add expenditure');
    return response.json();
};

export const updateExpenditure = async (id: number, expData: Partial<Expenditure>): Promise<Expenditure> => {
    const response = await fetch(`${API_BASE_URL}/expenditures/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expData)
    });
    if (!response.ok) throw new Error('Failed to update expenditure');
    return response.json();
};

export const deleteExpenditure = async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/expenditures/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete expenditure');
};
