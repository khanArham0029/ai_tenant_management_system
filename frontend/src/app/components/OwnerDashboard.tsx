import { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { SidebarItem } from './Sidebar';
import { LayoutDashboard, Users, CreditCard, Receipt, FileText, Wrench, Calculator, Building2 } from 'lucide-react';
import { DashboardOverview } from './owner/DashboardOverview';
import { TenantsManagement } from './owner/TenantsManagement';
import { RentManagement } from './owner/RentManagement';
import { ExpenditureManagement } from './owner/ExpenditureManagement';
import { AgreementsManagement } from './owner/AgreementsManagement';
import { MaintenanceManagement } from './owner/MaintenanceManagement';
import { UtilityBillCalculator } from './owner/UtilityBillCalculator';
import { ChatbotComponent } from './shared/ChatbotComponent';

const OWNER_SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'tenants', label: 'Tenants', icon: <Users className="w-5 h-5" /> },
  { id: 'rent', label: 'Rent', icon: <CreditCard className="w-5 h-5" /> },
  { id: 'expenditure', label: 'Expenditure', icon: <Receipt className="w-5 h-5" /> },
  { id: 'agreements', label: 'Agreements', icon: <FileText className="w-5 h-5" /> },
  { id: 'maintenance', label: 'Maintenance', icon: <Wrench className="w-5 h-5" /> },
  { id: 'utility', label: 'Utility Bills', icon: <Calculator className="w-5 h-5" /> },
];

export function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <DashboardOverview />;
      case 'tenants': return <TenantsManagement />;
      case 'rent': return <RentManagement />;
      case 'expenditure': return <ExpenditureManagement />;
      case 'agreements': return <AgreementsManagement />;
      case 'maintenance': return <MaintenanceManagement />;
      case 'utility': return <UtilityBillCalculator />;
      default: return <DashboardOverview />;
    }
  };

  return (
    <>
      <DashboardLayout
        sidebarItems={OWNER_SIDEBAR_ITEMS}
        activeItemId={activeTab}
        onSidebarItemClick={setActiveTab}
        headerTitle="Property Management"
        headerSubtitle="Owner Dashboard"
        headerIcon={<Building2 className="w-6 h-6 text-white" />}
      >
        <div className="pb-24">
          {renderContent()}
        </div>
      </DashboardLayout>
      <ChatbotComponent userType="owner" />
    </>
  );
}