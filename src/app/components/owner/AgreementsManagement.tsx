import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { FileText, Calendar, AlertTriangle, Download } from 'lucide-react';
import { mockTenants } from '../../data/mockData';

export function AgreementsManagement() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'expiring_soon':
        return <Badge className="bg-yellow-500">Expiring Soon</Badge>;
      case 'expired':
        return <Badge className="bg-red-500">Expired</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getDaysRemaining = (endDate: string) => {
    const today = new Date('2026-02-19');
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const activeAgreements = mockTenants.filter(t => t.status === 'active');
  const expiringAgreements = mockTenants.filter(t => t.status === 'expiring_soon');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl">Agreements Management</h2>
        <p className="text-gray-500">View and manage all tenant agreements</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Agreements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{mockTenants.length}</div>
            <p className="text-xs text-gray-500 mt-1">Active contracts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-yellow-600">Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-yellow-600">{expiringAgreements.length}</div>
            <p className="text-xs text-gray-500 mt-1">Within 3 months</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Security Deposits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">Rs. {mockTenants.reduce((sum, t) => sum + t.securityDeposit, 0).toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Held in escrow</p>
          </CardContent>
        </Card>
      </div>

      {/* Expiring Soon Alert */}
      {expiringAgreements.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <CardTitle className="text-yellow-900">Agreements Expiring Soon</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {expiringAgreements.map(tenant => (
              <div key={tenant.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <p><span className="font-semibold">{tenant.name}</span> - {tenant.unit}</p>
                  <p className="text-sm text-gray-500">
                    Expires on {new Date(tenant.agreementEnd).toLocaleDateString()} ({getDaysRemaining(tenant.agreementEnd)} days remaining)
                  </p>
                </div>
                <Button size="sm">Contact Tenant</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* All Agreements */}
      <div className="grid gap-4">
        {mockTenants.map(tenant => (
          <Card key={tenant.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{tenant.name}</CardTitle>
                    <CardDescription>{tenant.unit}</CardDescription>
                  </div>
                </div>
                {getStatusBadge(tenant.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-sm text-gray-500">Agreement Period</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-sm">
                      {new Date(tenant.agreementStart).toLocaleDateString()} - {new Date(tenant.agreementEnd).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Monthly Rent</p>
                  <p className="mt-1">Rs. {tenant.monthlyRent.toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Security Deposit</p>
                  <p className="mt-1">Rs. {tenant.securityDeposit.toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Days Remaining</p>
                  <p className="mt-1">
                    {getDaysRemaining(tenant.agreementEnd) > 0
                      ? `${getDaysRemaining(tenant.agreementEnd)} days`
                      : 'Expired'
                    }
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button size="sm" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>

              {/* Agreement Details */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm">
                <p className="mb-2"><span className="font-semibold">Contact:</span> {tenant.phone}</p>
                <p><span className="font-semibold">CNIC:</span> {tenant.cnic}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
