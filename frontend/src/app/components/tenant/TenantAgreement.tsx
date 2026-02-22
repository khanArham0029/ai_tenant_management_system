import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Download, FileText, Calendar, DollarSign, Shield } from 'lucide-react';
import { Tenant } from '../../data/types';

interface TenantAgreementProps {
  tenant: Tenant;
}

export function TenantAgreement({ tenant }: TenantAgreementProps) {
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

  const getDaysRemaining = () => {
    const today = new Date('2026-02-19');
    const end = new Date(tenant.agreementEnd);
    const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl">My Agreement</h2>
        <p className="text-gray-500">View your tenancy agreement details</p>
      </div>

      {/* Agreement Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <CardTitle>Tenancy Agreement</CardTitle>
                <CardDescription>{tenant.unit}</CardDescription>
              </div>
            </div>
            {getStatusBadge(tenant.status)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Download Agreement
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              View Full Document
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Agreement Details */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg">Agreement Period</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="text-lg">{new Date(tenant.agreementStart).toLocaleDateString('en-PK', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">End Date</p>
              <p className="text-lg">{new Date(tenant.agreementEnd).toLocaleDateString('en-PK', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Days Remaining</p>
              <p className="text-lg font-semibold text-blue-600">
                {getDaysRemaining() > 0 ? `${getDaysRemaining()} days` : 'Expired'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <CardTitle className="text-lg">Financial Terms</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Monthly Rent</p>
              <p className="text-lg">Rs. {tenant.monthlyRent.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Security Deposit</p>
              <p className="text-lg">Rs. {tenant.securityDeposit.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Rent Due Date</p>
              <p className="text-lg">1st of every month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="text-lg">{tenant.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Unit/Shop</p>
              <p className="text-lg">{tenant.unit}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="text-lg">{tenant.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">CNIC</p>
              <p className="text-lg">{tenant.cnic}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agreement Terms */}
      <Card>
        <CardHeader>
          <CardTitle>Key Agreement Terms</CardTitle>
          <CardDescription>Important points from your tenancy agreement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-blue-600">1</span>
              </div>
              <p>Rent is due on the 1st of every month. Late payments may incur additional charges.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-blue-600">2</span>
              </div>
              <p>The security deposit of Rs. {tenant.securityDeposit.toLocaleString()} will be refunded at the end of the tenancy period, subject to property inspection.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-blue-600">3</span>
              </div>
              <p>Tenant is responsible for utility bills (electricity and gas) based on sub-meter readings.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-blue-600">4</span>
              </div>
              <p>Maintenance requests should be submitted through the tenant portal for owner approval.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-blue-600">5</span>
              </div>
              <p>Either party must provide 2 months notice before terminating the agreement.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Renewal Notice */}
      {tenant.status === 'expiring_soon' && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-yellow-600" />
              <CardTitle className="text-yellow-900">Agreement Expiring Soon</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-yellow-800">
            <p className="mb-3">
              Your agreement will expire in {getDaysRemaining()} days. Please contact the property owner to discuss renewal terms.
            </p>
            <Button className="bg-yellow-600 hover:bg-yellow-700">
              Request Renewal
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
