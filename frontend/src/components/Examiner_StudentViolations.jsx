import React, { useState, useEffect } from 'react';
import {
    PlusCircle, ArrowLeft, AlertCircle, Calendar, Clock,
    Monitor, Shield, Eye, FileText, BarChart3, ChevronRight,
    Search, Filter, Info
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const MetricCard = ({ label, value, colorClass, icon: Icon }) => (
    <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex-1 min-w-[200px] group hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
            <div className="text-[#64748B] text-xs font-bold uppercase tracking-widest">{label}</div>
            <div className={`p-2 rounded-xl ${colorClass.replace('text', 'bg').replace('-', '-50 text-')}`}>
                <Icon className={`w-4 h-4 ${colorClass}`} />
            </div>
        </div>
        <div className={`text-3xl font-bold ${colorClass}`}>{value}</div>
    </div>
);

const Examiner_StudentViolations = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [studentData, setStudentData] = useState({
        name: "",
        violations: []
    });

    useEffect(() => {
        // Mock data fetching based on the ID or placeholder logic
        // In a real app, this would be an API call
        const mockAllViolations = [
            { id: 1, name: "Charlie Brown", exam: "Database Management Final", type: "Multiple Face Detected", time: "Feb 12, 2026 - 10:45 AM", severity: "High", details: "Artificial intelligence system detected a second person in the camera frame for 45 seconds." },
            { id: 2, name: "Bob Smith", exam: "Database Management Final", type: "Tab Switch", time: "Feb 12, 2026 - 10:30 AM", severity: "Medium", details: "Student switched tabs 4 times during the examination period." },
            { id: 3, name: "Edward Lee", exam: "Computer Networks Test", type: "Unusual Noise Detected", time: "Feb 12, 2026 - 10:20 AM", severity: "Low", details: "Background noise exceeded the permissible threshold of 60dB." },
            { id: 4, name: "Alice Wagner", exam: "Database Management Final", type: "Camera Disabled", time: "Feb 12, 2026 - 10:15 AM", severity: "High", details: "Camera feed was interrupted for more than 5 minutes." },
            { id: 5, name: "Charlie Brown", exam: "Operating Systems Final", type: "Mobile usage", time: "Jan 12, 2026 - 11:30 AM", severity: "High", details: "AI detected mobile device usage during the test." },
        ];

        // Grouping by student name for simplicity of this demo page
        // If we had numerical IDs, we'd use those. 
        // For now, let's assume the "id" passed is actually the student name for this mock flow
        const filtered = mockAllViolations.filter(v => v.name === id || v.id.toString() === id);

        if (filtered.length > 0) {
            setStudentData({
                name: filtered[0].name,
                violations: filtered
            });
        } else {
            setStudentData({
                name: id || "Unknown Student",
                violations: []
            });
        }

        setTimeout(() => setLoading(false), 500);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
                        <Monitor className="w-6 h-6 text-[#4F46E5] animate-spin" />
                    </div>
                    <span className="text-[#64748B] font-medium tracking-wide">Loading Student Record...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="p-10 bg-[#F8FAFC] min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => navigate('/violation-reports')}
                            className="w-11 h-11 flex items-center justify-center bg-white border border-[#E2E8F0] rounded-xl shadow-sm hover:shadow-md hover:-translate-x-0.5 transition-all text-[#64748B] hover:text-[#4F46E5] group"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">{studentData.name} - Violation History</h1>
                            <p className="text-[#64748B] text-[15px] font-medium mt-1">Found {studentData.violations.length} total security violations </p>
                        </div>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="flex flex-wrap gap-4 sm:gap-6 mb-10">
                    <MetricCard label="Total Flags" value={studentData.violations.length} colorClass="text-[#4F46E5]" icon={AlertCircle} />
                    <MetricCard label="High Severity" value={studentData.violations.filter(v => v.severity === 'High').length} colorClass="text-[#EF4444]" icon={Shield} />
                    <MetricCard label="Recent Violation" value={studentData.violations.length > 0 ? "Today" : "None"} colorClass="text-[#D97706]" icon={Clock} />
                </div>

                {/* Violation Details List */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-[#0F172A] px-1">Detailed Log</h2>
                    {studentData.violations.length > 0 ? (
                        studentData.violations.map((v, idx) => (
                            <div key={v.id} className="bg-white p-6 sm:p-8 rounded-[24px] border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all group">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${v.severity === 'High' ? 'bg-[#FEF2F2] text-[#EF4444] border border-red-100' :
                                                v.severity === 'Medium' ? 'bg-[#FFFBEB] text-[#D97706] border border-amber-100' :
                                                    'bg-[#EFF6FF] text-[#3B82F6] border border-blue-100'
                                                }`}>
                                                {v.severity} Severity
                                            </span>
                                            <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.1em]">{v.time}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors">"{v.type}"</h3>
                                            <p className="text-[#64748B] text-[14px] font-medium flex items-center gap-2 mt-1">
                                                <Monitor className="w-4 h-4" />
                                                Exam: <span className="text-[#0F172A] font-semibold">{v.exam}</span>
                                            </p>
                                        </div>
                                        <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-sm text-[#475569] leading-relaxed">
                                            <div className="flex gap-2">
                                                <Info className="w-4 h-4 text-[#64748B] shrink-0 mt-0.5" />
                                                <span>{v.details}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center lg:flex-col gap-3 justify-end lg:border-l border-[#E2E8F0] lg:pl-8 min-w-[120px]">
                                        <button className="flex-1 lg:w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#64748B] hover:text-[#4F46E5] hover:border-[#4F46E5]/30 transition-all flex items-center justify-center gap-2">
                                            <Eye className="w-4 h-4" />
                                            View Clip
                                        </button>
                                        <button className="flex-1 lg:w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#64748B] hover:text-[#EF4444] hover:border-[#EF4444]/30 transition-all flex items-center justify-center gap-2">
                                            <Shield className="w-4 h-4" />
                                            Flag User
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white p-20 rounded-[32px] border-2 border-dashed border-[#E2E8F0] flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-[#F0FDF4] rounded-2xl flex items-center justify-center mb-6">
                                <FileText className="w-8 h-8 text-[#22C55E]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#0F172A]">Clean Record</h3>
                            <p className="text-[#64748B] font-medium mt-2 max-w-sm">No violations found for this student. They have maintained full academic integrity during their exams.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Examiner_StudentViolations;
