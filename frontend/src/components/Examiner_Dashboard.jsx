import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, PlusCircle, BookOpen, Database, Monitor,
    AlertCircle, FileCheck, BarChart3, UserCircle, Shield,
    Clock, Users, CheckCircle, ChevronRight, Search, Bell,
    FileText, UserPlus, ClipboardCheck
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const StatCard = ({ icon: Icon, label, value, iconColor }) => (
    <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center gap-5">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconColor}`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
            <div className="text-[#64748B] text-sm font-medium mb-0.5">{label}</div>
            <div className="text-[#0F172A] text-2xl font-medium">{value}</div>
        </div>
    </div>
);

const Examiner_Dashboard = () => {
    const navigate = useNavigate();
    const [recentExams, setRecentExams] = useState([
        { name: "Database Management Final", date: "Feb 15, 2026", students: 85, status: "Scheduled" },
        { name: "Data Structures Mid-Term", date: "Feb 10, 2026", students: 120, status: "Completed" },
        { name: "Web Development Quiz", date: "Feb 8, 2026", students: 95, status: "Completed" },
        { name: "Operating Systems Final", date: "Feb 20, 2026", students: 110, status: "Draft" },
    ]);

    useEffect(() => {
        const published = JSON.parse(localStorage.getItem('publishedExams') || '[]');
        if (published.length > 0) {
            // Prepend new exams to the list
            setRecentExams(prev => [...published.map(e => ({
                name: e.title,
                date: e.date || "Today",
                students: 0,
                status: e.visibility || "Published"
            })), ...prev]);
        }
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <StatCard icon={FileText} label="Total Exams Created" value="24" iconColor="bg-[#6366F1]" />
                <StatCard icon={Clock} label="Active Exams" value="3" iconColor="bg-[#3B82F6]" />
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-sm mb-10">
                <h2 className="text-xl font-medium text-[#0F172A] mb-6">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={() => {
                            localStorage.removeItem('examDraft');
                            navigate('/create-exam');
                        }}
                        className="px-8 py-3.5 bg-[#4F46E5] text-white font-medium text-[15px] rounded-xl hover:bg-[#4338CA] transition-all shadow-sm cursor-pointer"
                    >
                        Create New Exam
                    </button>
                    <button className="px-8 py-3.5 bg-white border border-[#E2E8F0] text-[#4F46E5] font-semibold text-[15px] rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer">
                        View Violation Reports
                    </button>
                    <button className="px-8 py-3.5 bg-white border border-[#E2E8F0] text-[#4F46E5] font-semibold text-[15px] rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer">
                        Publish Results
                    </button>
                </div>
            </div>

            {/* Recent Exams Section */}
            <div className="bg-white p-4 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-sm">
                <h2 className="text-xl font-medium text-[#0F172A] mb-8">Recent Exams</h2>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                    <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-[#0F172A] text-[13px] font-medium border-b border-[#F1F5F9]">
                                    <th className="pb-4 font-medium whitespace-nowrap uppercase tracking-wider">Exam Name</th>
                                    <th className="pb-4 font-medium whitespace-nowrap uppercase tracking-wider">Date</th>
                                    <th className="pb-4 font-medium text-center whitespace-nowrap uppercase tracking-wider">Students</th>
                                    <th className="pb-4 font-medium text-center whitespace-nowrap uppercase tracking-wider">Status</th>
                                    <th className="pb-4 font-medium text-right whitespace-nowrap uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F1F5F9]">
                                {recentExams.map((exam, i) => (
                                    <tr key={i} className="group">
                                        <td className="py-5 font-medium text-[#0F172A] whitespace-nowrap">{exam.name}</td>
                                        <td className="py-5 text-[#64748B] whitespace-nowrap">{exam.date}</td>
                                        <td className="py-5 text-[#64748B] text-center whitespace-nowrap">{exam.students}</td>
                                        <td className="py-5 text-center whitespace-nowrap">
                                            <span className={`px-4 py-1.5 rounded-full text-[12px] font-semibold ${exam.status === 'Scheduled'
                                                ? 'bg-[#EFF6FF] text-[#3B82F6]'
                                                : exam.status === 'Completed'
                                                    ? 'bg-[#F0FDF4] text-[#22C55E]'
                                                    : 'bg-[#F8FAFC] text-[#64748B]'
                                                }`}>
                                                {exam.status}
                                            </span>
                                        </td>
                                        <td className="py-5 text-right whitespace-nowrap">
                                            <button className="text-[#4F46E5] font-semibold text-[14px] hover:underline cursor-pointer">
                                                View Details
                                            </button>
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

export default Examiner_Dashboard;
