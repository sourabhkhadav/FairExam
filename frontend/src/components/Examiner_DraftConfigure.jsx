import React, { useState, useEffect } from 'react';
import {
    PlusCircle, ArrowLeft, Calendar, Clock, Globe, Eye,
    ShieldCheck, Save, Users, Database, FileCheck, Info, Play
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const FormSection = ({ title, icon: Icon, children }) => (
    <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[32px] border border-[#E2E8F0] shadow-sm">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#0F172A]" />
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
            className={`w-12 h-6 rounded-full transition-all relative ${enabled ? 'bg-[#0F172A]' : 'bg-[#E2E8F0]'}`}
        >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${enabled ? 'left-7' : 'left-1'}`} />
        </button>
    </div>
);

const Examiner_DraftConfigure = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [showScheduleModal, setShowScheduleModal] = useState(false);

    const [examData, setExamData] = useState({
        title: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        timezone: '(UTC+05:30) Mumbai, Kolkata, New Delhi',
        graceTime: 15,
        visibility: 'Draft',
        violationLimits: {
            faceLimit: 5,
            soundLimit: 5,
            fullscreenLimit: 5
        }
    });

    useEffect(() => {
        // Mock loading data
        const draft = localStorage.getItem('examDraft');
        if (draft) {
            setExamData(prev => ({ ...prev, ...JSON.parse(draft) }));
        }
    }, [id]);

    const updateField = (field, value) => {
        setExamData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        // Save logic (mock)
        const published = JSON.parse(localStorage.getItem('publishedExams') || '[]');
        const updatedExams = [...published, { ...examData, id: id || Date.now() }];
        localStorage.setItem('publishedExams', JSON.stringify(updatedExams));
        navigate('/manage-exams');
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-0 py-10">
            <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
                <button
                    onClick={() => navigate('/manage-exams')}
                    className="p-2.5 bg-white border border-[#E2E8F0] rounded-xl shadow-sm cursor-pointer hover:bg-[#F8FAFC] transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 text-[#64748B] group-hover:text-[#0F172A]" />
                </button>
                <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-medium text-[#0F172A] tracking-tight truncate">Finalize Configuration</h1>
                    <p className="text-[#0F172A]/70 text-sm sm:text-[15px] font-medium mt-1">Configure scheduling, candidates, and security for: <span className="text-[#0F172A] uppercase font-bold">{examData.title}</span></p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Schedule */}
                <FormSection title="Exam Date and Time" icon={Calendar}>
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1 bg-[#F8FAFC]/50 p-6 rounded-2xl border border-[#E2E8F0] space-y-6">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg w-fit">
                                <Play className="w-3.5 h-3.5 text-[#0F172A]" />
                                <span className="text-[11px] font-bold text-[#0F172A] uppercase tracking-wider">Start Configuration</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">Exam Date</label>
                                    <input type="date" className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] outline-none"
                                        value={examData.startDate} onChange={e => updateField('startDate', e.target.value)} />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">Exam Time</label>
                                    <input type="time" className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] outline-none"
                                        value={examData.startTime} onChange={e => updateField('startTime', e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">Time Zone</label>
                                <select className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] outline-none"
                                    value={examData.timezone} onChange={e => updateField('timezone', e.target.value)}>
                                    <option>(UTC+05:30) Mumbai, Kolkata, New Delhi</option>
                                    <option>(UTC+00:00) London</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex-1 bg-[#F8FAFC]/50 p-6 rounded-2xl border border-[#E2E8F0] space-y-6">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 rounded-lg w-fit">
                                <Save className="w-3.5 h-3.5 text-[#EF4444]" />
                                <span className="text-[11px] font-bold text-[#EF4444] uppercase tracking-wider">End Configuration</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">End Date</label>
                                    <input type="date" className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] outline-none"
                                        value={examData.endDate} onChange={e => updateField('endDate', e.target.value)} />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">End Time</label>
                                    <input type="time" className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] outline-none"
                                        value={examData.endTime} onChange={e => updateField('endTime', e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">Grace Time (Min)</label>
                                <input type="number" className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] outline-none"
                                    value={examData.graceTime} onChange={e => updateField('graceTime', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </FormSection>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Violation Limits */}
                    <FormSection title="Violation Limits" icon={ShieldCheck}>
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">Face Detection Limit</label>
                                <input 
                                    type="number" 
                                    min="1"
                                    max="20"
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] outline-none focus:border-[#0F172A] transition-colors"
                                    value={examData.violationLimits?.faceLimit || 5}
                                    onChange={e => updateField('violationLimits', { ...examData.violationLimits, faceLimit: parseInt(e.target.value) })}
                                />
                                <p className="text-[10px] text-[#64748B] ml-1">Max face violations before action</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">Sound Detection Limit</label>
                                <input 
                                    type="number" 
                                    min="1"
                                    max="20"
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] outline-none focus:border-[#0F172A] transition-colors"
                                    value={examData.violationLimits?.soundLimit || 5}
                                    onChange={e => updateField('violationLimits', { ...examData.violationLimits, soundLimit: parseInt(e.target.value) })}
                                />
                                <p className="text-[10px] text-[#64748B] ml-1">Max sound violations before action</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">Fullscreen Exit Limit</label>
                                <input 
                                    type="number" 
                                    min="1"
                                    max="20"
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] outline-none focus:border-[#0F172A] transition-colors"
                                    value={examData.violationLimits?.fullscreenLimit || 5}
                                    onChange={e => updateField('violationLimits', { ...examData.violationLimits, fullscreenLimit: parseInt(e.target.value) })}
                                />
                                <p className="text-[10px] text-[#64748B] ml-1">Max fullscreen exits before action</p>
                            </div>
                        </div>
                    </FormSection>

                    {/* Candidates */}
                    <FormSection title="Candidates" icon={Users}>
                        <div className="space-y-3">
                            <div className="relative group">
                                <input
                                    type="file"
                                    accept=".csv,.xlsx,.xls"
                                    onChange={async (e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const formData = new FormData();
                                            formData.append('file', file);
                                            formData.append('examId', id || 'temp-exam-id');

                                            try {
                                                console.log('Uploading file:', file.name);
                                                const response = await fetch('http://localhost:5000/api/candidates/upload', {
                                                    method: 'POST',
                                                    body: formData
                                                });
                                                
                                                console.log('Response status:', response.status);
                                                const data = await response.json();
                                                console.log('Response data:', data);
                                                
                                                if (data.success) {
                                                    updateField('candidateFile', file.name);
                                                    updateField('students', data.count);
                                                    alert(`✅ Successfully uploaded ${data.count} candidates to database!`);
                                                } else {
                                                    console.error('Upload failed:', data);
                                                    alert(`❌ Error: ${data.message}`);
                                                }
                                            } catch (error) {
                                                console.error('Upload error:', error);
                                                alert(`❌ Upload failed: ${error.message}\n\nMake sure backend is running on port 5000`);
                                            }
                                        }
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <button className={`w-full px-4 py-3 bg-[#F8FAFC] border-2 border-dashed rounded-xl flex items-center justify-between group-hover:bg-white transition-all ${examData.candidateFile?.endsWith('.csv') || examData.candidateFile?.endsWith('.xlsx') ? 'border-[#0F172A] bg-slate-50' : 'border-[#E2E8F0]'}`}>
                                    <div className="flex items-center gap-3">
                                        <Database className={`w-4 h-4 ${examData.candidateFile?.endsWith('.csv') || examData.candidateFile?.endsWith('.xlsx') ? 'text-[#0F172A]' : 'text-[#64748B]'}`} />
                                        <span className="text-[13px] font-medium text-[#0F172A]">
                                            {examData.candidateFile?.endsWith('.csv') || examData.candidateFile?.endsWith('.xlsx') ? examData.candidateFile : 'Excel / CSV'}
                                        </span>
                                    </div>
                                    {examData.candidateFile && (examData.candidateFile.endsWith('.csv') || examData.candidateFile.endsWith('.xlsx')) && <div className="w-2 h-2 rounded-full bg-[#0F172A]" />}
                                </button>
                            </div>

                            <div className="relative group">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            updateField('candidateFile', file.name);
                                            updateField('students', Math.floor(Math.random() * 50) + 10);
                                            alert(`PDF upload coming soon: ${file.name}`);
                                        }
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <button className={`w-full px-4 py-3 bg-[#F8FAFC] border-2 border-dashed rounded-xl flex items-center justify-between group-hover:bg-white transition-all ${examData.candidateFile?.endsWith('.pdf') ? 'border-[#0F172A] bg-slate-50' : 'border-[#E2E8F0]'}`}>
                                    <div className="flex items-center gap-3">
                                        <FileCheck className={`w-4 h-4 ${examData.candidateFile?.endsWith('.pdf') ? 'text-[#0F172A]' : 'text-[#64748B]'}`} />
                                        <span className="text-[13px] font-medium text-[#0F172A]">
                                            {examData.candidateFile?.endsWith('.pdf') ? examData.candidateFile : 'PDF List'}
                                        </span>
                                    </div>
                                    {examData.candidateFile?.endsWith('.pdf') && <div className="w-2 h-2 rounded-full bg-[#0F172A]" />}
                                </button>
                            </div>
                        </div>
                    </FormSection>
                </div>

                <div className="flex justify-end gap-4 pt-10 border-t border-[#E2E8F0]">
                    <button
                        onClick={() => {
                            const updatedData = { ...examData, visibility: 'Public' };
                            const published = JSON.parse(localStorage.getItem('publishedExams') || '[]');
                            const updatedExams = [...published, { ...updatedData, id: id || Date.now() }];
                            localStorage.setItem('publishedExams', JSON.stringify(updatedExams));
                            alert('✅ Exam Published Successfully!');
                            navigate('/manage-exams');
                        }}
                        className="px-10 py-3 bg-[#0F172A] text-white font-medium rounded-xl hover:bg-[#1E293B] transition-all shadow-sm"
                    >
                        Publish Exam
                    </button>
                    <button
                        onClick={() => setShowScheduleModal(true)}
                        className="px-10 py-3 bg-[#334155] text-white font-medium rounded-xl hover:bg-[#475569] transition-all shadow-sm"
                    >
                        Schedule Exam
                    </button>
                </div>
            </div>

            {/* Schedule Modal */}
            {showScheduleModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-[#0F172A]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-medium text-[#0F172A]">Exam Date and Time</h2>
                                <p className="text-sm text-[#64748B]">Set exam schedule</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1 block mb-2">Exam Date</label>
                                <input 
                                    type="date" 
                                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] outline-none focus:border-[#0F172A] transition-colors"
                                    value={examData.startDate} 
                                    onChange={e => updateField('startDate', e.target.value)} 
                                />
                            </div>

                            <div>
                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1 block mb-2">Exam Time</label>
                                <input 
                                    type="time" 
                                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] outline-none focus:border-[#0F172A] transition-colors"
                                    value={examData.startTime} 
                                    onChange={e => updateField('startTime', e.target.value)} 
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={() => setShowScheduleModal(false)}
                                className="flex-1 px-6 py-3 bg-white border border-[#E2E8F0] text-[#0F172A] font-medium rounded-xl hover:bg-[#F8FAFC] transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (!examData.startDate || !examData.startTime) {
                                        alert('❌ Please set start date and time for scheduling');
                                        return;
                                    }
                                    const updatedData = { ...examData, visibility: 'Scheduled' };
                                    const published = JSON.parse(localStorage.getItem('publishedExams') || '[]');
                                    const updatedExams = [...published, { ...updatedData, id: id || Date.now() }];
                                    localStorage.setItem('publishedExams', JSON.stringify(updatedExams));
                                    setShowScheduleModal(false);
                                    alert('✅ Exam Scheduled Successfully!');
                                    navigate('/manage-exams');
                                }}
                                className="flex-1 px-6 py-3 bg-[#0F172A] text-white font-medium rounded-xl hover:bg-[#1E293B] transition-all"
                            >
                                Schedule
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Examiner_DraftConfigure;
