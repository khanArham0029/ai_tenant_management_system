import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Plus, Phone, CreditCard, Calendar, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Tenant } from '../../data/types';
import { getTenants, addTenant as apiAddTenant, updateTenant as apiUpdateTenant, deleteTenant as apiDeleteTenant } from '../../services/api';

export function TenantsManagement() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState<Tenant | null>(null);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    setIsLoading(true);
    try {
      const data = await getTenants();
      setTenants(data);
    } catch (error) {
      console.error('Failed to fetch tenants:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTenant = async () => {
    setIsSubmitting(true);
    try {
      const newCreatedTenant = await apiAddTenant(newTenant);
      setTenants([newCreatedTenant, ...tenants]);
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
    } catch (error) {
      console.error('Failed to add tenant:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditDialog = (tenant: Tenant) => {
    setEditingTenant(tenant);
    setIsEditDialogOpen(true);
  };

  const handleUpdateTenant = async () => {
    if (!editingTenant) return;
    setIsSubmitting(true);
    try {
      const updatedData = await apiUpdateTenant(editingTenant.id, editingTenant);
      setTenants(tenants.map(t => t.id === updatedData.id ? updatedData : t));
      setIsEditDialogOpen(false);
      setEditingTenant(null);
    } catch (error) {
      console.error('Failed to update tenant:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteDialog = (tenant: Tenant) => {
    setTenantToDelete(tenant);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!tenantToDelete) return;
    setIsSubmitting(true);
    try {
      await apiDeleteTenant(tenantToDelete.id);
      setTenants(tenants.filter(t => t.id !== tenantToDelete.id));
      setIsDeleteDialogOpen(false);
      setTenantToDelete(null);
    } catch (error) {
      console.error('Failed to delete tenant:', error);
    } finally {
      setIsSubmitting(false);
    }
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
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleAddTenant} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Add Tenant
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Tenant</DialogTitle>
            <DialogDescription>Modify the details of the tenant</DialogDescription>
          </DialogHeader>
          {editingTenant && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Tenant Name</Label>
                  <Input
                    id="edit-name"
                    value={editingTenant.name}
                    onChange={(e) => setEditingTenant({ ...editingTenant, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-unit">Unit/Shop</Label>
                  <Input
                    id="edit-unit"
                    value={editingTenant.unit}
                    onChange={(e) => setEditingTenant({ ...editingTenant, unit: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input
                    id="edit-phone"
                    value={editingTenant.phone}
                    onChange={(e) => setEditingTenant({ ...editingTenant, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-cnic">CNIC</Label>
                  <Input
                    id="edit-cnic"
                    value={editingTenant.cnic}
                    onChange={(e) => setEditingTenant({ ...editingTenant, cnic: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-rent">Monthly Rent (Rs.)</Label>
                  <Input
                    id="edit-rent"
                    type="number"
                    value={editingTenant.monthlyRent}
                    onChange={(e) => setEditingTenant({ ...editingTenant, monthlyRent: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-deposit">Security Deposit (Rs.)</Label>
                  <Input
                    id="edit-deposit"
                    type="number"
                    value={editingTenant.securityDeposit}
                    onChange={(e) => setEditingTenant({ ...editingTenant, securityDeposit: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-start">Agreement Start</Label>
                  <Input
                    id="edit-start"
                    type="date"
                    value={editingTenant.agreementStart}
                    onChange={(e) => setEditingTenant({ ...editingTenant, agreementStart: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-end">Agreement End</Label>
                  <Input
                    id="edit-end"
                    type="date"
                    value={editingTenant.agreementEnd}
                    onChange={(e) => setEditingTenant({ ...editingTenant, agreementEnd: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleUpdateTenant} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Tenant</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {tenantToDelete?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>All Tenants</CardTitle>
          <CardDescription>Complete list of tenants in your property</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          ) : (
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
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No tenants found. Click "Add Tenant" to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  tenants.map((tenant) => (
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
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(tenant)}>
                            <Pencil className="w-4 h-4 text-blue-500" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(tenant)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
