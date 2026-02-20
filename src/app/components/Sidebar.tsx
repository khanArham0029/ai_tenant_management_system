import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Switch } from './ui/switch';
import { cn } from './ui/utils';
import { LogOut, LayoutDashboard, Users, Receipt, CreditCard, FileText, Wrench, Moon, Sun, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from './ui/button';

export interface SidebarItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    badge?: number;
}

interface SidebarProps {
    items: SidebarItem[];
    activeItemId: string;
    onItemClick: (id: string) => void;
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
    isDarkMode: boolean;
    setIsDarkMode: (dark: boolean) => void;
}

export function Sidebar({
    items,
    activeItemId,
    onItemClick,
    isCollapsed,
    setIsCollapsed,
    isDarkMode,
    setIsDarkMode
}: SidebarProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div
            className={cn(
                "h-screen flex flex-col transition-all duration-300 relative border-r",
                isCollapsed ? "w-20" : "w-64",
                isDarkMode ? "bg-[#0A192F] text-gray-300 border-[#112240]" : "bg-white text-gray-600 border-gray-200"
            )}
        >
            {/* Mobile Close Button (Hidden on Desktop, used if we make it a drawer later) */}
            <button
                className="lg:hidden absolute top-4 right-4 p-1 rounded-md text-gray-400 hover:text-gray-900"
                onClick={() => setIsCollapsed(true)}
            >
                <span className="sr-only">Close sidebar</span>
            </button>

            {/* Logo Area */}
            <div className={cn("flex items-center h-20 px-6", isCollapsed ? "justify-center px-0" : "")}>
                <div className={cn(
                    "flex items-center justify-center rounded-lg flex-shrink-0",
                    isDarkMode ? "bg-white" : "bg-[#2563EB]", // Blue logo box like "Cummo" mockup
                    isCollapsed ? "w-10 h-10" : "w-8 h-8 mr-3"
                )}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={isDarkMode ? "text-[#2563EB]" : "text-white"}>
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                {!isCollapsed && (
                    <span className={cn("text-xl font-bold font-sans tracking-wide", isDarkMode ? "text-white" : "text-[#1E293B]")}>
                        Cummo
                    </span>
                )}
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
                {items.map((item) => {
                    const isActive = activeItemId === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onItemClick(item.id)}
                            className={cn(
                                "w-full flex items-center h-12 rounded-lg transition-colors group relative",
                                isCollapsed ? "justify-center px-0" : "px-4",
                                isActive
                                    ? (isDarkMode ? "bg-[#112240] text-white font-medium" : "bg-[#EBF5FF] text-[#2563EB] font-medium")
                                    : (isDarkMode ? "hover:bg-[#112240]/50 hover:text-white" : "hover:bg-gray-50 hover:text-gray-900")
                            )}
                            title={isCollapsed ? item.label : undefined}
                        >
                            <span className={cn(
                                "flex items-center justify-center",
                                isActive
                                    ? (isDarkMode ? "text-[#3B82F6]" : "text-[#2563EB]")
                                    : (isDarkMode ? "text-gray-400 group-hover:text-gray-300" : "text-gray-500 group-hover:text-gray-700")
                            )}>
                                {item.icon}
                            </span>

                            {!isCollapsed && (
                                <span className="ml-3 truncate font-medium text-sm">
                                    {item.label}
                                </span>
                            )}

                            {/* Badge */}
                            {item.badge !== undefined && item.badge > 0 && (
                                <div className={cn(
                                    "flex items-center justify-center text-[10px] font-bold rounded-full",
                                    isCollapsed ? "absolute top-2 right-2 w-4 h-4" : "ml-auto w-5 h-5",
                                    isDarkMode ? "bg-[#1E293B] text-gray-300" : "bg-[#E2E8F0] text-gray-600"
                                )}>
                                    {item.badge}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Footer Area (Toggle & Logout) */}
            <div className="p-4 border-t border-transparent space-y-4">
                {/* Toggle Mode */}
                <div className={cn(
                    "flex items-center",
                    isCollapsed ? "justify-center" : "justify-between px-2"
                )}>
                    {!isCollapsed ? (
                        <>
                            <div className="flex items-center gap-3">
                                {isDarkMode ? <Moon className="w-5 h-5 text-gray-400" /> : <Moon className="w-5 h-5 text-gray-500" />}
                                <span className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-600")}>
                                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                                </span>
                            </div>
                            <Switch
                                checked={!isDarkMode} // Mockup has blue thumb on right for Light Mode / toggling logic
                                onCheckedChange={() => setIsDarkMode(!isDarkMode)}
                                className={cn(
                                    "data-[state=checked]:bg-[#2563EB]",
                                    isDarkMode ? "!bg-gray-600" : ""
                                )}
                            />
                        </>
                    ) : (
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#112240] transition-colors"
                            title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
                        >
                            {isDarkMode ? <Moon className="w-5 h-5 text-gray-400" /> : <Moon className="w-5 h-5 text-gray-500" />}
                        </button>
                    )}
                </div>

                {/* Logout Button */}
                <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className={cn(
                        "w-full h-12 flex items-center rounded-lg transition-colors border-0",
                        isDarkMode
                            ? "bg-[#64748B] text-white hover:bg-[#475569] hover:text-white"
                            : "bg-[#64748B] text-white hover:bg-[#475569] hover:text-white",
                        isCollapsed ? "justify-center px-0" : "px-4 justify-start gap-3"
                    )}
                    title={isCollapsed ? "Logout" : undefined}
                >
                    <LogOut className="w-5 h-5" />
                    {!isCollapsed && <span className="font-semibold text-sm">Logout</span>}
                </Button>
            </div>

            {/* Collapse/Expand Toggle Button - Absolute positioned on the border */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={cn(
                    "absolute top-8 -right-3 w-6 h-6 rounded-full border shadow-sm flex items-center justify-center transition-colors z-20",
                    isDarkMode
                        ? "bg-[#1E293B] border-[#0A192F] text-gray-400 hover:text-white"
                        : "bg-white border-gray-200 text-gray-500 hover:text-gray-900"
                )}
            >
                {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
            </button>
        </div>
    );
}
