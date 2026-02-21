import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Zap, Flame, Calculator, Plus } from 'lucide-react';
import { mockUtilityReadings, mockTenants, UtilityReading } from '../../data/mockData';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

export function UtilityBillCalculator() {
  const [readings, setReadings] = useState<UtilityReading[]>(mockUtilityReadings);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newReading, setNewReading] = useState({
    tenantId: '',
    month: '',
    electricityUnits: 0,
    gasUnits: 0,
    electricityRate: 18,
    gasRate: 25,
  });

  const handleCalculateBill = () => {
    const tenant = mockTenants.find(t => t.id === newReading.tenantId);
    if (!tenant) return;

    const electricityBill = newReading.electricityUnits * newReading.electricityRate;
    const gasBill = newReading.gasUnits * newReading.gasRate;
    const totalBill = electricityBill + gasBill;

    const reading: UtilityReading = {
      id: String(Date.now()),
      tenantId: newReading.tenantId,
      tenantName: tenant.name,
      unit: tenant.unit,
      month: newReading.month,
      electricityUnits: newReading.electricityUnits,
      gasUnits: newReading.gasUnits,
      electricityRate: newReading.electricityRate,
      gasRate: newReading.gasRate,
      electricityBill,
      gasBill,
      totalBill,
    };

    setReadings([reading, ...readings]);
    setIsAddDialogOpen(false);
    setNewReading({
      tenantId: '',
      month: '',
      electricityUnits: 0,
      gasUnits: 0,
      electricityRate: 18,
      gasRate: 25,
    });
  };

  const totalElectricityBill = readings.reduce((sum, r) => sum + r.electricityBill, 0);
  const totalGasBill = readings.reduce((sum, r) => sum + r.gasBill, 0);
  const totalUtilityBill = readings.reduce((sum, r) => sum + r.totalBill, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Utility Bill Calculator</h2>
          <p className="text-gray-500">Calculate individual tenant bills from main meter readings</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Reading
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Utility Reading</DialogTitle>
              <DialogDescription>Enter meter readings to calculate tenant's bill</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="tenant-select">Select Tenant</Label>
                <Select
                  value={newReading.tenantId}
                  onValueChange={(value) => setNewReading({ ...newReading, tenantId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tenant" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTenants.map(tenant => (
                      <SelectItem key={tenant.id} value={tenant.id}>
                        {tenant.name} - {tenant.unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="month">Month</Label>
                <Input
                  id="month"
                  type="month"
                  value={newReading.month}
                  onChange={(e) => setNewReading({ ...newReading, month: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="elec-units">
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      Electricity Units
                    </div>
                  </Label>
                  <Input
                    id="elec-units"
                    type="number"
                    value={newReading.electricityUnits}
                    onChange={(e) => setNewReading({ ...newReading, electricityUnits: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="elec-rate">Rate per Unit (Rs.)</Label>
                  <Input
                    id="elec-rate"
                    type="number"
                    value={newReading.electricityRate}
                    onChange={(e) => setNewReading({ ...newReading, electricityRate: Number(e.target.value) })}
                    placeholder="18"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gas-units">
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      Gas Units
                    </div>
                  </Label>
                  <Input
                    id="gas-units"
                    type="number"
                    value={newReading.gasUnits}
                    onChange={(e) => setNewReading({ ...newReading, gasUnits: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gas-rate">Rate per Unit (Rs.)</Label>
                  <Input
                    id="gas-rate"
                    type="number"
                    value={newReading.gasRate}
                    onChange={(e) => setNewReading({ ...newReading, gasRate: Number(e.target.value) })}
                    placeholder="25"
                  />
                </div>
              </div>

              {newReading.electricityUnits > 0 || newReading.gasUnits > 0 ? (
                <div className="p-4 bg-blue-50 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calculator className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-blue-900">Calculated Bill:</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p>Electricity: Rs. {(newReading.electricityUnits * newReading.electricityRate).toLocaleString()}</p>
                    <p>Gas: Rs. {(newReading.gasUnits * newReading.gasRate).toLocaleString()}</p>
                    <p className="font-semibold text-blue-900">
                      Total: Rs. {((newReading.electricityUnits * newReading.electricityRate) + (newReading.gasUnits * newReading.gasRate)).toLocaleString()}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCalculateBill} disabled={!newReading.tenantId || !newReading.month}>
                Calculate & Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* How It Works */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">How the Bill Calculator Works</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
          <p>• Read the <strong>main meter</strong> to get the total electricity and gas consumption</p>
          <p>• Read each tenant's <strong>individual sub-meter</strong> to get their consumption</p>
          <p>• Enter the units consumed by each tenant in the form above</p>
          <p>• The system calculates the bill based on the current rate per unit</p>
          <p>• Bills are automatically calculated: <strong>Units × Rate = Bill Amount</strong></p>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-600" />
                Total Electricity Bills
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">Rs. {totalElectricityBill.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">All tenants combined</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-600" />
                Total Gas Bills
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">Rs. {totalGasBill.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">All tenants combined</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Utility Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-600">Rs. {totalUtilityBill.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Combined electricity & gas</p>
          </CardContent>
        </Card>
      </div>

      {/* Readings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Utility Readings & Bills</CardTitle>
          <CardDescription>Historical record of all utility calculations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Elec. Units
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    Gas Units
                  </div>
                </TableHead>
                <TableHead>Elec. Bill</TableHead>
                <TableHead>Gas Bill</TableHead>
                <TableHead>Total Bill</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {readings.map((reading) => (
                <TableRow key={reading.id}>
                  <TableCell>{reading.tenantName}</TableCell>
                  <TableCell>{reading.unit}</TableCell>
                  <TableCell>{reading.month}</TableCell>
                  <TableCell>{reading.electricityUnits}</TableCell>
                  <TableCell>{reading.gasUnits}</TableCell>
                  <TableCell>Rs. {reading.electricityBill.toLocaleString()}</TableCell>
                  <TableCell>Rs. {reading.gasBill.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className="font-semibold">Rs. {reading.totalBill.toLocaleString()}</span>
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
