import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, PlusCircle, BookOpen, Monitor,
    AlertCircle, FileCheck, BarChart3, UserCircle, Shield,
    Search, Calendar, Clock, Users, Eye, Edit3, Trash2, ChevronDown
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const ManageExams = () => {
    const navigate = useNavigate();
    const [exams, setExams] = useState([
        {
            id: 1, title: "Database Management Final", date: "Feb 15, 2026", duration: "120 min", students: 85, status: "Scheduled",
            examData: { title: "Database Management Final", duration: "120", questions: [{ id: 1, sectionId: 0, text: "Sample Question", options: ["A", "B", "C", "D"], correct: 0, marks: 2, difficulty: "Medium" }], sectionConfig: { count: 1, perSection: { 0: 1 } } }
        },
        {
            id: 2, title: "Data Structures Mid-Term", date: "Feb 10, 2026", duration: "90 min", students: 120, status: "Completed",
            examData: { title: "Data Structures Mid-Term", duration: "90", questions: [{ id: 1, sectionId: 0, text: "Sample Question", options: ["A", "B", "C", "D"], correct: 0, marks: 2, difficulty: "Medium" }], sectionConfig: { count: 1, perSection: { 0: 1 } } }
        },
        {
            id: 3, title: "Web Development Quiz", date: "Feb 8, 2026", duration: "60 min", students: 95, status: "Completed",
            examData: { title: "Web Development Quiz", duration: "60", questions: [{ id: 1, sectionId: 0, text: "Sample Question", options: ["A", "B", "C", "D"], correct: 0, marks: 2, difficulty: "Medium" }], sectionConfig: { count: 1, perSection: { 0: 1 } } }
        },
        {
            id: 4, title: "Operating Systems Final", date: "Feb 20, 2026", duration: "120 min", students: 110, status: "Draft",
            examData: { title: "Operating Systems Final", duration: "120", questions: [{ id: 1, sectionId: 0, text: "Sample Question", options: ["A", "B", "C", "D"], correct: 0, marks: 2, difficulty: "Medium" }], sectionConfig: { count: 1, perSection: { 0: 1 } } }
        },
    ]);

    useEffect(() => {
        const published = JSON.parse(localStorage.getItem('publishedExams') || '[]');
        if (published.length > 0) {
            setExams(prev => [...published.map((e, i) => ({
                id: `pub-${i}`,
                examData: e, // Store full data for editing
                title: e.title,
                date: e.date || "Today",
                duration: `${e.duration || 0} min`,
                students: 0,
                status: e.visibility || "Published"
            })), ...prev]);
        }
    }, []);

    const handleEdit = (exam) => {
        if (exam.examData) {
            localStorage.setItem('examDraft', JSON.stringify(exam.examData));
        } else {
            localStorage.setItem('examDraft', JSON.stringify({
                title: exam.title,
                duration: exam.duration.split(' ')[0],
                date: exam.date
            }));
        }
        navigate('/create-exam');
    };

    return (
        <div className="p-4 sm:p-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 sm:mb-10">
                    <h1 className="text-2xl sm:text-[32px] font-bold text-[#0F172A] tracking-tight">Manage Exams</h1>
                    <p className="text-[#64748B] text-sm sm:text-[16px] font-medium mt-1">View, edit, and manage all your created exams.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8] group-focus-within:text-[#4F46E5] transition-colors" />
                        <input
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-[#E2E8F0] focus:border-[#4F46E5]/40 focus:bg-white outline-none text-[#0F172A] font-medium transition-all shadow-sm"
                            placeholder="Search exams..."
                        />
                    </div>
                    <button className="px-6 py-4 bg-white border border-[#E2E8F0] rounded-2xl flex items-center justify-between sm:justify-center gap-6 text-[#0F172A] font-medium shadow-sm cursor-pointer hover:bg-[#F8FAFC] transition-colors">
                        All Status
                        <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                    </button>
                </div>

                {/* Exams List */}
                <div className="space-y-4">
                    {exams.map((exam) => (
                        <div key={exam.id} className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E2E8F0] shadow-sm transition-all group">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
                                <div className="space-y-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h3 className="text-lg sm:text-[19px] font-medium text-[#0F172A]">{exam.title}</h3>
                                        <span className={`px-3 py-1 rounded-full text-[10px] sm:text-[12px] font-medium ${exam.status === 'Scheduled' ? 'bg-[#EFF6FF] text-[#3B82F6]' :
                                            exam.status === 'Completed' ? 'bg-[#F0FDF4] text-[#22C55E]' :
                                                'bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0]'
                                            }`}>
                                            {exam.status}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                                        <div className="flex items-center gap-2 text-[#475569]">
                                            <Calendar className="w-4 h-4 text-[#64748B]" />
                                            <span className="text-[13px] sm:text-[14px] font-medium text-[#0F172A]">{exam.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#475569]">
                                            <Clock className="w-4 h-4 text-[#64748B]" />
                                            <span className="text-[13px] sm:text-[14px] font-medium text-[#0F172A]">{exam.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#475569]">
                                            <Users className="w-4 h-4 text-[#64748B]" />
                                            <span className="text-[13px] sm:text-[14px] font-medium text-[#0F172A]">{exam.students} students</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 border-t sm:border-t-0 pt-4 sm:pt-0">
                                    <button
                                        onClick={() => handleEdit(exam)}
                                        className="flex-1 sm:flex-none p-3 text-[#6366F1] hover:bg-[#EEF2FF] rounded-xl transition-colors cursor-pointer flex justify-center"
                                        title="View Details"
                                    >
                                        <Eye className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleEdit(exam)}
                                        className="flex-1 sm:flex-none p-3 text-[#3B82F6] hover:bg-[#EFF6FF] rounded-xl transition-colors cursor-pointer flex justify-center"
                                        title="Edit Exam"
                                    >
                                        <Edit3 className="w-5 h-5" />
                                    </button>
                                    <button className="flex-1 sm:flex-none p-3 text-[#EF4444] hover:bg-[#FEF2F2] rounded-xl transition-colors cursor-pointer flex justify-center" title="Delete Exam">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageExams;
