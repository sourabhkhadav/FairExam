import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, PlusCircle, BookOpen, Monitor,
    AlertCircle, FileCheck, BarChart3, UserCircle, Shield,
    Search, Calendar, Clock, Users, Eye, Edit3, Trash2, ChevronDown, Settings
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const ManageExams = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    const [exams, setExams] = useState([
        {
            id: 1, title: "Database Management Final", date: "2026-02-15", startTime: "10:00", duration: "120 min", students: 85, status: "Scheduled",
            examData: { title: "Database Management Final", duration: "120", questions: [], startDate: "2026-02-15", startTime: "10:00" }
        },
        {
            id: 2, title: "Data Structures Mid-Term", date: "2026-02-10", startTime: "09:00", duration: "90 min", students: 120, status: "Completed",
            examData: { title: "Data Structures Mid-Term", duration: "90", questions: [] }
        },
        {
            id: 4, title: "Operating Systems Final", date: "2026-02-20", startTime: "14:00", duration: "120 min", students: 110, status: "Draft",
            examData: { title: "Operating Systems Final", duration: "120", questions: [] }
        },
    ]);

    useEffect(() => {
        const published = JSON.parse(localStorage.getItem('publishedExams') || '[]');
        if (published.length > 0) {
            setExams(prev => [...published.map((e, i) => ({
                id: e.id || `pub-${i}`,
                examData: e,
                title: e.title,
                date: e.startDate || "Today",
                startTime: e.startTime,
                duration: `${e.duration || 0} min`,
                students: 0,
                status: e.visibility || "Published"
            })), ...prev]);
        }
    }, []);

    // Scheduling Logic: Check every minute if an exam should go Public
    useEffect(() => {
        const checkScheduling = () => {
            const now = new Date();
            setExams(prev => prev.map(exam => {
                if (exam.status === 'Scheduled' && exam.examData?.startDate && exam.examData?.startTime) {
                    const examStart = new Date(`${exam.examData.startDate}T${exam.examData.startTime}`);
                    if (now >= examStart) {
                        return { ...exam, status: 'Public' };
                    }
                }
                return exam;
            }));
        };

        const interval = setInterval(checkScheduling, 60000); // Check every minute
        checkScheduling(); // Initial check
        return () => clearInterval(interval);
    }, []);

    const handleEdit = (exam) => {
        navigate(`/edit-exam/${exam.id}`);
    };

    const handleConfigure = (exam) => {
        localStorage.setItem('examDraft', JSON.stringify(exam.examData || exam));
        navigate(`/configure-exam/${exam.id}`);
    };

    const handleOpenSchedule = (exam) => {
        setSelectedExam(exam);
        const now = new Date();
        setScheduleDate(now.toISOString().split('T')[0]);
        setScheduleTime(now.toTimeString().slice(0, 5));
        setShowScheduleModal(true);
    };

    const handleConfirmSchedule = () => {
        if (!scheduleDate || !scheduleTime) {
            alert("Please select both date and time");
            return;
        }

        const scheduledAt = `${scheduleDate}T${scheduleTime}`;
        const updatedExams = exams.map(exam => {
            if (exam.id === selectedExam.id) {
                const updatedExamData = {
                    ...(exam.examData || {}),
                    startDate: scheduleDate,
                    startTime: scheduleTime,
                    visibility: 'Scheduled'
                };
                return {
                    ...exam,
                    status: 'Scheduled',
                    date: scheduleDate,
                    startTime: scheduleTime,
                    examData: updatedExamData
                };
            }
            return exam;
        });

        setExams(updatedExams);

        // Update localStorage
        const published = JSON.parse(localStorage.getItem('publishedExams') || '[]');
        const updatedPublished = published.filter(e => e.id !== selectedExam.id);
        const examToUpdate = updatedExams.find(e => e.id === selectedExam.id);
        updatedPublished.push(examToUpdate.examData);
        localStorage.setItem('publishedExams', JSON.stringify(updatedPublished));

        setShowScheduleModal(false);
        setSelectedExam(null);
    };

    const filteredExams = exams.filter(exam => {
        const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'All' || exam.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                            className="px-6 py-4 bg-white border border-[#E2E8F0] rounded-2xl flex items-center justify-between sm:justify-center gap-6 text-[#0F172A] font-medium shadow-sm cursor-pointer hover:bg-[#F8FAFC] transition-colors min-w-[160px]"
                        >
                            {selectedStatus} Status
                            <ChevronDown className={`w-4 h-4 text-[#94A3B8] transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showStatusDropdown && (
                            <div className="absolute right-0 mt-2 w-full bg-white border border-[#E2E8F0] rounded-2xl shadow-xl z-10 overflow-hidden">
                                {['All', 'Draft', 'Scheduled', 'Public', 'Completed'].map(status => (
                                    <button
                                        key={status}
                                        className="w-full px-6 py-3 text-left hover:bg-[#F8FAFC] text-[#0F172A] font-medium transition-colors"
                                        onClick={() => {
                                            setSelectedStatus(status);
                                            setShowStatusDropdown(false);
                                        }}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Exams List */}
                <div className="space-y-4">
                    {filteredExams.map((exam) => (
                        <div key={exam.id} className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E2E8F0] shadow-sm transition-all group">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
                                <div className="space-y-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h3 className="text-lg sm:text-[19px] font-medium text-[#0F172A]">{exam.title}</h3>
                                        <span className={`px-3 py-1 rounded-full text-[10px] sm:text-[12px] font-medium ${exam.status === 'Scheduled' ? 'bg-[#F0F9FF] text-[#0369A1] border border-[#BAE6FD]' :
                                            exam.status === 'Public' ? 'bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]' :
                                                exam.status === 'Completed' ? 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]' :
                                                    'bg-orange-50 text-orange-700 border border-orange-200'
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
                                            <span className="text-[13px] sm:text-[14px] font-medium text-[#0F172A]">{exam.students} candidates</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 border-t sm:border-t-0 pt-4 sm:pt-0">
                                    {exam.status === 'Draft' && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleConfigure(exam)}
                                                className="flex-1 sm:flex-none p-3 text-[#4F46E5] hover:bg-[#F5F3FF] rounded-xl transition-colors cursor-pointer flex justify-center items-center gap-2"
                                                title="Configure & Publish"
                                            >
                                                <Settings className="w-5 h-5" />
                                                <span className="text-xs font-bold uppercase sm:hidden">Configure</span>
                                            </button>
                                            <button
                                                onClick={() => handleOpenSchedule(exam)}
                                                className="flex-1 sm:flex-none p-3 text-[#10B981] hover:bg-[#ECFDF5] rounded-xl transition-colors cursor-pointer flex justify-center items-center gap-2"
                                                title="Schedule Exam"
                                            >
                                                <Calendar className="w-5 h-5" />
                                                <span className="text-xs font-bold uppercase sm:hidden">Schedule</span>
                                            </button>
                                        </div>
                                    )}
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

                {/* Scheduling Modal */}
                {showScheduleModal && (
                    <div className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-[#E2E8F0] animate-in fade-in zoom-in duration-200">
                            <div className="p-8">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                        <Calendar className="w-6 h-6 text-[#4F46E5]" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0F172A]">Schedule Exam</h3>
                                        <p className="text-[#64748B] text-sm font-medium">Set start date and time</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">Start Date</label>
                                        <div className="relative group">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] group-focus-within:text-[#4F46E5] transition-colors" />
                                            <input
                                                type="date"
                                                className="w-full pl-11 pr-4 py-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#4F46E5]/40 focus:bg-white outline-none text-[#0F172A] font-medium transition-all"
                                                value={scheduleDate}
                                                onChange={(e) => setScheduleDate(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">Start Time</label>
                                        <div className="relative group">
                                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] group-focus-within:text-[#4F46E5] transition-colors" />
                                            <input
                                                type="time"
                                                className="w-full pl-11 pr-4 py-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#4F46E5]/40 focus:bg-white outline-none text-[#0F172A] font-medium transition-all"
                                                value={scheduleTime}
                                                onChange={(e) => setScheduleTime(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-10">
                                    <button
                                        onClick={() => setShowScheduleModal(false)}
                                        className="flex-1 px-6 py-4 bg-white border border-[#E2E8F0] text-[#64748B] font-bold text-sm rounded-2xl hover:bg-[#F8FAFC] transition-all cursor-pointer"
                                    >
                                        CANCEL
                                    </button>
                                    <button
                                        onClick={handleConfirmSchedule}
                                        className="flex-1 px-6 py-4 bg-[#4F46E5] text-white font-bold text-sm rounded-2xl hover:bg-[#4338CA] transition-all shadow-lg shadow-indigo-100 cursor-pointer"
                                    >
                                        SCHEDULE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageExams;
