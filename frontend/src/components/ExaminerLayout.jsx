import React, { useState } from 'react';
import {
    LayoutDashboard, PlusCircle, BookOpen, AlertCircle,
    FileCheck, BarChart3, UserCircle, Menu, ChevronLeft,
    LogOut, Settings, Bell, Search
} from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, active = false, to = "#", collapsed = false }) => (
    <Link to={to} className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group ${active
        ? 'bg-[#4F46E5] text-white shadow-md shadow-indigo-100'
        : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
        }`}>
        <Icon className={`w-5 h-5 transition-transform duration-200 ${!active && 'group-hover:scale-110'}`} />
        {!collapsed && <span className="font-semibold text-[15px] whitespace-nowrap">{label}</span>}
        {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-[#0F172A] text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                {label}
            </div>
        )}
    </Link>
);

const ExaminerLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
        { icon: PlusCircle, label: "Create Exam", to: "/create-exam" },
        { icon: BookOpen, label: "Manage Exams", to: "/manage-exams" },
        { icon: AlertCircle, label: "Violation Reports", to: "/violation-reports" },
        { icon: FileCheck, label: "Results & Publishing", to: "/results-publishing" },
        { icon: BarChart3, label: "Analytics", to: "/analytics" },
    ];

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
            {/* Sidebar */}
            <aside
                className={`bg-white border-r border-[#E2E8F0] flex flex-col fixed h-full z-40 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'
                    }`}
            >
                <div className="flex items-center justify-between h-20 px-6 border-b border-[#F1F5F9]">
                    {!isCollapsed && (
                        <div className="flex flex-col animate-in fade-in duration-300">
                            <div className="text-2xl font-bold text-[#4F46E5] tracking-tight">FairExam</div>
                            <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">Examiner Portal</div>
                        </div>
                    )}
                    {isCollapsed && (
                        <div className="text-xl font-bold text-[#4F46E5] mx-auto">FE</div>
                    )}
                </div>

                <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item, index) => (
                        <SidebarItem
                            key={index}
                            icon={item.icon}
                            label={item.label}
                            to={item.to}
                            active={location.pathname === item.to}
                            collapsed={isCollapsed}
                        />
                    ))}
                </div>

                <div className="p-4 border-t border-[#F1F5F9] space-y-1.5">
                    <SidebarItem
                        icon={UserCircle}
                        label="Profile"
                        to="/profile"
                        active={location.pathname === '/profile'}
                        collapsed={isCollapsed}
                    />
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-all duration-200 group cursor-pointer"
                    >
                        {isCollapsed ? <Menu className="w-5 h-5 mx-auto" /> : (
                            <>
                                <ChevronLeft className="w-5 h-5" />
                                <span className="font-semibold text-[15px]">Collapse Menu</span>
                            </>
                        )}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main
                className={`flex-1 transition-all duration-300 ease-in-out ${isCollapsed ? 'ml-20' : 'ml-64'
                    }`}
            >
                {/* Top Header Placeholder (optional, can be moved to specific pages) */}
                <div className="h-16 bg-white border-b border-[#E2E8F0] sticky top-0 z-30 flex items-center justify-between px-8 shadow-sm">
                    <div className="flex items-center gap-4 text-[#64748B]">
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors md:hidden"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="relative group hidden sm:block">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] group-focus-within:text-[#4F46E5] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search exams or students..."
                                className="pl-10 pr-4 py-2 bg-[#F8FAFC] border border-transparent focus:border-[#4F46E5]/30 focus:bg-white rounded-xl text-sm outline-none w-64 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded-xl relative transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-[#E2E8F0] mx-2"></div>
                        <div className="flex items-center gap-3 cursor-pointer group">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-bold text-[#0F172A]">Dr. Smith</div>
                                <div className="text-[11px] font-medium text-[#64748B]">Senior Examiner</div>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#818CF8] flex items-center justify-center text-white font-bold shadow-sm group-hover:shadow-md transition-all">
                                DS
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Container */}
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default ExaminerLayout;
