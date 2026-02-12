import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, Menu, ChevronLeft, ChevronRight, Flag, CheckCircle, AlertTriangle, Code, Image as ImageIcon, X } from 'lucide-react';

const mockQuestions = [
    // Section 1: MCQ
    { id: 1, section: 1, type: 'mcq', question: "Which of the following consists of a key and a value?", options: ["Queue", "Hash Map", "Stack", "Tree"] },
    { id: 2, section: 1, type: 'mcq', question: "What is the time complexity of QuickSort in worst case?", options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"] },
    { id: 3, section: 1, type: 'mcq', question: "Which HTTP method is idempotent?", options: ["POST", "PUT", "PATCH", "CONNECT"] },
    { id: 4, section: 1, type: 'mcq', question: "In React, what hook is used for side effects?", options: ["useState", "useMemo", "useEffect", "useCallback"] },
    { id: 5, section: 1, type: 'mcq', question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Colorful Style Sheets"] },

    // Section 2: Descriptive
    { id: 11, section: 2, type: 'descriptive', question: "Explain the difference between 'var', 'let', and 'const' in JavaScript." },
    { id: 12, section: 2, type: 'descriptive', question: "Describe the concept of microservices architecture." },
    { id: 13, section: 2, type: 'descriptive', question: "What is CAP theorem? Explain briefly." },

    // Section 3: Mixed
    { id: 21, section: 3, type: 'code', question: "What is the output of this code snippet?", code: "console.log(0.1 + 0.2 === 0.3);" },
    { id: 22, section: 3, type: 'image', question: "Identify the following data structure diagram.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Sorted_binary_tree_preorder.svg/1200px-Sorted_binary_tree_preorder.svg.png" } // Placeholder
];

// Helper to fill gaps for 30 questions map
const allQuestions = [];
for (let i = 1; i <= 30; i++) {
    const existing = mockQuestions.find(q => q.id === i);
    if (existing) allQuestions.push(existing);
    else allQuestions.push({
        id: i,
        section: i <= 10 ? 1 : i <= 20 ? 2 : 3,
        type: 'mcq',
        question: `Question ${i} placeholder text.`,
        options: ["Option A", "Option B", "Option C", "Option D"]
    });
}

const Exam = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userName = location.state?.name || 'Candidate';
    const candidateId = userName === 'Bhavishya' ? 'bhavishya' : 'SWE2026001';

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [questionStatus, setQuestionStatus] = useState({}); // { id: 'visited' | 'marked' | 'answered' }
    const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes in seconds
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const currentQuestion = allQuestions[currentQuestionIndex];

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleAnswerChange = (value) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
        setQuestionStatus(prev => ({ ...prev, [currentQuestion.id]: 'answered' }));
    };

    const handleMarkForReview = () => {
        setQuestionStatus(prev => ({ ...prev, [currentQuestion.id]: 'marked' }));
        handleNext();
    };

    const handleNext = () => {
        if (currentQuestionIndex < allQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        alert("Exam Submitted Successfully!");
        navigate('/');
    };

    const getStatusColor = (id) => {
        const status = questionStatus[id];
        if (id === currentQuestion.id) return 'ring-2 ring-blue-600 bg-blue-50 text-blue-700 border-blue-600';
        if (status === 'marked') return 'bg-orange-50 text-orange-600 border-orange-300';
        if (status === 'answered') return 'bg-emerald-50 text-emerald-600 border-emerald-300';
        return 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-slate-300';
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50 text-slate-800 overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Top Bar */}
            <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 z-30 shadow-sm relative">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-md">F</div>
                        <div>
                            <h1 className="text-lg font-bold text-slate-900 tracking-tight">Fair<span className="text-blue-600">Exam</span></h1>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Proctoring Active</div>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-slate-200 mx-2"></div>
                    <div>
                        <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider block mb-0.5">Current Section</span>
                        <span className="text-sm font-medium text-slate-700">Section {currentQuestion.section}: {currentQuestion.section === 1 ? 'MCQ' : currentQuestion.section === 2 ? 'Descriptive' : 'Mixed'}</span>
                    </div>
                </div>

                <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 px-6 py-2 rounded-full border shadow-sm transition-all duration-500 ${timeLeft < 300 ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' : 'bg-slate-100 border-slate-200 text-slate-700'}`}>
                    <Clock className="w-5 h-5" />
                    <span className="font-mono text-xl font-bold tracking-widest">{formatTime(timeLeft)}</span>
                </div>

                <div className="flex items-center gap-5">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-bold text-slate-900">{userName}</div>
                        <div className="text-xs text-slate-500 font-mono">ID: {candidateId}</div>
                    </div>
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200 shadow-md relative bg-white">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="User" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className={`p-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors lg:hidden ${isSidebarOpen ? 'bg-blue-50 text-blue-600' : 'text-slate-400'}`}
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Main Content - Question Area */}
                <main className={`flex-1 flex flex-col h-full relative transition-all duration-300 ${isSidebarOpen ? 'mr-0 lg:mr-80' : 'mr-0'}`}>

                    {/* Progress Bar */}
                    <div className="h-1 w-full bg-slate-200">
                        <div
                            className="h-full bg-blue-600 transition-all duration-500"
                            style={{ width: `${(Object.keys(answers).length / allQuestions.length) * 100}%` }}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                        <div className="max-w-5xl mx-auto w-full">
                            {/* Question Card */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-lg relative">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider">
                                                Question {currentQuestion.id} of {allQuestions.length}
                                            </span>
                                            {questionStatus[currentQuestion.id] === 'marked' && (
                                                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider">
                                                    <Flag className="w-3 h-3" /> Marked for Review
                                                </span>
                                            )}
                                        </div>
                                        <h2 className="text-xl md:text-2xl text-slate-800 font-medium leading-relaxed">{currentQuestion.question}</h2>
                                    </div>
                                    <button className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-red-500 transition-all border border-transparent hover:border-slate-200" title="Report Issue">
                                        <AlertTriangle className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {currentQuestion.type === 'mcq' && (
                                        <div className="grid grid-cols-1 gap-3">
                                            {currentQuestion.options.map((option, idx) => (
                                                <label key={idx}
                                                    className={`group relative flex items-center p-5 rounded-xl border cursor-pointer transition-all duration-200 
                                                    ${answers[currentQuestion.id] === option
                                                            ? 'bg-blue-50 border-blue-300 shadow-md ring-1 ring-blue-100'
                                                            : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50'}`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`q-${currentQuestion.id}`}
                                                        className="sr-only"
                                                        checked={answers[currentQuestion.id] === option}
                                                        onChange={() => handleAnswerChange(option)}
                                                    />
                                                    <div className={`w-6 h-6 rounded-full border-2 mr-5 flex items-center justify-center transition-all duration-300
                                                        ${answers[currentQuestion.id] === option
                                                            ? 'border-blue-600 scale-110'
                                                            : 'border-slate-400 group-hover:border-blue-400'}`}>
                                                        {answers[currentQuestion.id] === option && <div className="w-3 h-3 rounded-full bg-blue-600 shadow-sm" />}
                                                    </div>
                                                    <span className={`text-base font-medium ${answers[currentQuestion.id] === option ? 'text-slate-900' : 'text-slate-600'}`}>{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}

                                    {currentQuestion.type === 'descriptive' && (
                                        <div className="relative group">
                                            <textarea
                                                className="w-full h-80 bg-slate-50 border border-slate-200 rounded-xl p-6 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 resize-none font-mono text-sm leading-relaxed transition-all"
                                                placeholder="Type your detailed answer here..."
                                                value={answers[currentQuestion.id] || ''}
                                                onChange={(e) => handleAnswerChange(e.target.value)}
                                            />
                                            <div className="absolute bottom-4 right-4 text-xs font-mono text-slate-500 bg-white/50 px-2 py-1 rounded-md border border-slate-200">
                                                {(answers[currentQuestion.id] || '').split(/\s+/).filter(w => w.length > 0).length} words
                                            </div>
                                        </div>
                                    )}

                                    {currentQuestion.type === 'code' && (
                                        <div className="space-y-6">
                                            <div className="bg-[#1e293b] rounded-xl border border-slate-200 p-5 font-mono text-sm text-slate-200 overflow-x-auto custom-scrollbar shadow-inner relative group">
                                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <div className="px-2 py-1 bg-white/10 rounded text-[10px] text-slate-300">JAVASCRIPT</div>
                                                </div>
                                                <pre><code>{currentQuestion.code}</code></pre>
                                            </div>
                                            <textarea
                                                className="w-full h-48 bg-slate-50 border border-slate-200 rounded-xl p-5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none font-mono text-sm shadow-inner transition-all"
                                                placeholder="Explain the output logic here..."
                                                value={answers[currentQuestion.id] || ''}
                                                onChange={(e) => handleAnswerChange(e.target.value)}
                                            />
                                        </div>
                                    )}

                                    {currentQuestion.type === 'image' && (
                                        <div className="space-y-6">
                                            <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-8 flex justify-center items-center h-64 relative group">
                                                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                                                {/* Placeholder for actual image */}
                                                <div className="text-center text-slate-400 z-10 flex flex-col items-center gap-3">
                                                    <div className="p-4 rounded-full bg-white border border-slate-200 shadow-sm">
                                                        <ImageIcon className="w-10 h-10 opacity-50 text-slate-400" />
                                                    </div>
                                                    <p className="text-sm font-medium">Image Reference: Diagram A</p>
                                                </div>
                                            </div>
                                            <textarea
                                                className="w-full h-40 bg-slate-50 border border-slate-200 rounded-xl p-5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none font-mono text-sm transition-all"
                                                placeholder="Analyze this image..."
                                                value={answers[currentQuestion.id] || ''}
                                                onChange={(e) => handleAnswerChange(e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="bg-white border-t border-slate-200 p-4 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 z-20 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
                        <div className="flex gap-3 w-full sm:w-auto">
                            <button
                                onClick={handlePrev}
                                disabled={currentQuestionIndex === 0}
                                className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all font-medium text-slate-600 hover:text-slate-900"
                            >
                                <ChevronLeft className="w-4 h-4" /> <span className="hidden sm:inline">Previous</span>
                            </button>
                            <button
                                onClick={handleMarkForReview}
                                className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-orange-200 text-orange-600 hover:bg-orange-50 flex items-center justify-center gap-2 transition-all font-medium hover:border-orange-300"
                            >
                                <Flag className="w-4 h-4" /> <span className="hidden sm:inline">Review</span>
                            </button>
                        </div>

                        <div className="w-full sm:w-auto">
                            {currentQuestionIndex === allQuestions.length - 1 ? (
                                <button
                                    onClick={() => setIsSubmitModalOpen(true)}
                                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:scale-[1.02] shadow-md text-white font-bold transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
                                >
                                    <CheckCircle className="w-4 h-4" /> Submit Exam
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] shadow-md text-white font-bold transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
                                >
                                    Next Question <ChevronRight className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </main>

                {/* Right Sidebar - Question Map Overlay on Mobile, Fixed on Desktop */}
                <aside className={`
                    fixed inset-y-0 right-0 w-80 bg-white border-l border-slate-200 flex flex-col z-40 transform transition-transform duration-300 shadow-2xl lg:shadow-none
                    ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
                    lg:absolute lg:h-full
                `}>
                    <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            Question Palette
                        </h3>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-6 bg-slate-50 border-b border-slate-200">
                        <div className="grid grid-cols-2 gap-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm"></div> Answered</div>
                            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm"></div> Reviewed</div>
                            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-white border border-slate-300"></div> Unvisited</div>
                            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-sm"></div> Current</div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-white">
                        <div className="space-y-8">
                            {[1, 2, 3].map(section => (
                                <div key={section}>
                                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <div className="h-px bg-slate-200 flex-1"></div>
                                        Section {section}: {section === 1 ? 'MCQ' : section === 2 ? 'Desc' : 'Mixed'}
                                        <div className="h-px bg-slate-200 flex-1"></div>
                                    </h4>
                                    <div className="grid grid-cols-5 gap-2.5">
                                        {allQuestions.filter(q => q.section === section).map(q => (
                                            <button
                                                key={q.id}
                                                onClick={() => {
                                                    setCurrentQuestionIndex(allQuestions.indexOf(q));
                                                }}
                                                className={`
                                                    h-10 rounded-lg flex items-center justify-center font-bold text-xs transition-all duration-200 border
                                                    ${getStatusColor(q.id)}
                                                `}
                                            >
                                                {q.id}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>

            {/* Submit Confirmation Modal */}
            {isSubmitModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-100 shadow-sm">
                                <AlertTriangle className="w-10 h-10 text-yellow-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Finish Examination?</h3>
                            <p className="text-slate-500 text-sm">You are about to submit your exam. Please confirm your action as this cannot be undone.</p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-100 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Total Questions</span>
                                <span className="text-slate-900 font-bold">{allQuestions.length}</span>
                            </div>
                            <div className="h-px bg-slate-200"></div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Answered</span>
                                <span className="text-emerald-600 font-bold">{Object.keys(answers).length}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Unanswered</span>
                                <span className="text-red-600 font-bold">{allQuestions.length - Object.keys(answers).length}</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsSubmitModalOpen(false)}
                                className="flex-1 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold transition-colors text-sm"
                            >
                                Return to Exam
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-lg hover:shadow-blue-500/20 text-white font-bold transition-all text-sm uppercase tracking-wide"
                            >
                                Confirm Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Exam;
