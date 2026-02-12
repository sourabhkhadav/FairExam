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
    const [isAIGenerating, setIsAIGenerating] = useState(false);

    const [questions, setQuestions] = useState([
        {
            id: 1,
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
        const draft = localStorage.getItem('examDraft');
        if (draft) {
            setMetaData(JSON.parse(draft));
        }
    }, []);

    const addQuestion = () => {
        const newQ = {
            id: Date.now(),
            type: 'MCQ',
            text: '',
            options: ['', '', '', ''],
            correct: 0,
            marks: 2,
            difficulty: 'Medium',
            tags: []
        };
        setQuestions([...questions, newQ]);
        setFocusedIndex(questions.length);
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
        const finalExam = { ...metaData, questions };
        const existingExams = JSON.parse(localStorage.getItem('publishedExams') || '[]');
        localStorage.setItem('publishedExams', JSON.stringify([...existingExams, finalExam]));
        localStorage.removeItem('examDraft');
        navigate('/dashboard');
    };

    const currentQuestion = questions[focusedIndex];

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col">
            {/* Page Header (Simplified Title Section) */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/create-exam')}
                        className="p-2.5 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-xl transition-all shadow-sm group"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#64748B] group-hover:text-[#4F46E5]" />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-bold text-[#0F172A]">{metaData?.title || 'System Design Final'}</h1>
                            <span className="px-2 py-0.5 bg-indigo-50 text-[#4F46E5] text-[10px] font-bold uppercase rounded tracking-wider">Draft Mode</span>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-1.5 text-[13px] text-[#64748B]">
                                <ListTodo className="w-4 h-4" />
                                <span className="font-medium">{questions.length} Questions</span>
                            </div>
                            <div className="w-1 h-1 bg-[#CBD5E1] rounded-full" />
                            <div className="flex items-center gap-1.5 text-[13px] text-[#64748B]">
                                <Target className="w-4 h-4" />
                                <span className="font-medium">{questions.reduce((a, b) => a + Number(b.marks || 0), 0)} Marks Total</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="px-5 py-2.5 bg-white border border-[#E2E8F0] text-[#64748B] font-bold text-sm rounded-xl hover:text-[#0F172A] hover:border-[#CBD5E1] transition-all flex items-center gap-2 shadow-sm">
                        <Save className="w-4 h-4" /> Save Progress
                    </button>
                    <button
                        onClick={handlePublish}
                        className="px-6 py-2.5 bg-[#4F46E5] text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-100 flex items-center gap-2 hover:bg-[#4338CA] hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Keep & Publish <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Main Workspace */}
            <div className="flex-1 flex overflow-hidden bg-white border border-[#E2E8F0] rounded-[32px] shadow-sm">
                {/* 1. Navigation Panel (Left Internal Panel) */}
                <div className="w-80 border-r border-[#E2E8F0] flex flex-col bg-white">
                    <div className="p-4 border-b border-[#F1F5F9]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                            <input
                                placeholder="Find question..."
                                className="w-full pl-9 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm outline-none focus:border-[#4F46E5]/40 transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {questions.map((q, idx) => (
                            <div
                                key={q.id}
                                onClick={() => setFocusedIndex(idx)}
                                className={`group p-4 rounded-2xl border transition-all cursor-pointer relative ${focusedIndex === idx
                                    ? 'border-[#4F46E5] bg-[#F5F3FF]/50 shadow-sm'
                                    : 'border-[#F1F5F9] hover:border-[#E2E8F0] bg-white'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${focusedIndex === idx ? 'bg-[#4F46E5] text-white' : 'bg-[#F1F5F9] text-[#64748B]'
                                        }`}>
                                        Q{idx + 1}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-[#94A3B8] uppercase">{q.difficulty}</span>
                                        <GripVertical className="w-3.5 h-3.5 text-[#CBD5E1] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                                <p className={`text-[13px] font-medium line-clamp-2 leading-relaxed ${focusedIndex === idx ? 'text-[#4F46E5]' : 'text-[#475569]'
                                    }`}>
                                    {q.text || <span className="text-[#94A3B8] italic">No question content...</span>}
                                </p>
                                {focusedIndex === idx && (
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#4F46E5] rounded-full" />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-[#F1F5F9]">
                        <button
                            onClick={addQuestion}
                            className="w-full py-3 bg-[#F8FAFC] border-2 border-dashed border-[#E2E8F0] rounded-2xl text-[#64748B] font-bold text-sm hover:border-[#4F46E5] hover:text-[#4F46E5] hover:bg-[#F5F3FF]/30 transition-all flex items-center justify-center gap-2 group"
                        >
                            <Plus className="w-4 h-4 group-hover:scale-125 transition-transform" /> Add New Question
                        </button>
                    </div>
                </div>

                {/* 2. Editor Panel (Center Panel) */}
                <div className="flex-1 bg-[#F8FAFC] overflow-y-auto p-12">
                    <div className="max-w-4xl mx-auto space-y-8">
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
                                    Question {focusedIndex + 1} of {questions.length}
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
                        <div className="bg-white rounded-[32px] border border-[#E2E8F0] shadow-sm p-10 space-y-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                                <Zap className="w-64 h-64 text-[#4F46E5]" />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-[13px] font-bold text-[#475569] uppercase tracking-wider">Question Context</label>
                                    <div className="flex items-center gap-3">
                                        <select
                                            className="bg-[#F8FAFC] border-none text-[12px] font-bold text-[#4F46E5] outline-none cursor-pointer px-3 py-1.5 rounded-lg"
                                            value={currentQuestion.difficulty}
                                            onChange={(e) => updateQuestion(focusedIndex, 'difficulty', e.target.value)}
                                        >
                                            <option>Easy</option>
                                            <option>Medium</option>
                                            <option>Hard</option>
                                        </select>
                                        <div className="flex items-center gap-2 bg-[#F8FAFC] px-3 py-1.5 rounded-lg">
                                            <span className="text-[12px] font-bold text-[#64748B]">Marks:</span>
                                            <input
                                                type="number"
                                                className="w-8 bg-transparent border-none text-[12px] font-bold text-[#4F46E5] outline-none"
                                                value={currentQuestion.marks}
                                                onChange={(e) => updateQuestion(focusedIndex, 'marks', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <textarea
                                    className="w-full p-0 text-[20px] font-bold text-[#0F172A] bg-transparent border-none outline-none placeholder:text-[#CBD5E1] resize-none leading-tight"
                                    placeholder="Click to start typing your question..."
                                    rows="3"
                                    value={currentQuestion.text}
                                    onChange={(e) => updateQuestion(focusedIndex, 'text', e.target.value)}
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[13px] font-bold text-[#475569] uppercase tracking-wider">Correct Answer & Distractors</label>
                                <div className="space-y-3">
                                    {currentQuestion.options.map((opt, oIdx) => (
                                        <div
                                            key={oIdx}
                                            className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${currentQuestion.correct === oIdx
                                                ? 'border-[#4F46E5] bg-[#F5F3FF]/30'
                                                : 'border-[#F1F5F9] hover:border-[#E2E8F0]'
                                                }`}
                                        >
                                            <div
                                                onClick={() => updateQuestion(focusedIndex, 'correct', oIdx)}
                                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${currentQuestion.correct === oIdx
                                                    ? 'bg-[#4F46E5] border-[#4F46E5]'
                                                    : 'border-[#CBD5E1] hover:border-[#4F46E5]'
                                                    }`}
                                            >
                                                {currentQuestion.correct === oIdx && <div className="w-2 h-2 bg-white rounded-full" />}
                                            </div>
                                            <input
                                                className="flex-1 bg-transparent border-none outline-none text-[15px] font-medium text-[#0F172A]"
                                                placeholder={`Enter option ${String.fromCharCode(65 + oIdx)}...`}
                                                value={opt}
                                                onChange={(e) => updateOption(focusedIndex, oIdx, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 flex items-center gap-4 text-[#64748B]">
                                <button className="flex items-center gap-2 text-[13px] font-bold hover:text-[#4F46E5] transition-colors">
                                    <Plus className="w-4 h-4" /> Add Option
                                </button>
                                <span className="text-[#E2E8F0]">|</span>
                                <button className="flex items-center gap-2 text-[13px] font-bold hover:text-[#4F46E5] transition-colors">
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
