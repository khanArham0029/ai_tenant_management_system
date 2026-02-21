import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { CheckCircle, XCircle, Clock, RotateCcw } from 'lucide-react';
import { mockRentPayments, RentPayment } from '../../data/mockData';

export function RentManagement() {
  const [payments, setPayments] = useState<RentPayment[]>(mockRentPayments);

  const handleMarkAsPaid = (id: string) => {
    setPayments(payments.map(p =>
      p.id === id
        ? { ...p, status: 'paid', paidDate: new Date().toISOString().split('T')[0] }
        : p
    ));
  };

  const handleMarkAsPending = (id: string) => {
    setPayments(payments.map(p =>
      p.id === id
        ? { ...p, status: 'pending', paidDate: undefined }
        : p
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-500">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'overdue':
        return (
          <Badge className="bg-red-500">
            <XCircle className="w-3 h-3 mr-1" />
            Overdue
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const currentMonthPayments = payments.filter(p => p.month === 'February 2026');
  const totalCollected = currentMonthPayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = currentMonthPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl">Rent Management</h2>
        <p className="text-gray-500">Track and manage rent payments from all tenants</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Expected (Feb 2026)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">Rs. {(totalCollected + totalPending).toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-600">Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">Rs. {totalCollected.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              {currentMonthPayments.filter(p => p.status === 'paid').length} of {currentMonthPayments.length} paid
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-yellow-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-yellow-600">Rs. {totalPending.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              {currentMonthPayments.filter(p => p.status === 'pending').length} payment(s) pending
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Current Month Payments */}
      <Card>
        <CardHeader>
          <CardTitle>February 2026 Rent Status</CardTitle>
          <CardDescription>Current month rent collection status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant Name</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Paid Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentMonthPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.tenantName}</TableCell>
                  <TableCell>{payment.month}</TableCell>
                  <TableCell>Rs. {payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>{payment.paidDate || '-'}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {payment.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleMarkAsPaid(payment.id)}
                        >
                          Mark as Paid
                        </Button>
                      )}
                      {payment.status === 'paid' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          title="Undo payment"
                          onClick={() => handleMarkAsPending(payment.id)}
                        >
                          <RotateCcw className="w-4 h-4 text-gray-500" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>All previous rent payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant Name</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Paid Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.filter(p => p.month !== 'February 2026').map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.tenantName}</TableCell>
                  <TableCell>{payment.month}</TableCell>
                  <TableCell>Rs. {payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>{payment.paidDate || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
