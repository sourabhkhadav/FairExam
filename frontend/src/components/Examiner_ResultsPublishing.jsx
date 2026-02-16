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

const Examiner_ResultsPublishing = () => {
    const navigate = useNavigate();
    const [cutoff, setCutoff] = useState(70);
    const [exams, setExams] = useState([
        { id: 1, name: "Database Management Final", date: "Feb 12, 2026", participants: 124, avgScore: "78%", status: "Draft", isCalculated: true },
        { id: 2, name: "Data Structures Mid-Term", date: "Feb 10, 2026", participants: 110, avgScore: "82%", status: "Published", isCalculated: true },
        { id: 3, name: "Web Development Quiz", date: "Feb 8, 2026", participants: 95, avgScore: "65%", status: "Draft", isCalculated: false },
        { id: 4, name: "Operating Systems Final", date: "Feb 5, 2026", participants: 118, avgScore: "74%", status: "Published", isCalculated: true },
    ]);

    const handleBulkNotify = () => {
        alert(`Initiating Bulk Email Delivery via Backend for students above ${cutoff}%`);
        // Backend integration point for NodeMailer
    };

    // Load status from localStorage on mount
    React.useEffect(() => {
        const storedStatuses = JSON.parse(localStorage.getItem('exam_statuses') || '{}');
        setExams(prev => prev.map(e => {
            if (storedStatuses[e.id]) {
                return { ...e, status: storedStatuses[e.id] };
            }
            return e;
        }));
    }, []);

    const handlePublish = (id) => {
        navigate(`/exam-results/${id}`);
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


                                    <th className="pb-6 text-center">Result Status</th>
                                    <th className="pb-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F1F5F9]">
                                {sortedExams.map((exam) => (
                                    <tr key={exam.id} className={`group hover:bg-[#F8FAFC]/50 transition-all duration-300 ${parseInt(exam.avgScore) >= cutoff ? 'bg-indigo-50/30' : ''}`}>
                                        <td className="py-6 font-medium text-[#0F172A] whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => navigate(`/exam-results/${exam.id}`)}
                                                    className="font-medium text-[#0F172A] hover:text-[#0F172A] hover:underline transition-colors text-left"
                                                >
                                                    {exam.name}
                                                </button>
                                                {parseInt(exam.avgScore) >= cutoff && <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />}
                                            </div>
                                        </td>
                                        <td className="py-6 text-[#0F172A]/70 font-medium whitespace-nowrap">{exam.date}</td>
                                        <td className="py-6 text-center text-[#0F172A]/70 font-medium whitespace-nowrap">{exam.participants}</td>


                                        <td className="py-6 text-center whitespace-nowrap">
                                            <span className={`px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-bold flex items-center gap-1.5 justify-center w-fit mx-auto ${exam.isCalculated ? 'bg-slate-50 text-slate-800 border border-slate-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                                                {exam.isCalculated ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                                {exam.isCalculated ? 'Calculated' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="py-6 text-right whitespace-nowrap">
                                            {exam.status !== 'Results Sent' ? (
                                                <button
                                                    onClick={() => handlePublish(exam.id)}
                                                    disabled={!exam.isCalculated}
                                                    className={`px-6 py-2 font-medium text-[11px] rounded-lg transition-all shadow-sm flex items-center gap-2 ml-auto cursor-pointer ${exam.isCalculated
                                                        ? 'bg-[#0F172A] text-white hover:bg-[#1E293B]'
                                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                                        }`}
                                                >
                                                    <Send className="w-3 h-3" /> Send Results
                                                </button>
                                            ) : (
                                                <button className="px-6 py-2 bg-white border border-[#E2E8F0] text-[#0F172A] font-medium text-[11px] rounded-lg hover:bg-[#F8FAFC] transition-all flex items-center gap-2 ml-auto cursor-pointer">
                                                    <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Results Sent
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

export default Examiner_ResultsPublishing;
