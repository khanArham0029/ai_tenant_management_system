import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Plus, Phone, CreditCard, Calendar } from 'lucide-react';
import { mockTenants, Tenant } from '../../data/mockData';

export function TenantsManagement() {
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTenant, setNewTenant] = useState<Partial<Tenant>>({
    name: '',
    unit: '',
    phone: '',
    cnic: '',
    monthlyRent: 0,
    agreementStart: '',
    agreementEnd: '',
    securityDeposit: 0,
  });

  const handleAddTenant = () => {
    const tenant: Tenant = {
      id: String(Date.now()),
      name: newTenant.name || '',
      unit: newTenant.unit || '',
      phone: newTenant.phone || '',
      cnic: newTenant.cnic || '',
      monthlyRent: newTenant.monthlyRent || 0,
      agreementStart: newTenant.agreementStart || '',
      agreementEnd: newTenant.agreementEnd || '',
      status: 'active',
      securityDeposit: newTenant.securityDeposit || 0,
    };

    setTenants([...tenants, tenant]);
    setIsAddDialogOpen(false);
    setNewTenant({
      name: '',
      unit: '',
      phone: '',
      cnic: '',
      monthlyRent: 0,
      agreementStart: '',
      agreementEnd: '',
      securityDeposit: 0,
    });
  };

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Tenants Management</h2>
          <p className="text-gray-500">Manage all your tenants and their information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Tenant
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Tenant</DialogTitle>
              <DialogDescription>Enter the details of the new tenant</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tenant Name</Label>
                  <Input
                    id="name"
                    value={newTenant.name}
                    onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit/Shop</Label>
                  <Input
                    id="unit"
                    value={newTenant.unit}
                    onChange={(e) => setNewTenant({ ...newTenant, unit: e.target.value })}
                    placeholder="e.g., Shop 5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newTenant.phone}
                    onChange={(e) => setNewTenant({ ...newTenant, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnic">CNIC</Label>
                  <Input
                    id="cnic"
                    value={newTenant.cnic}
                    onChange={(e) => setNewTenant({ ...newTenant, cnic: e.target.value })}
                    placeholder="42101-1234567-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rent">Monthly Rent (Rs.)</Label>
                  <Input
                    id="rent"
                    type="number"
                    value={newTenant.monthlyRent}
                    onChange={(e) => setNewTenant({ ...newTenant, monthlyRent: Number(e.target.value) })}
                    placeholder="25000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deposit">Security Deposit (Rs.)</Label>
                  <Input
                    id="deposit"
                    type="number"
                    value={newTenant.securityDeposit}
                    onChange={(e) => setNewTenant({ ...newTenant, securityDeposit: Number(e.target.value) })}
                    placeholder="50000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start">Agreement Start</Label>
                  <Input
                    id="start"
                    type="date"
                    value={newTenant.agreementStart}
                    onChange={(e) => setNewTenant({ ...newTenant, agreementStart: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end">Agreement End</Label>
                  <Input
                    id="end"
                    type="date"
                    value={newTenant.agreementEnd}
                    onChange={(e) => setNewTenant({ ...newTenant, agreementEnd: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTenant}>Add Tenant</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tenants</CardTitle>
          <CardDescription>Complete list of tenants in your property</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>CNIC</TableHead>
                <TableHead>Monthly Rent</TableHead>
                <TableHead>Agreement Period</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell>{tenant.name}</TableCell>
                  <TableCell>{tenant.unit}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="w-3 h-3" />
                      {tenant.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <CreditCard className="w-3 h-3" />
                      {tenant.cnic}
                    </div>
                  </TableCell>
                  <TableCell>Rs. {tenant.monthlyRent.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-3 h-3" />
                      {new Date(tenant.agreementStart).toLocaleDateString()} - {new Date(tenant.agreementEnd).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(tenant.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
