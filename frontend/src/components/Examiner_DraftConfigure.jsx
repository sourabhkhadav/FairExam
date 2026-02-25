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

const Examiner_DraftConfigure = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);

    const [examData, setExamData] = useState({
        title: '',
        startDate: '',
        startTime: '',
        endTime: '',
        duration: 0,
        violationLimits: {
            faceLimit: 5,
            soundLimit: 5,
            fullscreenLimit: 5
        }
    });

    useEffect(() => {
        const draft = localStorage.getItem('examDraft');
        if (draft) {
            setExamData(prev => ({ ...prev, ...JSON.parse(draft) }));
        }
    }, [id]);

    const updateField = (field, value) => {
        setExamData(prev => ({ ...prev, [field]: value }));
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
                    <div className="bg-[#F8FAFC]/50 p-6 rounded-2xl border border-[#E2E8F0] space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">Exam Date</label>
                                <input 
                                    type="date" 
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] outline-none focus:border-[#0F172A] transition-colors"
                                    value={examData.startDate} 
                                    onChange={e => {
                                        updateField('startDate', e.target.value);
                                        updateField('endDate', e.target.value);
                                    }} 
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">Start Time</label>
                                <input 
                                    type="time" 
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] outline-none focus:border-[#0F172A] transition-colors"
                                    value={examData.startTime} 
                                    onChange={e => {
                                        const selectedDate = examData.startDate;
                                        const selectedTime = e.target.value;
                                        const now = new Date();
                                        const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
                                        
                                        if (selectedDate === now.toISOString().split('T')[0] && selectedDateTime <= now) {
                                            alert('⚠️ Start time cannot be in the past.');
                                            return;
                                        }
                                        updateField('startTime', selectedTime);
                                        
                                        // Auto-calculate duration
                                        if (examData.endTime) {
                                            const start = new Date(`2000-01-01T${selectedTime}`);
                                            const end = new Date(`2000-01-01T${examData.endTime}`);
                                            const durationMin = Math.floor((end - start) / (1000 * 60));
                                            if (durationMin > 0) {
                                                updateField('duration', durationMin);
                                            }
                                        }
                                    }} 
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">End Time</label>
                                <input 
                                    type="time" 
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] outline-none focus:border-[#0F172A] transition-colors"
                                    value={examData.endTime} 
                                    onChange={e => {
                                        const selectedEndTime = e.target.value;
                                        if (examData.startTime) {
                                            const start = new Date(`2000-01-01T${examData.startTime}`);
                                            const end = new Date(`2000-01-01T${selectedEndTime}`);
                                            
                                            if (end <= start) {
                                                alert('⚠️ End time must be after start time.');
                                                return;
                                            }
                                            
                                            // Auto-calculate duration
                                            const durationMin = Math.floor((end - start) / (1000 * 60));
                                            updateField('duration', durationMin);
                                        }
                                        updateField('endTime', selectedEndTime);
                                    }} 
                                />
                            </div>
                        </div>
                        
                        {examData.duration > 0 && (
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                <p className="text-sm font-semibold text-blue-900">⏱️ Exam Duration: {examData.duration} minutes</p>
                                <p className="text-xs text-blue-700 mt-1">Calculated from start and end time</p>
                            </div>
                        )}
                    </div>
                </FormSection>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Violation Limits */}
                    <FormSection title="Violation Limits" icon={ShieldCheck}>
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">Face Detection Limit</label>
                                <input 
                                    type="text" 
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] outline-none focus:border-[#0F172A] transition-colors"
                                    value={examData.violationLimits?.faceLimit ?? 5}
                                    onChange={e => {
                                        const value = e.target.value.replace(/[^0-9]/g, '');
                                        const numValue = value === '' ? 0 : parseInt(value, 10);
                                        updateField('violationLimits', { ...examData.violationLimits, faceLimit: numValue });
                                    }}
                                />
                                <p className="text-[10px] text-[#64748B] ml-1">Max face violations before action (0 = disabled)</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">Sound Detection Limit</label>
                                <input 
                                    type="text" 
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] outline-none focus:border-[#0F172A] transition-colors"
                                    value={examData.violationLimits?.soundLimit ?? 5}
                                    onChange={e => {
                                        const value = e.target.value.replace(/[^0-9]/g, '');
                                        const numValue = value === '' ? 0 : parseInt(value, 10);
                                        updateField('violationLimits', { ...examData.violationLimits, soundLimit: numValue });
                                    }}
                                />
                                <p className="text-[10px] text-[#64748B] ml-1">Max sound violations before action (0 = disabled)</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1">Fullscreen Exit Limit</label>
                                <input 
                                    type="text" 
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] outline-none focus:border-[#0F172A] transition-colors"
                                    value={examData.violationLimits?.fullscreenLimit ?? 5}
                                    onChange={e => {
                                        const value = e.target.value.replace(/[^0-9]/g, '');
                                        const numValue = value === '' ? 0 : parseInt(value, 10);
                                        updateField('violationLimits', { ...examData.violationLimits, fullscreenLimit: numValue });
                                    }}
                                />
                                <p className="text-[10px] text-[#64748B] ml-1">Max fullscreen exits before action (0 = disabled)</p>
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
                                                const response = await fetch('http://localhost:5000/api/candidates/upload', {
                                                    method: 'POST',
                                                    body: formData
                                                });
                                                
                                                const data = await response.json();
                                                
                                                if (data.success) {
                                                    updateField('candidateFile', file.name);
                                                    updateField('students', data.count);
                                                    alert(`✅ Successfully uploaded ${data.count} candidates!`);
                                                } else {
                                                    alert(`❌ Error: ${data.message}`);
                                                }
                                            } catch (error) {
                                                alert(`❌ Upload failed: ${error.message}`);
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
                        </div>
                    </FormSection>
                </div>

                <div className="flex justify-end gap-4 pt-10 border-t border-[#E2E8F0]">
                    <button
                        onClick={async () => {
                            if (!examData.startDate || !examData.startTime || !examData.endTime || !examData.duration) {
                                alert('❌ Please fill in exam date, start time, and end time');
                                return;
                            }
                            setIsPublishing(true);
                            try {
                                const token = localStorage.getItem('token');
                                const updatedData = { 
                                    ...examData,
                                    endDate: examData.startDate,
                                    status: 'published',
                                    violationLimits: examData.violationLimits
                                };
                                
                                const response = await fetch(`http://localhost:5000/api/exams/${id}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                    },
                                    body: JSON.stringify(updatedData)
                                });
                                
                                if (response.ok) {
                                    const emailResponse = await fetch(`http://localhost:5000/api/email/bulk-invitation/${id}`, {
                                        method: 'POST',
                                        headers: {
                                            'Authorization': `Bearer ${token}`
                                        }
                                    });
                                    
                                    const emailData = await emailResponse.json();
                                    if (emailData.success) {
                                        alert(`✅ Exam Published Successfully!\n\nEmail notifications sent to ${emailData.results.sent} candidates.\n\nExam Details:\n📅 Date: ${examData.startDate}\n⏰ Time: ${examData.startTime} - ${examData.endTime}\n⏱️ Duration: ${examData.duration} minutes`);
                                    } else {
                                        alert('✅ Exam Published! But failed to send some email notifications.');
                                    }
                                    navigate('/manage-exams');
                                } else {
                                    const error = await response.json();
                                    alert(`Failed to publish exam: ${error.message || 'Unknown error'}`);
                                }
                            } catch (error) {
                                console.error('Publish error:', error);
                                alert('Failed to publish exam');
                            } finally {
                                setIsPublishing(false);
                            }
                        }}
                        disabled={isPublishing}
                        className="px-10 py-3 bg-[#0F172A] text-white font-medium rounded-xl hover:bg-[#1E293B] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isPublishing ? (
                            <>
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Publishing...
                            </>
                        ) : 'Publish Exam'}
                    </button>
                    <button
                        onClick={() => {
                            if (!examData.startDate || !examData.startTime || !examData.endTime || !examData.duration) {
                                alert('❌ Please fill in exam date, start time, and end time');
                                return;
                            }
                            setShowScheduleModal(true);
                        }}
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
                                <h2 className="text-xl font-medium text-[#0F172A]">Schedule Email Notification</h2>
                                <p className="text-sm text-[#64748B]">When should we send notifications?</p>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                            <p className="text-sm text-blue-900 font-medium">📧 Email will be sent on the selected date</p>
                            <p className="text-xs text-blue-700 mt-1">Exam: {examData.startDate} at {examData.startTime}</p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1 block mb-2">Send Email On</label>
                                <input 
                                    type="date" 
                                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] outline-none focus:border-[#0F172A] transition-colors"
                                    value={examData.scheduleEmailDate || ''} 
                                    onChange={e => updateField('scheduleEmailDate', e.target.value)} 
                                />
                            </div>

                            <div>
                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest ml-1 block mb-2">Send Email At</label>
                                <input 
                                    type="time" 
                                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] outline-none focus:border-[#0F172A] transition-colors"
                                    value={examData.scheduleEmailTime || ''} 
                                    onChange={e => updateField('scheduleEmailTime', e.target.value)} 
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
                                onClick={async () => {
                                    if (!examData.scheduleEmailDate || !examData.scheduleEmailTime) {
                                        alert('❌ Please select date and time for sending email notifications');
                                        return;
                                    }
                                    
                                    const scheduleDateTime = new Date(`${examData.scheduleEmailDate}T${examData.scheduleEmailTime}`);
                                    const now = new Date();
                                    
                                    if (scheduleDateTime <= now) {
                                        alert('❌ Schedule date/time must be in the future');
                                        return;
                                    }
                                    
                                    try {
                                        const token = localStorage.getItem('token');
                                        const updatedData = { 
                                            ...examData,
                                            endDate: examData.startDate,
                                            status: 'published',
                                            violationLimits: examData.violationLimits,
                                            scheduleEmailDate: examData.scheduleEmailDate,
                                            scheduleEmailTime: examData.scheduleEmailTime
                                        };
                                        
                                        const response = await fetch(`http://localhost:5000/api/exams/${id}`, {
                                            method: 'PUT',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': `Bearer ${token}`
                                            },
                                            body: JSON.stringify(updatedData)
                                        });
                                        
                                        if (response.ok) {
                                            setShowScheduleModal(false);
                                            alert(`✅ Exam Scheduled Successfully!\n\nEmail notifications will be sent on:\n📅 ${examData.scheduleEmailDate}\n⏰ ${examData.scheduleEmailTime}\n\nExam Details:\n📅 Date: ${examData.startDate}\n⏰ Time: ${examData.startTime}`);
                                            navigate('/manage-exams');
                                        } else {
                                            const error = await response.json();
                                            alert(`Failed to schedule exam: ${error.message || 'Unknown error'}`);
                                        }
                                    } catch (error) {
                                        console.error('Schedule error:', error);
                                        alert('Failed to schedule exam');
                                    }
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
