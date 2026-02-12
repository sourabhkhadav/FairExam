import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, PlusCircle, BookOpen, Database, Monitor,
    AlertCircle, FileCheck, BarChart3, UserCircle, Shield,
    ArrowLeft, Calendar, Clock, Globe, Settings, Eye,
    ShieldCheck, Target, Play, Save, ChevronRight,
    Bold as BoldIcon, Italic, List, ListOrdered, Link as LinkIcon, Info, Users
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const FormSection = ({ title, icon: Icon, children }) => (
    <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[32px] border border-[#E2E8F0] shadow-sm">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#4F46E5]" />
            </div>
            <h2 className="text-lg sm:text-xl font-medium text-[#0F172A]">{title}</h2>
        </div>
        {children}
    </div>
);

const Toggle = ({ label, enabled, setEnabled }) => (
    <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl hover:bg-[#F8FAFC] transition-colors group">
        <span className="text-[14px] font-medium text-[#0F172A] transition-colors">{label}</span>
        <button
            onClick={() => setEnabled(!enabled)}
            className={`w-12 h-6 rounded-full transition-all relative ${enabled ? 'bg-[#4F46E5]' : 'bg-[#E2E8F0]'}`}
        >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${enabled ? 'left-7' : 'left-1'}`} />
        </button>
    </div>
);

const CreateExam = () => {
    const navigate = useNavigate();

    // Form State
    const [examData, setExamData] = useState({
        title: '',
        type: 'MCQ',
        category: 'Database Management',
        instructions: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        timezone: '(UTC+05:30) Mumbai, Kolkata, New Delhi',
        graceTime: 15,
        duration: '',
        visibility: 'Draft',
        aiProctoring: true,
        fullScreen: true,
        camera: false,
        tabSwitchDetection: true,
        multipleFaceDetection: true,
        negMarking: false,
        penalty: 25
    });

    useEffect(() => {
        try {
            const draft = localStorage.getItem('examDraft');
            if (draft) {
                setExamData(prev => ({ ...prev, ...JSON.parse(draft) }));
            }
        } catch (e) {
            console.error("Failed to load exam draft", e);
        }
    }, []);

    const updateField = (field, value) => {
        setExamData(prev => ({ ...prev, [field]: value }));
    };

    const handleContinue = () => {
        if (!examData.title) {
            alert("Please enter an exam title");
            return;
        }
        // Save to localStorage as a mock "Current Draft"
        localStorage.setItem('examDraft', JSON.stringify(examData));
        navigate('/add-questions');
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-0">
            {/* Header */}
            <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="p-2.5 bg-white border border-[#E2E8F0] rounded-xl shadow-sm cursor-pointer hover:bg-[#F8FAFC] transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 text-[#64748B] group-hover:text-[#4F46E5]" />
                </button>
                <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-medium text-[#0F172A] tracking-tight truncate">Exam Configuration</h1>
                    <p className="text-[#0F172A]/70 text-sm sm:text-[15px] font-medium mt-1">Set up your exam details and security rules.</p>
                </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
                {/* Basic Info */}
                <FormSection title="Exam Details" icon={PlusCircle}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 col-span-1 md:col-span-2">
                            <label className="text-[13px] font-medium text-[#0F172A] ml-1 uppercase tracking-wider">Exam Title</label>
                            <input
                                className="w-full px-4 sm:px-5 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:bg-white focus:border-[#4F46E5]/40 transition-all outline-none text-[#0F172A] font-medium"
                                placeholder="e.g., Database Management Final Exam"
                                value={examData.title}
                                onChange={(e) => updateField('title', e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[13px] font-medium text-[#0F172A] ml-1 uppercase tracking-wider">Exam Type</label>
                            <select
                                className="w-full px-4 sm:px-5 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] outline-none text-[#0F172A] font-medium cursor-pointer"
                                value={examData.type}
                                onChange={(e) => updateField('type', e.target.value)}
                            >
                                <option>MCQ</option>
                                <option>Descriptive</option>
                                <option>Mixed</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[13px] font-medium text-[#0F172A] ml-1 uppercase tracking-wider">Category / Subject</label>
                            <input
                                className="w-full px-4 sm:px-5 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:bg-white focus:border-[#4F46E5]/40 transition-all outline-none text-[#0F172A] font-medium"
                                placeholder="e.g., Database Management"
                                value={examData.category}
                                onChange={(e) => updateField('category', e.target.value)}
                            />
                        </div>


                        <div className="space-y-2 col-span-1 md:col-span-2">
                            <label className="text-[13px] font-medium text-[#0F172A] ml-1 uppercase tracking-wider">Instructions</label>
                            <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col overflow-hidden">
                                <div className="p-2 border-b border-[#E2E8F0] flex gap-1 bg-white overflow-x-auto">
                                    {[BoldIcon, Italic, List, ListOrdered, LinkIcon].map((Icon, i) => (
                                        <button key={i} className="p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors flex-shrink-0">
                                            <Icon className="w-4 h-4 text-[#64748B]" />
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    rows="4"
                                    placeholder="Add professional exam instructions..."
                                    className="w-full p-4 sm:p-5 bg-transparent outline-none font-medium text-[#0F172A] placeholder:text-[#94A3B8] resize-none"
                                    value={examData.instructions}
                                    onChange={(e) => updateField('instructions', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </FormSection>

                {/* Detailed Scheduling */}
                <FormSection title="Exam Schedule" icon={Calendar}>
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Start Configuration Card */}
                        <div className="flex-1 bg-[#F8FAFC]/50 p-6 rounded-2xl border border-[#E2E8F0] space-y-6">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-lg w-fit">
                                <Play className="w-3.5 h-3.5 text-[#4F46E5]" />
                                <span className="text-[11px] font-bold text-[#4F46E5] uppercase tracking-wider">Start Configuration</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">Start Date</label>
                                    <div className="relative group">
                                        <input
                                            type="date"
                                            className="w-full pl-4 pr-10 py-3 rounded-xl bg-white border border-[#E2E8F0] font-medium text-[#0F172A] text-sm focus:border-[#4F46E5] focus:ring-4 focus:ring-indigo-50 transition-all outline-none"
                                            value={examData.startDate}
                                            onChange={(e) => updateField('startDate', e.target.value)}
                                        />
                                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">Start Time</label>
                                    <div className="relative">
                                        <input
                                            type="time"
                                            className="w-full pl-4 pr-10 py-3 rounded-xl bg-white border border-[#E2E8F0] font-medium text-[#0F172A] text-sm focus:border-[#4F46E5] focus:ring-4 focus:ring-indigo-50 transition-all outline-none"
                                            value={examData.startTime}
                                            onChange={(e) => updateField('startTime', e.target.value)}
                                        />
                                        <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">Platform Time Zone</label>
                                <div className="relative">
                                    <select
                                        className="w-full pl-4 pr-10 py-3 rounded-xl bg-white border border-[#E2E8F0] font-medium text-[#0F172A] text-sm outline-none cursor-pointer appearance-none focus:border-[#4F46E5] focus:ring-4 focus:ring-indigo-50 transition-all"
                                        value={examData.timezone}
                                        onChange={(e) => updateField('timezone', e.target.value)}
                                    >
                                        <option>(UTC+05:30) Mumbai, Kolkata, New Delhi</option>
                                        <option>(UTC+00:00) London</option>
                                        <option>(UTC-05:00) New York</option>
                                        <option>(UTC+08:00) Singapore</option>
                                    </select>
                                    <Globe className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* End Configuration Card */}
                        <div className="flex-1 bg-[#F8FAFC]/50 p-6 rounded-2xl border border-[#E2E8F0] space-y-6">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 rounded-lg w-fit">
                                <Save className="w-3.5 h-3.5 text-[#EF4444]" />
                                <span className="text-[11px] font-bold text-[#EF4444] uppercase tracking-wider">End Configuration</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">End Date</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            className="w-full pl-4 pr-10 py-3 rounded-xl bg-white border border-[#E2E8F0] font-medium text-[#0F172A] text-sm focus:border-[#4F46E5] focus:ring-4 focus:ring-indigo-50 transition-all outline-none"
                                            value={examData.endDate}
                                            onChange={(e) => updateField('endDate', e.target.value)}
                                        />
                                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">End Time</label>
                                    <div className="relative">
                                        <input
                                            type="time"
                                            className="w-full pl-4 pr-10 py-3 rounded-xl bg-white border border-[#E2E8F0] font-medium text-[#0F172A] text-sm focus:border-[#4F46E5] focus:ring-4 focus:ring-indigo-50 transition-all outline-none"
                                            value={examData.endTime}
                                            onChange={(e) => updateField('endTime', e.target.value)}
                                        />
                                        <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">Late Submission Grace (Min)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder="15"
                                        className="w-full pl-4 pr-10 py-3 rounded-xl bg-white border border-[#E2E8F0] font-medium text-[#0F172A] text-sm focus:border-[#4F46E5] focus:ring-4 focus:ring-indigo-50 transition-all outline-none"
                                        value={examData.graceTime}
                                        onChange={(e) => updateField('graceTime', e.target.value)}
                                    />
                                    <Info className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </FormSection>

                {/* Visibility, Candidates & Proctoring */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Visibility Settings - Shrunk to 1 col span */}
                    <div className="lg:col-span-1">
                        <FormSection title="Visibility Settings" icon={Eye}>
                            <div className="flex flex-col gap-3">
                                {['Draft', 'Public', 'Scheduled'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => updateField('visibility', status)}
                                        className={`px-4 py-3 rounded-xl border-2 transition-all flex items-center justify-between group ${examData.visibility === status ? 'border-[#4F46E5] bg-[#F5F3FF]/50' : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                                            }`}>
                                        <span className={`text-[13px] font-medium ${examData.visibility === status ? 'text-[#4F46E5]' : 'text-[#0F172A]'}`}>
                                            {status}
                                        </span>
                                        {examData.visibility === status && <div className="w-2 h-2 rounded-full bg-[#4D44E5]" />}
                                    </button>
                                ))}
                            </div>
                        </FormSection>
                    </div>

                    {/* NEW: Upload Candidate List */}
                    <div className="lg:col-span-1">
                        <FormSection title="Upload Candidates" icon={Users}>
                            <div className="flex flex-col gap-3">
                                <p className="text-[#0F172A]/50 text-[12px] font-medium mb-1">Import participants via list.</p>
                                <button className="w-full px-4 py-3 bg-[#F8FAFC] border-2 border-dashed border-[#E2E8F0] rounded-xl flex items-center gap-3 hover:border-[#4F46E5]/40 hover:bg-[#F5F3FF]/30 transition-all group cursor-pointer">
                                    <Database className="w-4 h-4 text-[#64748B] group-hover:text-[#4F46E5]" />
                                    <span className="text-[13px] font-medium text-[#0F172A]">Upload Excel / CSV</span>
                                </button>
                                <button className="w-full px-4 py-3 bg-[#F8FAFC] border-2 border-dashed border-[#E2E8F0] rounded-xl flex items-center gap-3 hover:border-[#4F46E5]/40 hover:bg-[#F5F3FF]/30 transition-all group cursor-pointer">
                                    <FileCheck className="w-4 h-4 text-[#64748B] group-hover:text-[#4F46E5]" />
                                    <span className="text-[13px] font-medium text-[#0F172A]">Upload PDF List</span>
                                </button>
                                <div className="mt-2 text-center">
                                    <span className="text-[11px] font-medium text-[#94A3B8] uppercase tracking-wider underline cursor-pointer hover:text-[#4F46E5]">Download Sample Template</span>
                                </div>
                            </div>
                        </FormSection>
                    </div>

                    {/* Proctoring Settings - Kept at 1 col span for balance */}
                    <div className="lg:col-span-1">
                        <FormSection title="Security Rules" icon={ShieldCheck}>
                            <div className="grid grid-cols-1 gap-1">
                                <Toggle label="AI Proctoring" enabled={examData.aiProctoring} setEnabled={(v) => updateField('aiProctoring', v)} />
                                <Toggle label="Force Full Screen" enabled={examData.fullScreen} setEnabled={(v) => updateField('fullScreen', v)} />
                                <Toggle label="Camera Mandatory" enabled={examData.camera} setEnabled={(v) => updateField('camera', v)} />
                                <Toggle label="Tab Detection" enabled={examData.tabSwitchDetection} setEnabled={(v) => updateField('tabSwitchDetection', v)} />
                            </div>
                        </FormSection>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 py-10 border-t border-[#E2E8F0]">
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <button className="px-6 py-3 bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] font-medium rounded-xl hover:bg-[#F1F5F9] transition-colors cursor-pointer w-full sm:w-auto">
                            Save Draft
                        </button>
                        <button className="px-6 py-3 bg-white border border-[#E2E8F0] text-[#0F172A] font-medium rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer w-full sm:w-auto">
                            Preview Exam
                        </button>
                    </div>
                    <div className="flex gap-4 w-full sm:w-auto">
                        <button
                            onClick={handleContinue}
                            className="px-10 py-3 bg-[#4D44E5] text-white font-medium rounded-xl hover:bg-[#4338CA] transition-all shadow-sm cursor-pointer w-full sm:w-auto"
                        >
                            Continue to Questions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateExam;
