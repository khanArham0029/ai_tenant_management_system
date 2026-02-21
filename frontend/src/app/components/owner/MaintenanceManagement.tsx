import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { mockMaintenanceRequests, MaintenanceRequest } from '../../data/mockData';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';

export function MaintenanceManagement() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(mockMaintenanceRequests);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const handleApprove = (id: string) => {
    setRequests(requests.map(r =>
      r.id === id ? { ...r, status: 'approved' } : r
    ));
    setIsDetailDialogOpen(false);
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(r =>
      r.id === id ? { ...r, status: 'rejected' } : r
    ));
    setIsDetailDialogOpen(false);
  };

  const handleComplete = (id: string) => {
    setRequests(requests.map(r =>
      r.id === id ? { ...r, status: 'completed' } : r
    ));
    setIsDetailDialogOpen(false);
  };

  const openDetails = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setIsDetailDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-yellow-500 text-white">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-[#013557] text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-[#ff4545] text-white">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="success">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const completedCount = requests.filter(r => r.status === 'completed').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl">Maintenance Management</h2>
        <p className="text-gray-500">Review and approve maintenance requests from tenants</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{requests.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-yellow-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-yellow-600">{pendingCount}</div>
            <p className="text-xs text-gray-500 mt-1">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-600">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-600">{approvedCount}</div>
            <p className="text-xs text-gray-500 mt-1">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-600">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">{completedCount}</div>
            <p className="text-xs text-gray-500 mt-1">Resolved</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests Alert */}
      {pendingCount > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-orange-900">Action Required</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-orange-800">
              You have {pendingCount} pending maintenance request(s) that need your review and approval.
            </p>
          </CardContent>
        </Card>
      )}

      {/* All Requests */}
      <Card>
        <CardHeader>
          <CardTitle>All Maintenance Requests</CardTitle>
          <CardDescription>Complete list of all maintenance requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Submitted</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.tenantName}</TableCell>
                  <TableCell>{request.unit}</TableCell>
                  <TableCell>{request.category}</TableCell>
                  <TableCell className="max-w-xs truncate">{request.description}</TableCell>
                  <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>{new Date(request.dateSubmitted).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openDetails(request)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Maintenance Request Details</DialogTitle>
            <DialogDescription>Review and take action on this request</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Tenant</p>
                  <p className="font-semibold">{selectedRequest.tenantName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Unit</p>
                  <p className="font-semibold">{selectedRequest.unit}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-semibold">{selectedRequest.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Priority</p>
                  {getPriorityBadge(selectedRequest.priority)}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="mt-1 p-3 bg-gray-50 rounded-lg">{selectedRequest.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Date Submitted</p>
                  <p>{new Date(selectedRequest.dateSubmitted).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  {getStatusBadge(selectedRequest.status)}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                {selectedRequest.status === 'pending' && (
                  <>
                    <Button
                      className="flex-1"
                      variant="outline-success"
                      onClick={() => handleApprove(selectedRequest.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      className="flex-1"
                      variant="outline-destructive"
                      onClick={() => handleReject(selectedRequest.id)}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {selectedRequest.status === 'approved' && (
                  <Button
                    className="flex-1"
                    variant="success"
                    onClick={() => handleComplete(selectedRequest.id)}
                  >
                    Mark as Completed
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}