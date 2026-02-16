import React, { useState } from 'react';
import {
    ChevronLeft, Search, Filter, ArrowUpDown, MoreHorizontal,
    UserCheck, UserX, BarChart3, PieChart, TrendingUp, CheckCircle,
    XCircle, Clock, AlertCircle, FileText, Download, User, Send
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const Examiner_ExamResultDetails = () => {
    const navigate = useNavigate();
    const { examId } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [cutoff, setCutoff] = useState(40);

    // Mock Data - In a real app, this would be fetched based on examId
    const examDetails = {
        name: "Database Management Final",
        date: "Feb 12, 2026",
        totalCandidates: 124,
        passed: 98,
        failed: 26,
        avgScore: 78,
        highestScore: 98,
        status: "Completed"
    };

    const students = [
        { id: 1, name: "Alex Johnson", roll: "CS2026001", marks: 92, total: 100, status: "Pass", email: "alex.j@college.edu", timeTaken: "115 min" },
        { id: 2, name: "Sarah Williams", roll: "CS2026002", marks: 45, total: 100, status: "Fail", email: "sarah.w@college.edu", timeTaken: "120 min" },
        { id: 3, name: "Michael Chen", roll: "CS2026003", marks: 88, total: 100, status: "Pass", email: "m.chen@college.edu", timeTaken: "98 min" },
        { id: 4, name: "Emma Davis", roll: "CS2026004", marks: 76, total: 100, status: "Pass", email: "emma.d@college.edu", timeTaken: "110 min" },
        { id: 5, name: "James Wilson", roll: "CS2026005", marks: 32, total: 100, status: "Fail", email: "j.wilson@college.edu", timeTaken: "45 min" },
        { id: 6, name: "Olivia Brown", roll: "CS2026006", marks: 95, total: 100, status: "Pass", email: "olivia.b@college.edu", timeTaken: "118 min" },
        { id: 7, name: "William Taylor", roll: "CS2026007", marks: 68, total: 100, status: "Pass", email: "will.t@college.edu", timeTaken: "120 min" },
        { id: 8, name: "Sophia Miller", roll: "CS2026008", marks: 82, total: 100, status: "Pass", email: "sophia.m@college.edu", timeTaken: "105 min" },
        { id: 9, name: "Daniel Anderson", roll: "CS2026009", marks: 55, total: 100, status: "Pass", email: "daniel.a@college.edu", timeTaken: "120 min" },
        { id: 10, name: "Isabella Thomas", roll: "CS2026010", marks: 28, total: 100, status: "Fail", email: "isabella.t@college.edu", timeTaken: "60 min" },
    ];

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.roll.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handlePublishResults = () => {
        const storedStatuses = JSON.parse(localStorage.getItem('exam_statuses') || '{}');
        storedStatuses[examId] = "Results Sent";
        localStorage.setItem('exam_statuses', JSON.stringify(storedStatuses));
        alert("Results have been sent successfully!");
        navigate(-1); // Go back to the previous page
    };

    // Calculate dynamic stats based on cutoff (mock data is limited to 10 students)
    const passedCount = students.filter(s => s.marks >= cutoff).length;
    const failedCount = students.length - passedCount;
    const totalStudents = students.length;

    const StatCard = ({ icon: Icon, label, value, subtext, color }) => (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} bg-opacity-10`}>
                    <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
                </div>
                {subtext && <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-full">{subtext}</span>}
            </div>
            <div>
                <div className="text-3xl font-bold text-slate-800 mb-1">{value}</div>
                <div className="text-sm font-medium text-slate-500">{label}</div>
            </div>
        </div>
    );

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-500 hover:text-[#0F172A] transition-colors text-sm font-medium group mb-2"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Results
                    </button>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{examDetails.name}</h1>
                    <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {examDetails.date}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${examDetails.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                            {examDetails.status}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm mr-2">
                        <span className="text-sm font-medium text-slate-600">Pass Cutoff:</span>
                        <input
                            type="number"
                            value={cutoff}
                            onChange={(e) => setCutoff(Number(e.target.value))}
                            className="w-12 text-center font-bold text-slate-900 outline-none border-b border-slate-200 focus:border-[#0F172A] transition-colors"
                        />
                        <span className="text-sm font-medium text-slate-400">%</span>
                    </div>

                    <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium text-sm rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
                        <Download className="w-4 h-4" />
                        Export Report
                    </button>
                    <button
                        onClick={handlePublishResults}
                        className="px-5 py-2.5 bg-[#0F172A] text-white font-medium text-sm rounded-xl hover:bg-[#1E293B] transition-colors shadow-lg shadow-slate-100 flex items-center gap-2"
                    >
                        <Send className="w-4 h-4" />
                        Send Results
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={User}
                    label="Total Candidates"
                    value={totalStudents}
                    color="bg-blue-500 text-blue-600"
                />
                <StatCard
                    icon={CheckCircle}
                    label="Passed Students"
                    value={passedCount}
                    subtext={`${((passedCount / totalStudents) * 100).toFixed(1)}%`}
                    color="bg-emerald-500 text-emerald-600"
                />
                <StatCard
                    icon={XCircle}
                    label="Failed Students"
                    value={failedCount}
                    subtext={`${((failedCount / totalStudents) * 100).toFixed(1)}%`}
                    color="bg-rose-500 text-rose-600"
                />
                <StatCard
                    icon={BarChart3}
                    label="Average Score"
                    value={`${examDetails.avgScore}/100`}
                    subtext={`Highest: ${examDetails.highestScore}`}
                    color="bg-slate-500 text-slate-600"
                />
            </div>

            {/* Students List */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="text-xl font-bold text-slate-800">Student Results</h2>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by name or roll number..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A] transition-all placeholder:text-slate-400"
                            />
                        </div>
                        <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-[#0F172A] hover:bg-slate-50 transition-colors">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200 text-left">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Roll Number</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Marks Obtained</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Percentage</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Time Taken</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-[#0F172A] font-bold text-sm">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-900">{student.name}</div>
                                                <div className="text-xs text-slate-500">{student.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-medium text-sm">{student.roll}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`font-bold text-base ${student.marks < 40 ? 'text-rose-600' : 'text-slate-700'}`}>
                                            {student.marks}
                                            <span className="text-slate-400 text-xs font-normal ml-1">/ {student.total}</span>
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="w-full max-w-[100px] mx-auto h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${student.marks < 40 ? 'bg-rose-500' :
                                                    student.marks >= 80 ? 'bg-emerald-500' : 'bg-blue-500'
                                                    }`}
                                                style={{ width: `${(student.marks / student.total) * 100}%` }}
                                            />
                                        </div>
                                        <div className="text-xs font-semibold text-slate-500 mt-1.5">
                                            {((student.marks / student.total) * 100).toFixed(0)}%
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold border ${student.marks >= cutoff
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                            : 'bg-rose-50 text-rose-700 border-rose-200'
                                            }`}>
                                            {student.marks >= cutoff ? <CheckCircle className="w-3 h-3 mr-1.5" /> : <XCircle className="w-3 h-3 mr-1.5" />}
                                            {student.marks >= cutoff ? 'Pass' : 'Fail'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-slate-500 text-sm font-medium">
                                        {student.timeTaken}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredStudents.length === 0 && (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">No students found</h3>
                        <p className="text-slate-500">Try adjusting your search query</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Examiner_ExamResultDetails;
