import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Plus, TrendingDown } from 'lucide-react';
import { mockExpenditures, Expenditure } from '../../data/mockData';
import { Textarea } from '../ui/textarea';

export function ExpenditureManagement() {
  const [expenditures, setExpenditures] = useState<Expenditure[]>(mockExpenditures);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newExpenditure, setNewExpenditure] = useState<Partial<Expenditure>>({
    date: '',
    category: '',
    description: '',
    amount: 0,
    type: 'other',
  });

  const handleAddExpenditure = () => {
    const expenditure: Expenditure = {
      id: String(Date.now()),
      date: newExpenditure.date || new Date().toISOString().split('T')[0],
      category: newExpenditure.category || '',
      description: newExpenditure.description || '',
      amount: newExpenditure.amount || 0,
      type: newExpenditure.type || 'other',
    };

    setExpenditures([expenditure, ...expenditures]);
    setIsAddDialogOpen(false);
    setNewExpenditure({
      date: '',
      category: '',
      description: '',
      amount: 0,
      type: 'other',
    });
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      maintenance: 'bg-blue-500',
      tax: 'bg-purple-500',
      utility: 'bg-yellow-500',
      other: 'bg-gray-500',
    };
    return <Badge className={colors[type]}>{type}</Badge>;
  };

  const totalExpenditure = expenditures.reduce((sum, e) => sum + e.amount, 0);
  const monthlyExpenditure = expenditures
    .filter(e => e.date.startsWith('2026-02'))
    .reduce((sum, e) => sum + e.amount, 0);

  const expenditureByType = expenditures.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Expenditure Management</h2>
          <p className="text-gray-500">Track all property-related expenses</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Expenditure
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Expenditure</DialogTitle>
              <DialogDescription>Record a new expense for your property</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="exp-date">Date</Label>
                <Input
                  id="exp-date"
                  type="date"
                  value={newExpenditure.date}
                  onChange={(e) => setNewExpenditure({ ...newExpenditure, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exp-type">Type</Label>
                <Select
                  value={newExpenditure.type}
                  onValueChange={(value) => setNewExpenditure({ ...newExpenditure, type: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="tax">Tax</SelectItem>
                    <SelectItem value="utility">Utility</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="exp-category">Category</Label>
                <Input
                  id="exp-category"
                  value={newExpenditure.category}
                  onChange={(e) => setNewExpenditure({ ...newExpenditure, category: e.target.value })}
                  placeholder="e.g., Plumbing, Electrical"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exp-description">Description</Label>
                <Textarea
                  id="exp-description"
                  value={newExpenditure.description}
                  onChange={(e) => setNewExpenditure({ ...newExpenditure, description: e.target.value })}
                  placeholder="Detailed description of the expense"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exp-amount">Amount (Rs.)</Label>
                <Input
                  id="exp-amount"
                  type="number"
                  value={newExpenditure.amount}
                  onChange={(e) => setNewExpenditure({ ...newExpenditure, amount: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddExpenditure}>Add Expenditure</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Expenditure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-600">Rs. {totalExpenditure.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">Rs. {monthlyExpenditure.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">February 2026</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">Rs. {(expenditureByType.maintenance || 0).toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Total spent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tax & Utilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">Rs. {((expenditureByType.tax || 0) + (expenditureByType.utility || 0)).toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Combined</p>
          </CardContent>
        </Card>
      </div>

      {/* Expenditure List */}
      <Card>
        <CardHeader>
          <CardTitle>All Expenditures</CardTitle>
          <CardDescription>Complete record of all expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenditures.map((expenditure) => (
                <TableRow key={expenditure.id}>
                  <TableCell>{new Date(expenditure.date).toLocaleDateString()}</TableCell>
                  <TableCell>{getTypeBadge(expenditure.type)}</TableCell>
                  <TableCell>{expenditure.category}</TableCell>
                  <TableCell>{expenditure.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-red-600">
                      <TrendingDown className="w-3 h-3" />
                      Rs. {expenditure.amount.toLocaleString()}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
