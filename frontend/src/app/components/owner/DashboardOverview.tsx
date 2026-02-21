import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { DollarSign, Users, TrendingUp, AlertCircle, Zap, Flame } from 'lucide-react';
import { mockTenants, mockRentPayments, mockExpenditures, mockMaintenanceRequests } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function DashboardOverview() {
  // Calculate statistics
  const totalRent = mockRentPayments
    .filter(p => p.month === 'February 2026')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalExpenditure = mockExpenditures
    .filter(e => e.date.startsWith('2026-02'))
    .reduce((sum, e) => sum + e.amount, 0);

  const netIncome = totalRent - totalExpenditure;

  const pendingRequests = mockMaintenanceRequests.filter(r => r.status === 'pending').length;

  const expiringAgreements = mockTenants.filter(t => t.status === 'expiring_soon').length;

  // Chart data
  const monthlyData = [
    { month: 'Oct', income: 98000, expense: 35000 },
    { month: 'Nov', income: 103000, expense: 42000 },
    { month: 'Dec', income: 103000, expense: 38000 },
    { month: 'Jan', income: 103000, expense: 45000 },
    { month: 'Feb', income: totalRent, expense: totalExpenditure },
  ];

  const tenantStatusData = [
    { name: 'Active', value: mockTenants.filter(t => t.status === 'active').length, color: '#00AC4F' },
    { name: 'Expiring Soon', value: expiringAgreements, color: '#f59e0b' },
    { name: 'Expired', value: mockTenants.filter(t => t.status === 'expired').length, color: '#ff4545' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-white to-[#F4FBFF]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Monthly Rent</CardTitle>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D3FFE7] to-[#EFFFF6] flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-[#00AC4F]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#013557]">Rs. {totalRent.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">February 2026</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-[#F4FBFF]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Monthly Expenditure</CardTitle>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D3FFE7] to-[#EFFFF6] flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-[#00AC4F]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#013557]">Rs. {totalExpenditure.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">February 2026</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-[#F4FBFF]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Net Income</CardTitle>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D3FFE7] to-[#EFFFF6] flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-[#00AC4F]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#00AC4F]">Rs. {netIncome.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-[#F4FBFF]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Active Tenants</CardTitle>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D3FFE7] to-[#EFFFF6] flex items-center justify-center">
              <Users className="h-5 w-5 text-[#00AC4F]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#013557]">{mockTenants.length}</div>
            <p className="text-xs text-gray-500 mt-1">Total units occupied</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {(pendingRequests > 0 || expiringAgreements > 0) && (
        <div className="grid gap-4 md:grid-cols-2">
          {pendingRequests > 0 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <CardTitle className="text-sm">Pending Maintenance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  You have <span className="font-semibold">{pendingRequests}</span> pending maintenance request(s) waiting for approval.
                </p>
              </CardContent>
            </Card>
          )}

          {expiringAgreements > 0 && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <CardTitle className="text-sm">Expiring Agreements</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  <span className="font-semibold">{expiringAgreements}</span> agreement(s) expiring within 3 months. Review renewal status.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expenditure</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `Rs. ${value.toLocaleString()}`} />
                <Bar dataKey="income" fill="#00AC4F" name="Income" />
                <Bar dataKey="expense" fill="#ff4545" name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tenant Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tenantStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {tenantStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm">
                  <span className="font-semibold">4 active tenants</span> across all units
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm">
                  Total security deposits: <span className="font-semibold">Rs. {mockTenants.reduce((sum, t) => sum + t.securityDeposit, 0).toLocaleString()}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Zap className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm">
                  Utility monitoring available for <span className="font-semibold">electricity & gas</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}