import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Plus, CheckCircle, XCircle, Clock } from 'lucide-react';
import { mockMaintenanceRequests, MaintenanceRequest } from '../../data/types';

interface TenantMaintenanceProps {
  tenantId: number;
  tenantName: string;
  unit: string;
}

export function TenantMaintenance({ tenantId, tenantName, unit }: TenantMaintenanceProps) {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(
    mockMaintenanceRequests.filter(r => r.tenantId === tenantId)
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    category: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  const handleSubmitRequest = () => {
    const request: MaintenanceRequest = {
      id: Date.now(),
      tenantId,
      tenantName,
      unit,
      category: newRequest.category,
      description: newRequest.description,
      status: 'pending',
      dateSubmitted: new Date().toISOString().split('T')[0],
      priority: newRequest.priority,
    };

    setRequests([request, ...requests]);
    setIsAddDialogOpen(false);
    setNewRequest({
      category: '',
      description: '',
      priority: 'medium',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-yellow-500">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-blue-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-500">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-green-500">
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
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Medium Priority</Badge>;
      case 'low':
        return <Badge variant="secondary">Low Priority</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Maintenance Requests</h2>
          <p className="text-gray-500">Submit and track your maintenance requests</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Maintenance Request</DialogTitle>
              <DialogDescription>Describe the issue and we'll notify the owner</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newRequest.category}
                  onValueChange={(value) => setNewRequest({ ...newRequest, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electrical">Electrical</SelectItem>
                    <SelectItem value="Plumbing">Plumbing</SelectItem>
                    <SelectItem value="AC/Cooling">AC/Cooling</SelectItem>
                    <SelectItem value="Heating">Heating</SelectItem>
                    <SelectItem value="Structural">Structural</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newRequest.priority}
                  onValueChange={(value) => setNewRequest({ ...newRequest, priority: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Can wait a few days</SelectItem>
                    <SelectItem value="medium">Medium - Should be addressed soon</SelectItem>
                    <SelectItem value="high">High - Urgent attention needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                  placeholder="Please describe the issue in detail..."
                  rows={4}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmitRequest}
                disabled={!newRequest.category || !newRequest.description}
              >
                Submit Request
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Status Summary */}
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-600">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-600">
              {requests.filter(r => r.status === 'approved').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-600">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">
              {requests.filter(r => r.status === 'completed').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">You haven't submitted any maintenance requests yet.</p>
              <Button className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
                Submit Your First Request
              </Button>
            </CardContent>
          </Card>
        ) : (
          requests.map(request => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{request.category}</CardTitle>
                      {getStatusBadge(request.status)}
                    </div>
                    <CardDescription>{request.description}</CardDescription>
                  </div>
                  {getPriorityBadge(request.priority)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <p>Submitted on {new Date(request.dateSubmitted).toLocaleDateString()}</p>
                  {request.status === 'pending' && (
                    <p className="text-yellow-600">Awaiting owner approval</p>
                  )}
                  {request.status === 'approved' && (
                    <p className="text-blue-600">Work in progress</p>
                  )}
                  {request.status === 'completed' && (
                    <p className="text-green-600">Issue resolved</p>
                  )}
                  {request.status === 'rejected' && (
                    <p className="text-red-600">Request declined</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
