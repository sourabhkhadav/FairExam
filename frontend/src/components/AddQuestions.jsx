import React, { useState, useEffect } from 'react';
import {
    ArrowLeft, Plus, Trash2, CheckCircle2, Save, Send,
    Settings2, HelpCircle, GripVertical, Sparkles,
    ChevronRight, Layout, ListTodo, BrainCircuit,
    Search, Zap, MoreHorizontal, Copy, Eye,
    Target, Clock, BarChart, Info, AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddQuestions = () => {
    const navigate = useNavigate();
    const [metaData, setMetaData] = useState(null);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [showSetup, setShowSetup] = useState(true);
    const [sectionConfig, setSectionConfig] = useState({
        count: 1,
        perSection: { 0: 1 }
    });

    const [questions, setQuestions] = useState([
        {
            id: 1,
            sectionId: 0,
            type: 'MCQ',
            text: 'Which architectural pattern is best suited for decoupling frontend and backend services in a distributed system?',
            options: ['Layered Architecture', 'Microservices', 'Monolithic', 'Client-Server'],
            correct: 1,
            marks: 2,
            difficulty: 'Medium',
            tags: ['Architecture', 'Scaling']
        }
    ]);

    useEffect(() => {
        const draftStr = localStorage.getItem('examDraft');
        if (draftStr) {
            const draft = JSON.parse(draftStr);
            setMetaData(draft);
            if (draft.questions && draft.questions.length > 0) {
                setQuestions(draft.questions);
                setShowSetup(false);
                if (draft.sectionConfig) {
                    setSectionConfig(draft.sectionConfig);
                }
            }
        }
    }, []);

    const handleSetupSubmit = () => {
        let newQuestions = [];
        let qId = 1;
        for (let sIdx = 0; sIdx < sectionConfig.count; sIdx++) {
            const numQs = sectionConfig.perSection[sIdx] || 1;
            for (let qIdx = 0; qIdx < numQs; qIdx++) {
                newQuestions.push({
                    id: qId++,
                    sectionId: sIdx,
                    type: 'MCQ',
                    text: '',
                    options: ['', '', '', ''],
                    correct: 0,
                    marks: 2,
                    difficulty: 'Medium',
                    tags: []
                });
            }
        }
        setQuestions(newQuestions);
        setShowSetup(false);
    };

    const addQuestion = (sectionId) => {
        const newQ = {
            id: Date.now(),
            sectionId: sectionId ?? 0,
            type: 'MCQ',
            text: '',
            options: ['', '', '', ''],
            correct: 0,
            marks: 2,
            difficulty: 'Medium',
            tags: []
        };
        const nextQs = [...questions];
        // Insert after the last question of this section
        const lastIdxOfSection = [...nextQs].reverse().findIndex(q => q.sectionId === sectionId);
        const insertIdx = lastIdxOfSection === -1 ? nextQs.length : nextQs.length - lastIdxOfSection;
        nextQs.splice(insertIdx, 0, newQ);
        setQuestions(nextQs);
        setFocusedIndex(insertIdx);
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (file) {
            alert(`File "${file.name}" selected for import.`);
        }
    };

    const updateQuestion = (idx, field, value) => {
        setQuestions(prev => {
            const next = [...prev];
            next[idx] = { ...next[idx], [field]: value };
            return next;
        });
    };

    const updateOption = (qIdx, oIdx, value) => {
        setQuestions(prev => {
            const next = [...prev];
            const newOpts = [...next[qIdx].options];
            newOpts[oIdx] = value;
            next[qIdx] = { ...next[qIdx], options: newOpts };
            return next;
        });
    };

    const removeQuestion = (idx) => {
        if (questions.length === 1) return;
        const next = questions.filter((_, i) => i !== idx);
        setQuestions(next);
        setFocusedIndex(Math.max(0, focusedIndex - 1));
    };

    const handlePublish = () => {
        const newExam = {
            ...metaData,
            questions,
            sectionConfig,
            id: metaData.id || Date.now()
        };
        const existingExams = JSON.parse(localStorage.getItem('publishedExams') || '[]');
        const existingIdx = existingExams.findIndex(e => e.id === newExam.id);

        if (existingIdx > -1) {
            existingExams[existingIdx] = newExam;
        } else {
            existingExams.push(newExam);
        }

        localStorage.setItem('publishedExams', JSON.stringify(existingExams));
        localStorage.removeItem('examDraft');
        navigate('/manage-exams');
    };

    if (showSetup) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-[32px] border border-[#E2E8F0] shadow-xl p-8 sm:p-10 space-y-8 animate-in fade-in zoom-in duration-300">
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-[#F5F3FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Layout className="w-8 h-8 text-[#4F46E5]" />
                        </div>
                        <h2 className="text-2xl font-medium text-[#0F172A]">Exam Blueprint</h2>
                        <p className="text-[#64748B] font-medium text-sm">Configure your exam sections and structure.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-[#0F172A] uppercase tracking-wider ml-1">How many sections?</label>
                            <input
                                type="number"
                                min="1"
                                max="10"
                                className="w-full px-5 py-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] focus:bg-white focus:border-[#4F46E5]/40 outline-none text-[#0F172A] font-medium transition-all"
                                value={sectionConfig.count}
                                onChange={(e) => setSectionConfig({ ...sectionConfig, count: parseInt(e.target.value) || 1 })}
                            />
                        </div>

                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {Array.from({ length: sectionConfig.count }).map((_, i) => (
                                <div key={i} className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                                    <label className="text-xs font-medium text-[#0F172A] uppercase tracking-wider ml-1">Section {i + 1} Questions</label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-full px-5 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:bg-white focus:border-[#4F46E5]/40 outline-none text-[#0F172A] font-medium text-sm transition-all"
                                        value={sectionConfig.perSection[i] || ''}
                                        placeholder="e.g., 5"
                                        onChange={(e) => setSectionConfig({
                                            ...sectionConfig,
                                            perSection: { ...sectionConfig.perSection, [i]: parseInt(e.target.value) || 0 }
                                        })}
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleSetupSubmit}
                            className="w-full py-4 bg-[#4F46E5] text-white font-medium rounded-2xl shadow-lg shadow-indigo-100 hover:bg-[#4338CA] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
                        >
                            Start Building Exam <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[focusedIndex];

    return (
        <div className="h-full lg:h-[calc(100vh-100px)] flex flex-col min-w-0">
            {/* Page Header - Refined Light Aesthetic */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-8 px-4 lg:px-2">
                <div className="flex items-start gap-6">
                    <button
                        onClick={() => navigate('/create-exam')}
                        className="mt-1.5 p-3 bg-white border border-[#F1F5F9] hover:bg-[#F8FAFC] rounded-2xl transition-all shadow-sm group active:scale-95"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#94A3B8] group-hover:text-[#4F46E5]" />
                    </button>
                    <div className="min-w-0 space-y-2">
                        <div className="flex items-center gap-4 flex-wrap">
                            <h1 className="text-xl sm:text-[22px] font-medium text-[#0F172A] tracking-tight truncate max-w-[280px] sm:max-w-none">
                                {metaData?.title || 'System Design Final'}
                            </h1>
                            <span className="flex items-center gap-2 px-3 py-1.5 bg-[#F8FAFC] text-[#6366F1] text-[11px] font-bold uppercase rounded-xl tracking-widest border border-[#E2E8F0]/50 whitespace-nowrap">
                                <div className="w-1.5 h-1.5 bg-[#6366F1] rounded-full animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.4)]" />
                                Draft Mode
                            </span>
                        </div>
                        <div className="flex items-center gap-5 text-[#475569]">
                            <div className="flex items-center gap-2.5 text-[14px]">
                                <ListTodo className="w-4 h-4 text-[#6366F1]" />
                                <span className="font-medium text-[#0F172A]">{questions.length} Questions</span>
                            </div>
                            <div className="w-1 h-1 bg-[#E2E8F0] rounded-full" />
                            <div className="flex items-center gap-2.5 text-[14px]">
                                <Target className="w-4 h-4 text-[#6366F1]" />
                                <span className="font-medium text-[#0F172A]">{questions.reduce((a, b) => a + Number(b.marks || 0), 0)} Marks Total</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex-1 sm:flex-none justify-center px-6 py-3 bg-white border border-[#E2E8F0] text-[#1E293B] font-semibold text-[14px] rounded-2xl hover:bg-[#F8FAFC] hover:text-[#4F46E5] transition-all flex items-center gap-2.5 shadow-sm active:scale-95 whitespace-nowrap">
                        <Save className="w-4 h-4 text-[#64748B]" /> Save Draft
                    </button>
                    <button
                        onClick={handlePublish}
                        className="flex-1 sm:flex-none justify-center px-8 py-3 bg-[#4F46E5] text-white font-bold text-[14px] rounded-2xl shadow-xl shadow-indigo-100 flex items-center gap-2.5 hover:bg-[#4338CA] hover:translate-y-[-1px] active:translate-y-[0px] transition-all whitespace-nowrap"
                    >
                        Publish Exam <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Main Workspace */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-white border border-[#E2E8F0] lg:rounded-[32px] shadow-sm relative">

                {/* Mobile Navigation Trigger */}
                <button
                    onClick={() => setIsNavOpen(true)}
                    className="lg:hidden absolute bottom-6 right-6 z-30 w-14 h-14 bg-white border border-[#E2E8F0] rounded-full shadow-lg flex items-center justify-center text-[#4F46E5]"
                >
                    <ListTodo className="w-6 h-6" />
                </button>

                {/* Mobile Overlay */}
                {isNavOpen && (
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] lg:hidden"
                        onClick={() => setIsNavOpen(false)}
                    />
                )}

                {/* 1. Navigation Panel (Left Internal Panel) */}
                <div className={`
                    w-full lg:w-80 border-r border-[#E2E8F0] flex flex-col bg-white
                    fixed lg:relative inset-y-0 left-0 z-[70] lg:z-10 transition-transform duration-300
                    ${isNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    <div className="p-6 border-b border-[#F1F5F9] flex items-center justify-between bg-[#F8FAFC]/50">
                        <div className="font-semibold text-[#1E293B] text-sm tracking-tight">Question Navigator</div>
                        <button onClick={() => setIsNavOpen(false)} className="lg:hidden p-2 text-[#94A3B8] hover:bg-white rounded-xl border border-[#E2E8F0]">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-4 border-b border-[#F1F5F9]">
                        <div className="relative group">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] group-focus-within:text-[#6366F1] transition-colors" />
                            <input
                                placeholder="Find question..."
                                className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-[13.5px] outline-none focus:bg-white focus:border-[#6366F1]/30 transition-all font-medium placeholder:text-[#94A3B8]/70"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar">
                        {Array.from({ length: sectionConfig.count }).map((_, sIdx) => (
                            <div key={sIdx} className="space-y-4">
                                <div className="flex items-center justify-between px-1">
                                    <h3 className="text-[10px] font-medium text-[#0F172A] uppercase tracking-[0.15em] flex items-center gap-2.5">
                                        <div className="w-1 h-1 bg-[#6366F1] rounded-full" />
                                        Section {sIdx + 1}
                                    </h3>
                                    <button
                                        onClick={() => addQuestion(sIdx)}
                                        className="p-1 text-[#0F172A] hover:text-[#6366F1] transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {questions.filter(q => q.sectionId === sIdx).map((q) => {
                                        const globalIdx = questions.findIndex(item => item.id === q.id);
                                        return (
                                            <div
                                                key={q.id}
                                                onClick={() => {
                                                    setFocusedIndex(globalIdx);
                                                    setIsNavOpen(false);
                                                }}
                                                className={`group p-4 rounded-2xl border transition-all cursor-pointer relative ${focusedIndex === globalIdx
                                                    ? 'border-[#6366F1]/30 bg-[#F5F3FF]/50 shadow-sm'
                                                    : 'border-[#F1F5F9] hover:border-[#E2E8F0] bg-white'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${focusedIndex === globalIdx ? 'bg-[#6366F1] text-white' : 'bg-[#F1F5F9] text-[#64748B]'
                                                        }`}>
                                                        Q{globalIdx + 1}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[9px] font-medium text-[#0F172A] uppercase tracking-wider">{q.difficulty}</span>
                                                        <GripVertical className="w-3.5 h-3.5 text-[#CBD5E1] opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                </div>
                                                <p className={`text-[13px] font-medium line-clamp-2 leading-relaxed ${focusedIndex === globalIdx ? 'text-[#4F46E5]' : 'text-[#0F172A]'
                                                    }`}>
                                                    {q.text || <span className="text-[#94A3B8] italic font-normal">No content...</span>}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 border-t border-[#F1F5F9] bg-[#F8FAFC]/50">
                        {/* Bulk Import Option */}
                        <div className="relative group">
                            <input
                                type="file"
                                accept=".xlsx,.xls,.csv,.doc,.docx"
                                onChange={handleImport}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <button
                                className="w-full py-3.5 bg-white border border-[#E2E8F0] rounded-2xl text-[#6366F1] font-semibold text-[13px] hover:bg-[#6366F1] hover:text-white transition-all flex items-center justify-center gap-2.5 shadow-sm"
                            >
                                <Sparkles className="w-4 h-4" /> Bulk Import
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. Editor Panel (Center Panel) */}
                <div className="flex-1 bg-[#F8FAFC] overflow-y-auto p-4 sm:p-12 custom-scrollbar">
                    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
                        {/* Internal Navigation Shortcuts */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 px-3 py-1 bg-white border border-[#E2E8F0] rounded-full shadow-sm">
                                <button
                                    disabled={focusedIndex === 0}
                                    onClick={() => setFocusedIndex(focusedIndex - 1)}
                                    className="p-1 hover:bg-[#F1F5F9] rounded-full transition-colors disabled:opacity-30"
                                >
                                    <ArrowLeft className="w-4 h-4 text-[#64748B]" />
                                </button>
                                <span className="text-xs font-bold text-[#0F172A] px-2 border-x border-[#E2E8F0]">
                                    {focusedIndex + 1} of {questions.length}
                                </span>
                                <button
                                    disabled={focusedIndex === questions.length - 1}
                                    onClick={() => setFocusedIndex(focusedIndex + 1)}
                                    className="p-1 hover:bg-[#F1F5F9] rounded-full transition-colors disabled:opacity-30"
                                >
                                    <ChevronRight className="w-4 h-4 text-[#64748B]" />
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => removeQuestion(focusedIndex)}
                                    className="p-2.5 text-[#EF4444] hover:bg-[#FEF2F2] rounded-xl transition-all"
                                    title="Delete Question"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <button className="p-2.5 text-[#64748B] hover:bg-white rounded-xl transition-all border border-transparent hover:border-[#E2E8F0]">
                                    <Copy className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Focused Question Editor */}
                        <div className="bg-white rounded-2xl sm:rounded-[32px] border border-[#E2E8F0] shadow-sm p-6 sm:p-10 space-y-6 sm:space-y-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none hidden sm:block">
                                <Zap className="w-64 h-64 text-[#4F46E5]" />
                            </div>

                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                                    <div className="flex items-center gap-3">
                                        <label className="text-[11px] font-medium text-[#0F172A] uppercase tracking-[0.1em]">Section {currentQuestion.sectionId + 1}</label>
                                        <div className="w-1 h-1 bg-[#E2E8F0] rounded-full" />
                                        <label className="text-[11px] font-medium text-[#0F172A] uppercase tracking-[0.1em]">Question Context</label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <select
                                            className="bg-[#F8FAFC] border border-[#E2E8F0] text-[12px] font-medium text-[#6366F1] outline-none cursor-pointer px-3 py-1.5 rounded-xl hover:bg-white transition-colors"
                                            value={currentQuestion.difficulty}
                                            onChange={(e) => updateQuestion(focusedIndex, 'difficulty', e.target.value)}
                                        >
                                            <option>Easy</option>
                                            <option>Medium</option>
                                            <option>Hard</option>
                                        </select>
                                        <div className="flex items-center gap-2.5 bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 py-1.5 rounded-xl">
                                            <span className="text-[12px] font-normal text-[#475569]">Marks:</span>
                                            <input
                                                type="number"
                                                className="w-8 bg-transparent border-none text-[12px] font-medium text-[#6366F1] outline-none"
                                                value={currentQuestion.marks}
                                                onChange={(e) => updateQuestion(focusedIndex, 'marks', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <textarea
                                    className="w-full p-0 text-lg sm:text-[21px] font-medium text-[#0F172A] bg-transparent border-none outline-none placeholder:text-[#64748B] resize-none leading-relaxed tracking-tight"
                                    placeholder="Type your question here..."
                                    rows="3"
                                    value={currentQuestion.text}
                                    onChange={(e) => updateQuestion(focusedIndex, 'text', e.target.value)}
                                />
                            </div>

                            <div className="space-y-5">
                                <label className="text-[11px] font-medium text-[#0F172A] uppercase tracking-[0.15em]">Answers & Options</label>
                                <div className="space-y-4">
                                    {currentQuestion.options.map((opt, oIdx) => (
                                        <div
                                            key={oIdx}
                                            className={`flex items-start sm:items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl border transition-all ${currentQuestion.correct === oIdx
                                                ? 'border-[#6366F1]/30 bg-[#F5F3FF]/30'
                                                : 'border-[#E2E8F0]/80 hover:border-[#6366F1]/50 bg-white'
                                                }`}
                                        >
                                            <div
                                                onClick={() => updateQuestion(focusedIndex, 'correct', oIdx)}
                                                className={`mt-1 sm:mt-0 w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${currentQuestion.correct === oIdx
                                                    ? 'bg-[#6366F1] border-[#6366F1]'
                                                    : 'border-[#E2E8F0] hover:border-[#6366F1]'
                                                    }`}
                                            >
                                                {currentQuestion.correct === oIdx && <div className="w-2 h-2 bg-white rounded-full" />}
                                            </div>
                                            <input
                                                className="flex-1 bg-transparent border-none outline-none text-sm sm:text-[15.5px] font-medium text-[#0F172A] placeholder:text-[#64748B]"
                                                placeholder={`Option ${String.fromCharCode(65 + oIdx)}...`}
                                                value={opt}
                                                onChange={(e) => updateOption(focusedIndex, oIdx, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 flex flex-wrap items-center gap-6 text-[#475569]">
                                <button className="flex items-center gap-2.5 text-[13px] font-medium hover:text-[#6366F1] transition-colors">
                                    <Plus className="w-4 h-4" /> Add Option
                                </button>
                                <div className="w-[1px] h-4 bg-[#E2E8F0]" />
                                <button className="flex items-center gap-2.5 text-[13px] font-medium hover:text-[#6366F1] transition-colors">
                                    <Info className="w-4 h-4" /> Add Rationale
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddQuestions;
