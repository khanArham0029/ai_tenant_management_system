import { useState } from 'react';
import { Sidebar, SidebarItem } from './Sidebar';
import { cn } from './ui/utils';
import { Menu } from 'lucide-react';

interface DashboardLayoutProps {
    children: React.ReactNode;
    sidebarItems: SidebarItem[];
    activeItemId: string;
    onSidebarItemClick: (id: string) => void;
    headerTitle?: string;
    headerSubtitle?: string;
    headerIcon?: React.ReactNode;
}

export function DashboardLayout({
    children,
    sidebarItems,
    activeItemId,
    onSidebarItemClick,
    headerTitle,
    headerSubtitle,
    headerIcon,
}: DashboardLayoutProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For small screens

    return (
        <div className={cn(
            "min-h-screen flex w-full transition-colors duration-300",
            isDarkMode ? "bg-[#0A192F]" : "bg-[#F8FAFC]"
        )}>
            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar Wrapper */}
            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-50 transform lg:transform-none lg:static transition-transform duration-300",
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                <Sidebar
                    items={sidebarItems}
                    title={headerTitle}
                    icon={headerIcon}
                    activeItemId={activeItemId}
                    onItemClick={(id) => {
                        onSidebarItemClick(id);
                        if (window.innerWidth < 1024) setIsMobileMenuOpen(false); // Close on mobile click
                    }}
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
                {/* Top Header (Mostly for mobile toggle, or holding title in desktop if desired) */}
                <header className={cn(
                    "border-b sticky top-0 z-30 transition-colors duration-300",
                    isDarkMode ? "bg-[#112240] border-[#0A192F]" : "bg-white border-gray-200 shadow-sm"
                )}>
                    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">

                        {/* Left side: Mobile menu toggle + Context Title */}
                        <div className="flex items-center gap-4">
                            <button
                                className={cn("lg:hidden p-2 rounded-md -ml-2", isDarkMode ? "text-gray-300 hover:bg-[#1E293B]" : "text-gray-600 hover:bg-gray-100")}
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Open sidebar</span>
                            </button>

                            {headerSubtitle && (
                                <div className="flex items-center gap-3">
                                    <div className="hidden sm:block">
                                        <h1 className={cn("text-lg sm:text-xl font-semibold", isDarkMode ? "text-white" : "text-[#013557]")}>
                                            {headerSubtitle}
                                        </h1>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Can place user profile dropdown or other header actions here */}
                    </div>
                </header>

                {/* Dynamic Content Body */}
                <main className={cn(
                    "flex-1 overflow-auto p-4 sm:p-6 lg:p-8 transition-colors duration-300",
                    isDarkMode ? "bg-[#0A192F] text-gray-300" : "bg-[#F8FAFC] text-gray-900"
                )}>
                    <div className="mx-auto max-w-7xl animate-in fade-in duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
