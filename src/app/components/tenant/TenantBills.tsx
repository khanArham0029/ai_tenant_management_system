import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Zap, Flame, DollarSign } from 'lucide-react';
import { mockUtilityReadings } from '../../data/mockData';

interface TenantBillsProps {
  tenantId: string;
}

export function TenantBills({ tenantId }: TenantBillsProps) {
  const bills = mockUtilityReadings.filter(r => r.tenantId === tenantId);

  const latestBill = bills[0];
  const totalElectricity = bills.reduce((sum, b) => sum + b.electricityBill, 0);
  const totalGas = bills.reduce((sum, b) => sum + b.gasBill, 0);
  const totalUtility = bills.reduce((sum, b) => sum + b.totalBill, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl">Utility Bills</h2>
        <p className="text-gray-500">View your electricity and gas consumption</p>
      </div>

      {/* How Bills Are Calculated */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">How Your Bills Are Calculated</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
          <p>• Your unit has an individual <strong>sub-meter</strong> that tracks your electricity and gas usage</p>
          <p>• The owner reads your meter monthly and calculates your bill</p>
          <p>• Bill = <strong>Units Consumed × Rate per Unit</strong></p>
          <p>• Current rates: Electricity Rs. {latestBill?.electricityRate || 18}/unit, Gas Rs. {latestBill?.gasRate || 25}/unit</p>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      {latestBill && (
        <>
          <div>
            <h3 className="mb-4">Latest Bill - {latestBill.month}</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-600" />
                      Electricity
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">Rs. {latestBill.electricityBill.toLocaleString()}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    {latestBill.electricityUnits} units × Rs. {latestBill.electricityRate}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-600" />
                      Gas
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">Rs. {latestBill.gasBill.toLocaleString()}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    {latestBill.gasUnits} units × Rs. {latestBill.gasRate}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      Total Bill
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-blue-600">Rs. {latestBill.totalBill.toLocaleString()}</div>
                  <Badge className="mt-2 bg-yellow-500">Due: 1st of next month</Badge>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Usage Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Current Month Usage Breakdown</CardTitle>
              <CardDescription>{latestBill.month}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Electricity Consumption</p>
                      <p className="text-sm text-gray-600">{latestBill.electricityUnits} units used</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">@ Rs. {latestBill.electricityRate}/unit</p>
                    <p className="text-lg font-semibold">Rs. {latestBill.electricityBill.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Flame className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Gas Consumption</p>
                      <p className="text-sm text-gray-600">{latestBill.gasUnits} units used</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">@ Rs. {latestBill.gasRate}/unit</p>
                    <p className="text-lg font-semibold">Rs. {latestBill.gasBill.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Total Amount Due</p>
                      <p className="text-sm text-gray-600">Payment due by 1st of next month</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">Rs. {latestBill.totalBill.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Bill History */}
      <Card>
        <CardHeader>
          <CardTitle>Bill History</CardTitle>
          <CardDescription>Your previous utility bills</CardDescription>
        </CardHeader>
        <CardContent>
          {bills.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No bills available yet.</p>
          ) : (
            <div className="space-y-3">
              {bills.map((bill) => (
                <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">{bill.month}</p>
                    <div className="flex gap-4 mt-1 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {bill.electricityUnits} units
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        {bill.gasUnits} units
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">Rs. {bill.totalBill.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">
                      Elec: Rs. {bill.electricityBill.toLocaleString()} | Gas: Rs. {bill.gasBill.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Total Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Summary</CardTitle>
          <CardDescription>Total utility costs across all months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                <p className="font-semibold">Total Electricity</p>
              </div>
              <p className="text-2xl">Rs. {totalElectricity.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-orange-600" />
                <p className="font-semibold">Total Gas</p>
              </div>
              <p className="text-2xl">Rs. {totalGas.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <p className="font-semibold">Total Utilities</p>
              </div>
              <p className="text-2xl text-blue-600">Rs. {totalUtility.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
