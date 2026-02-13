import React, { useState } from 'react';
import {
    LayoutDashboard, PlusCircle, BookOpen, Monitor,
    AlertCircle, FileCheck, BarChart3, UserCircle, Shield,
    Search, Calendar, Clock, Users, Eye, Edit3, Trash2,
    ChevronDown, Download, Filter, Info, ArrowUpRight
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const MetricCard = ({ label, value, colorClass }) => (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm flex-1 min-w-[200px]">
        <div className="text-[#0F172A] text-xs sm:text-sm font-medium mb-2">{label}</div>
        <div className={`text-3xl sm:text-[40px] font-medium ${colorClass || 'text-[#0F172A]'}`}>{value}</div>
    </div>
);

const ViolationReports = () => {
    const navigate = useNavigate();
    const [violations] = useState([
        { id: 1, name: "Charlie Brown", exam: "Database Management Final", type: "Multiple Face Detected", time: "Feb 12, 2026 - 10:45 AM", severity: "High" },
        { id: 2, name: "Bob Smith", exam: "Database Management Final", type: "Tab Switch", time: "Feb 12, 2026 - 10:30 AM", severity: "Medium" },
        { id: 3, name: "Edward Lee", exam: "Computer Networks Test", type: "Unusual Noise Detected", time: "Feb 12, 2026 - 10:20 AM", severity: "Low" },
        { id: 4, name: "Alice Wagner", exam: "Database Management Final", type: "Camera Disabled", time: "Feb 12, 2026 - 10:15 AM", severity: "High" },
    ]);

    return (
        <div className="p-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-[32px] font-medium text-[#0F172A] tracking-tight">Violation Reports</h1>
                    <p className="text-[#0F172A]/70 text-[16px] font-medium mt-1">Review AI-detected violations and suspicious activities.</p>
                </div>

                {/* Metrics Grid */}
                <div className="flex flex-wrap gap-4 sm:gap-6 mb-8 sm:mb-10">
                    <MetricCard label="Total Violations" value="24" />
                    <MetricCard label="High Severity" value="8" colorClass="text-[#EF4444]" />
                    <MetricCard label="Under Review" value="12" colorClass="text-[#F59E0B]" />
                </div>

                {/* Filters & Actions */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E2E8F0] shadow-sm mb-8 sm:mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row flex-1 gap-4">
                        <div className="flex-1 relative">
                            <select className="w-full appearance-none px-5 py-3.5 rounded-xl border border-[#4F46E5] text-[#0F172A] font-medium bg-white outline-none cursor-pointer text-sm">
                                <option>All Exams</option>
                                <option>Database Management Final</option>
                                <option>Computer Networks Test</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4F46E5]" />
                        </div>
                        <div className="flex-1 relative">
                            <select className="w-full appearance-none px-5 py-3.5 rounded-xl border border-[#E2E8F0] text-[#0F172A] font-medium bg-white outline-none cursor-pointer text-sm">
                                <option>All Severity Levels</option>
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                        </div>
                    </div>
                    <button className="px-8 py-3.5 bg-[#4338CA] text-white font-medium rounded-xl flex items-center justify-center gap-2.5 hover:bg-[#3730A3] transition-all shadow-lg shadow-indigo-100/50 active:scale-95 cursor-pointer text-sm">
                        <Search className="w-4 h-4" />
                        Search
                    </button>
                </div>

                {/* Violation Table */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                    <h2 className="text-xl font-bold text-[#0F172A] mb-6 sm:mb-8">Violation Details</h2>
                    <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="text-left text-[#0F172A] text-[13px] font-medium uppercase tracking-wider border-b border-[#F1F5F9]">
                                    <th className="pb-6">Student Name</th>
                                    <th className="pb-6">Exam</th>
                                    <th className="pb-6">Violation Type</th>
                                    <th className="pb-6">Timestamp</th>
                                    <th className="pb-6 text-right">Severity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F1F5F9]">
                                {violations.map((v) => (
                                    <tr key={v.id} className="group hover:bg-[#F8FAFC]/50 transition-colors">
                                        <td className="py-5 font-medium whitespace-nowrap">
                                            <Link
                                                to={`/student-violations/${v.name}`}
                                                className="text-[#4F46E5] hover:text-[#4338CA] hover:underline transition-colors"
                                            >
                                                {v.name}
                                            </Link>
                                        </td>
                                        <td className="py-5 text-[#0F172A]/70 font-medium whitespace-nowrap">{v.exam}</td>
                                        <td className="py-5 text-[#0F172A] font-medium italic whitespace-nowrap">"{v.type}"</td>
                                        <td className="py-5 text-[#0F172A]/70 font-medium text-sm whitespace-nowrap">{v.time}</td>
                                        <td className="py-5 text-right whitespace-nowrap">
                                            <span className={`px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-bold ${v.severity === 'High' ? 'bg-[#FEF2F2] text-[#EF4444]' :
                                                v.severity === 'Medium' ? 'bg-[#FFFBEB] text-[#D97706]' :
                                                    'bg-[#EFF6FF] text-[#3B82F6]'
                                                }`}>
                                                {v.severity}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViolationReports;
