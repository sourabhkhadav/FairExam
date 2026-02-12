import React, { useState } from 'react';
import {
    LayoutDashboard, PlusCircle, BookOpen, Monitor,
    AlertCircle, FileCheck, BarChart3, UserCircle, Shield,
    Search, Calendar, Clock, Users, Eye, Edit3, Trash2,
    ChevronDown, Download, Send, CheckCircle2, AlertTriangle,
    TrendingUp, Award, ClipboardList
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const ActionCard = ({ icon: Icon, label, color, children }) => (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center gap-4 sm:gap-6 flex-1 min-w-[280px]">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${color}`}>
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>
        <div className="flex-1 min-w-0">
            <div className="text-[#0F172A] text-[11px] font-bold mb-1.5 uppercase tracking-widest opacity-50">{label}</div>
            {children}
        </div>
    </div>
);

const ResultsPublishing = () => {
    const navigate = useNavigate();
    const [cutoff, setCutoff] = useState(70);
    const [exams, setExams] = useState([
        { id: 1, name: "Database Management Final", date: "Feb 12, 2026", participants: 124, avgScore: "78%", status: "Ready to Publish" },
        { id: 2, name: "Data Structures Mid-Term", date: "Feb 10, 2026", participants: 110, avgScore: "82%", status: "Published" },
        { id: 3, name: "Web Development Quiz", date: "Feb 8, 2026", participants: 95, avgScore: "65%", status: "Under Review" },
        { id: 4, name: "Operating Systems Final", date: "Feb 5, 2026", participants: 118, avgScore: "74%", status: "Published" },
    ]);

    const handleBulkNotify = () => {
        alert(`Initiating Bulk Email Delivery via Backend for students above ${cutoff}%`);
        // Backend integration point for NodeMailer
    };

    const handlePublish = (id) => {
        setExams(prev => prev.map(e => e.id === id ? { ...e, status: "Published" } : e));
    };

    // Sort passed students to top
    const sortedExams = [...exams].sort((a, b) => {
        const aPassed = parseInt(a.avgScore) >= cutoff;
        const bPassed = parseInt(b.avgScore) >= cutoff;
        return bPassed - aPassed;
    });

    return (
        <div className="p-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-[32px] font-medium text-[#0F172A] tracking-tight">Results & Publishing</h1>
                    <p className="text-[#0F172A]/70 text-[16px] font-medium mt-1">Review student performance and release results to public profiles.</p>
                </div>

                {/* Main Action Cards */}
                <div className="flex flex-wrap gap-4 sm:gap-6 mb-8 sm:mb-10">
                    <ActionCard icon={TrendingUp} label="Pass Cutoff" color="bg-gradient-to-br from-[#6366F1] to-[#4F46E5] shadow-lg shadow-indigo-200">
                        <div className="flex items-center gap-3">
                            <div className="relative group/input flex-1 max-w-[100px]">
                                <input
                                    type="number"
                                    value={cutoff}
                                    onChange={(e) => setCutoff(e.target.value)}
                                    className="w-full bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl px-3 py-2 text-xl font-bold text-[#4F46E5] outline-none focus:border-[#4F46E5] focus:ring-4 focus:ring-indigo-50 transition-all text-center"
                                />
                            </div>
                            <span className="text-xl font-medium text-[#0F172A]">%</span>
                        </div>
                    </ActionCard>
                    <ActionCard icon={Send} label="Notifications" color="bg-gradient-to-br from-[#3B82F6] to-[#2563EB] shadow-lg shadow-blue-200">
                        <button
                            onClick={handleBulkNotify}
                            className="w-full px-5 py-3 bg-[#4F46E5] text-white font-medium text-sm rounded-xl hover:bg-[#4338CA] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-indigo-200 group/btn"
                        >
                            <Send className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            <span>Send Results via Mail</span>
                        </button>
                    </ActionCard>
                    <ActionCard icon={Download} label="Final Reporting" color="bg-gradient-to-br from-[#A855F7] to-[#8B5CF6] shadow-lg shadow-purple-200">
                        <button className="w-full px-5 py-3 bg-white border-2 border-[#E2E8F0] text-[#0F172A] font-medium text-sm rounded-xl hover:bg-[#F8FAFC] hover:border-[#4F46E5]/30 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer group/dl">
                            <Download className="w-4 h-4 group-hover/dl:translate-y-0.5 transition-transform" />
                            <span>Export Passed List</span>
                        </button>
                    </ActionCard>
                </div>

                {/* Results Table */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                    <div className="mb-8">
                        <h2 className="text-xl font-medium text-[#0F172A]">Detailed Overview</h2>
                        <p className="text-[#0F172A]/50 text-sm mt-0.5">Showing all participants sorted by performance.</p>
                    </div>

                    <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="text-left text-[#0F172A] text-[13px] font-medium uppercase tracking-wider border-b border-[#F1F5F9]">
                                    <th className="pb-6">Exam Name</th>
                                    <th className="pb-6">Date Conducted</th>
                                    <th className="pb-6 text-center">Participants</th>
                                    <th className="pb-6 text-center">Avg. Score</th>
                                    <th className="pb-6 text-center">Status</th>
                                    <th className="pb-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F1F5F9]">
                                {sortedExams.map((exam) => (
                                    <tr key={exam.id} className={`group hover:bg-[#F8FAFC]/50 transition-all duration-300 ${parseInt(exam.avgScore) >= cutoff ? 'bg-indigo-50/30' : ''}`}>
                                        <td className="py-6 font-medium text-[#0F172A] whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                {exam.name}
                                                {parseInt(exam.avgScore) >= cutoff && <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />}
                                            </div>
                                        </td>
                                        <td className="py-6 text-[#0F172A]/70 font-medium whitespace-nowrap">{exam.date}</td>
                                        <td className="py-6 text-center text-[#0F172A]/70 font-medium whitespace-nowrap">{exam.participants}</td>
                                        <td className="py-6 text-center whitespace-nowrap">
                                            <span className={`font-medium ${parseInt(exam.avgScore) >= cutoff ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                                                {exam.avgScore}
                                            </span>
                                        </td>
                                        <td className="py-6 text-center whitespace-nowrap">
                                            <span className={`px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-bold flex items-center gap-1.5 justify-center w-fit mx-auto ${exam.status === 'Published' ? 'bg-[#F0FDF4] text-[#22C55E]' :
                                                exam.status === 'Ready to Publish' ? 'bg-[#EEF2FF] text-[#4F46E5]' :
                                                    'bg-[#FFFBEB] text-[#D97706]'
                                                }`}>
                                                {exam.status === 'Published' ? <CheckCircle2 className="w-3 h-3" /> :
                                                    exam.status === 'Under Review' ? <AlertTriangle className="w-3 h-3" /> : null}
                                                {exam.status}
                                            </span>
                                        </td>
                                        <td className="py-6 text-right whitespace-nowrap">
                                            {exam.status !== 'Published' ? (
                                                <button
                                                    onClick={() => handlePublish(exam.id)}
                                                    className="px-6 py-2 bg-[#4F46E5] text-white font-medium text-[11px] rounded-lg hover:bg-[#4338CA] transition-all shadow-sm flex items-center gap-2 ml-auto cursor-pointer"
                                                >
                                                    <Send className="w-3 h-3" /> Publish
                                                </button>
                                            ) : (
                                                <button className="px-6 py-2 bg-white border border-[#E2E8F0] text-[#0F172A] font-medium text-[11px] rounded-lg hover:bg-[#F8FAFC] transition-all flex items-center gap-2 ml-auto cursor-pointer">
                                                    <Eye className="w-3 h-3" /> View Analytics
                                                </button>
                                            )}
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

export default ResultsPublishing;
