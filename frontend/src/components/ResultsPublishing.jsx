import React, { useState } from 'react';
import {
    LayoutDashboard, PlusCircle, BookOpen, Monitor,
    AlertCircle, FileCheck, BarChart3, UserCircle, Shield,
    Search, Calendar, Clock, Users, Eye, Edit3, Trash2,
    ChevronDown, Download, Send, CheckCircle2, AlertTriangle,
    TrendingUp, Award, ClipboardList
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const SummaryCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center gap-6 flex-1">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>
            <Icon className="w-7 h-7 text-white" />
        </div>
        <div>
            <div className="text-[#64748B] text-sm font-semibold mb-1">{label}</div>
            <div className="text-3xl font-bold text-[#0F172A]">{value}</div>
        </div>
    </div>
);

const ResultsPublishing = () => {
    const navigate = useNavigate();
    const [exams, setExams] = useState([
        { id: 1, name: "Database Management Final", date: "Feb 12, 2026", participants: 124, avgScore: "78%", status: "Ready to Publish" },
        { id: 2, name: "Data Structures Mid-Term", date: "Feb 10, 2026", participants: 110, avgScore: "82%", status: "Published" },
        { id: 3, name: "Web Development Quiz", date: "Feb 8, 2026", participants: 95, avgScore: "65%", status: "Under Review" },
        { id: 4, name: "Operating Systems Final", date: "Feb 5, 2026", participants: 118, avgScore: "74%", status: "Published" },
    ]);

    const handlePublish = (id) => {
        setExams(prev => prev.map(e => e.id === id ? { ...e, status: "Published" } : e));
    };

    return (
        <div className="p-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-[32px] font-bold text-[#0F172A] tracking-tight">Results & Publishing</h1>
                    <p className="text-[#64748B] text-[16px] font-medium mt-1">Review student performance and release results to public profiles.</p>
                </div>

                {/* Summary Stats */}
                <div className="flex gap-6 mb-10">
                    <SummaryCard icon={TrendingUp} label="Average Score" value="76.4%" color="bg-[#6366F1]" />
                    <SummaryCard icon={Award} label="Highest Score" value="98%" color="bg-[#3B82F6]" />
                    <SummaryCard icon={ClipboardList} label="Completion Rate" value="94.2%" color="bg-[#A855F7]" />
                </div>

                {/* Results Table */}
                <div className="bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-[#0F172A]">Exam Results Overview</h2>
                        <div className="flex gap-3">
                            <button className="px-6 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] font-semibold text-sm rounded-xl hover:bg-[#F1F5F9] transition-colors flex items-center gap-2">
                                <Download className="w-4 h-4" /> Download All
                            </button>
                        </div>
                    </div>

                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-[#64748B] text-[13px] font-bold uppercase tracking-wider">
                                <th className="pb-6">Exam Name</th>
                                <th className="pb-6">Date Conducted</th>
                                <th className="pb-6 text-center">Participants</th>
                                <th className="pb-6 text-center">Avg. Score</th>
                                <th className="pb-6 text-center">Status</th>
                                <th className="pb-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F1F5F9]">
                            {exams.map((exam) => (
                                <tr key={exam.id} className="group hover:bg-[#F8FAFC]/50 transition-colors">
                                    <td className="py-6 font-bold text-[#0F172A]">{exam.name}</td>
                                    <td className="py-6 text-[#64748B] font-medium">{exam.date}</td>
                                    <td className="py-6 text-center text-[#64748B] font-bold">{exam.participants}</td>
                                    <td className="py-6 text-center">
                                        <span className="text-[#4F46E5] font-bold">{exam.avgScore}</span>
                                    </td>
                                    <td className="py-6 text-center">
                                        <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1.5 justify-center w-fit mx-auto ${exam.status === 'Published' ? 'bg-[#F0FDF4] text-[#22C55E]' :
                                            exam.status === 'Ready to Publish' ? 'bg-[#EEF2FF] text-[#4F46E5]' :
                                                'bg-[#FFFBEB] text-[#D97706]'
                                            }`}>
                                            {exam.status === 'Published' ? <CheckCircle2 className="w-3 h-3" /> :
                                                exam.status === 'Under Review' ? <AlertTriangle className="w-3 h-3" /> : null}
                                            {exam.status}
                                        </span>
                                    </td>
                                    <td className="py-6 text-right">
                                        {exam.status !== 'Published' ? (
                                            <button
                                                onClick={() => handlePublish(exam.id)}
                                                className="px-6 py-2 bg-[#4F46E5] text-white font-bold text-xs rounded-lg hover:bg-[#4338CA] transition-all shadow-sm flex items-center gap-2 ml-auto cursor-pointer"
                                            >
                                                <Send className="w-3 h-3" /> Publish
                                            </button>
                                        ) : (
                                            <button className="px-6 py-2 bg-white border border-[#E2E8F0] text-[#64748B] font-bold text-xs rounded-lg hover:bg-[#F8FAFC] transition-all flex items-center gap-2 ml-auto cursor-pointer">
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
    );
};

export default ResultsPublishing;
