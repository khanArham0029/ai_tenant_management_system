import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button } from './ui/button';
import { User, FileText, Wrench, Calculator } from 'lucide-react';
import { DashboardLayout } from './DashboardLayout';
import { SidebarItem } from './Sidebar';
import { TenantAgreement } from './tenant/TenantAgreement';
import { TenantMaintenance } from './tenant/TenantMaintenance';
import { TenantBills } from './tenant/TenantBills';
import { ChatbotComponent } from './shared/ChatbotComponent';
import { mockTenants } from '../data/types';

const TENANT_SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'agreement', label: 'My Agreement', icon: <FileText className="w-5 h-5" /> },
  { id: 'maintenance', label: 'Maintenance', icon: <Wrench className="w-5 h-5" /> },
  { id: 'bills', label: 'Utility Bills', icon: <Calculator className="w-5 h-5" /> },
];

export function TenantPortal() {
  const navigate = useNavigate();
  const { tenantId } = useParams();
  const [activeTab, setActiveTab] = useState('agreement');

  const parsedTenantId = Number(tenantId);
  const tenant = mockTenants.find(t => t.id === parsedTenantId);

  if (!tenant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Tenant not found</h2>
          <Button onClick={() => navigate('/')}>Back to Login</Button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'agreement': return <TenantAgreement tenant={tenant} />;
      case 'maintenance': return <TenantMaintenance tenantId={parsedTenantId} tenantName={tenant.name} unit={tenant.unit} />;
      case 'bills': return <TenantBills tenantId={parsedTenantId} />;
      default: return <TenantAgreement tenant={tenant} />;
    }
  };

  return (
    <>
      <DashboardLayout
        sidebarItems={TENANT_SIDEBAR_ITEMS}
        activeItemId={activeTab}
        onSidebarItemClick={setActiveTab}
        headerTitle="Tenant Portal"
        headerSubtitle={`${tenant.name} - ${tenant.unit}`}
        headerIcon={<User className="w-6 h-6 text-white" />}
      >
        <div className="pb-24">
          {renderContent()}
        </div>
      </DashboardLayout>
      <ChatbotComponent userType="tenant" />
    </>
  );
}