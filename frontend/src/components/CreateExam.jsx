import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, PlusCircle, BookOpen, Database, Monitor,
    AlertCircle, FileCheck, BarChart3, UserCircle, Shield,
    ArrowLeft, Calendar, Clock, Globe, Settings, Eye,
    ShieldCheck, Target, Play, Save, ChevronRight,
    Bold as BoldIcon, Italic, List, ListOrdered, Link as LinkIcon, Info
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const FormSection = ({ title, icon: Icon, children }) => (
    <div className="bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-sm">
        <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#4F46E5]" />
            </div>
            <h2 className="text-xl font-bold text-[#0F172A]">{title}</h2>
        </div>
        {children}
    </div>
);

const Toggle = ({ label, enabled, setEnabled }) => (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-[#F8FAFC] transition-colors group">
        <span className="text-[14px] font-semibold text-[#64748B] group-hover:text-[#0F172A] transition-colors">{label}</span>
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
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-6 mb-10">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="p-2.5 bg-white border border-[#E2E8F0] rounded-xl shadow-sm cursor-pointer hover:bg-[#F8FAFC] transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 text-[#64748B] group-hover:text-[#4F46E5]" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Create New Exam</h1>
                    <p className="text-[#64748B] text-[15px] font-medium mt-1">Set up your exam with AI-powered proctoring and security features.</p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Basic Info */}
                <FormSection title="Exam Details" icon={PlusCircle}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 col-span-2">
                            <label className="text-[13px] font-semibold text-[#64748B] ml-1">Exam Title</label>
                            <input
                                className="w-full px-5 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:bg-white focus:border-[#4F46E5]/40 transition-all outline-none text-[#0F172A] font-medium"
                                placeholder="e.g., Database Management Final Exam"
                                value={examData.title}
                                onChange={(e) => updateField('title', e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[13px] font-semibold text-[#64748B] ml-1">Exam Type</label>
                            <select
                                className="w-full px-5 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] outline-none text-[#0F172A] font-medium cursor-pointer"
                                value={examData.type}
                                onChange={(e) => updateField('type', e.target.value)}
                            >
                                <option>MCQ</option>
                                <option>Descriptive</option>
                                <option>Mixed</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[13px] font-semibold text-[#64748B] ml-1">Category / Subject</label>
                            <input
                                className="w-full px-5 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:bg-white focus:border-[#4F46E5]/40 transition-all outline-none text-[#0F172A] font-medium"
                                placeholder="e.g., Database Management"
                                value={examData.category}
                                onChange={(e) => updateField('category', e.target.value)}
                            />
                        </div>


                        <div className="space-y-2 col-span-2">
                            <label className="text-[13px] font-semibold text-[#64748B] ml-1">Instructions</label>
                            <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col overflow-hidden">
                                <div className="p-2 border-b border-[#E2E8F0] flex gap-1 bg-white">
                                    {[BoldIcon, Italic, List, ListOrdered, LinkIcon].map((Icon, i) => (
                                        <button key={i} className="p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors">
                                            <Icon className="w-4 h-4 text-[#64748B]" />
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    rows="4"
                                    placeholder="Add professional exam instructions..."
                                    className="w-full p-5 bg-transparent outline-none font-medium text-[#0F172A] placeholder:text-[#94A3B8] resize-none"
                                    value={examData.instructions}
                                    onChange={(e) => updateField('instructions', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </FormSection>

                {/* Scheduling & Attempts */}
                <FormSection title="Detailed Scheduling" icon={Calendar}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Start Section */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold text-[#4F46E5] flex items-center gap-2">
                                <Play className="w-4 h-4" /> Start Configuration
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-semibold text-[#64748B]">Start Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] font-medium text-sm focus:bg-white focus:border-[#4F46E5]/40 transition-all outline-none"
                                        value={examData.startDate}
                                        onChange={(e) => updateField('startDate', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-semibold text-[#64748B]">Start Time</label>
                                    <input
                                        type="time"
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] font-medium text-sm focus:bg-white focus:border-[#4F46E5]/40 transition-all outline-none"
                                        value={examData.startTime}
                                        onChange={(e) => updateField('startTime', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[13px] font-semibold text-[#64748B]">Time Zone</label>
                                <select
                                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] font-medium text-sm outline-none cursor-pointer"
                                    value={examData.timezone}
                                    onChange={(e) => updateField('timezone', e.target.value)}
                                >
                                    <option>(UTC+05:30) Mumbai, Kolkata, New Delhi</option>
                                    <option>(UTC+00:00) London</option>
                                    <option>(UTC-05:00) New York</option>
                                    <option>(UTC+08:00) Singapore</option>
                                </select>
                            </div>
                        </div>

                        {/* End Section */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold text-[#EF4444] flex items-center gap-2">
                                <Save className="w-4 h-4" /> End Configuration
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-semibold text-[#64748B]">End Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] font-medium text-sm focus:bg-white focus:border-[#4F46E5]/40 transition-all outline-none"
                                        value={examData.endDate}
                                        onChange={(e) => updateField('endDate', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-semibold text-[#64748B]">End Time</label>
                                    <input
                                        type="time"
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] font-medium text-sm focus:bg-white focus:border-[#4F46E5]/40 transition-all outline-none"
                                        value={examData.endTime}
                                        onChange={(e) => updateField('endTime', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[13px] font-semibold text-[#64748B]">Grace Time (minutes)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder="15"
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] font-medium text-sm focus:bg-white focus:border-[#4F46E5]/40 transition-all outline-none"
                                        value={examData.graceTime}
                                        onChange={(e) => updateField('graceTime', e.target.value)}
                                    />
                                    <Info className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </FormSection>

                {/* Visibility & Proctoring */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormSection title="Visibility Settings" icon={Eye}>
                        <div className="grid grid-cols-3 gap-3">
                            {['Draft', 'Public', 'Scheduled'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => updateField('visibility', status)}
                                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${examData.visibility === status ? 'border-[#4F46E5] bg-[#F5F3FF]/50' : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                                        }`}>
                                    <span className={`text-[13px] font-bold ${examData.visibility === status ? 'text-[#4F46E5]' : 'text-[#64748B]'}`}>
                                        {status}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </FormSection>

                    <FormSection title="Security & Proctoring" icon={ShieldCheck}>
                        <div className="grid grid-cols-1 gap-2">
                            <Toggle label="AI Image Proctoring" enabled={examData.aiProctoring} setEnabled={(v) => updateField('aiProctoring', v)} />
                            <Toggle label="Force Full Screen" enabled={examData.fullScreen} setEnabled={(v) => updateField('fullScreen', v)} />
                            <Toggle label="Camera Required" enabled={examData.camera} setEnabled={(v) => updateField('camera', v)} />
                            <Toggle label="Tab Switch Detection" enabled={examData.tabSwitchDetection} setEnabled={(v) => updateField('tabSwitchDetection', v)} />
                            <Toggle label="Multiple Face Detection" enabled={examData.multipleFaceDetection} setEnabled={(v) => updateField('multipleFaceDetection', v)} />
                        </div>
                    </FormSection>
                </div>

                {/* Bottom Actions */}
                <div className="flex justify-between items-center py-10 border-t border-[#E2E8F0]">
                    <div className="flex gap-4">
                        <button className="px-6 py-3 bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] font-semibold rounded-xl hover:bg-[#F1F5F9] transition-colors cursor-pointer">
                            Save as Draft
                        </button>
                        <button className="px-6 py-3 bg-white border border-[#E2E8F0] text-[#0F172A] font-semibold rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer">
                            Preview Exam
                        </button>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={handleContinue}
                            className="px-10 py-3 bg-[#4F46E5] text-white font-semibold rounded-xl hover:bg-[#4338CA] transition-colors shadow-sm cursor-pointer"
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
