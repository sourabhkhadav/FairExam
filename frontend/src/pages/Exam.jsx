
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, Menu, X, ChevronLeft, ChevronRight, Flag, AlertTriangle, CheckCircle, ImageIcon, Save } from 'lucide-react';

const Exam = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userName = location.state?.name || 'Candidate';
    const candidateId = 'SWE2026001';

    // State Management
    const [timeLeft, setTimeLeft] = useState(5400); // 90 minutes
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [questionStatus, setQuestionStatus] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

    // Mock Data
    const allQuestions = [
        { id: 1, section: 1, type: 'mcq', question: "Which data structure is primarily used to implement a LIFO (Last In First Out) system?", options: ["Queue", "Stack", "Linked List", "Binary Tree"] },
        { id: 2, section: 1, type: 'mcq', question: "What is the time complexity of a binary search algorithm in the worst case?", options: ["O(n)", "O(n^2)", "O(log n)", "O(1)"] },
        { id: 3, section: 1, type: 'mcq', question: "Which of the following is NOT a JavaScript primitive data type?", options: ["String", "Number", "Boolean", "Object"] },
        { id: 4, section: 1, type: 'mcq', question: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"] },
        { id: 5, section: 1, type: 'mcq', question: "Which HTML tag is used to define an internal style sheet?", options: ["<script>", "<style>", "<css>", "<link>"] },
        { id: 6, section: 1, type: 'mcq', question: "Which method is used to remove the last element from an array in JavaScript?", options: ["shift()", "pop()", "push()", "unshift()"] },
        { id: 7, section: 1, type: 'mcq', question: "What is the purpose of the 'useEffect' hook in React?", options: ["To manage state", "To perform side effects", "To create context", "To memorize values"] },
        { id: 8, section: 1, type: 'mcq', question: "Which SQL statement is used to extract data from a database?", options: ["GET", "OPEN", "SELECT", "EXTRACT"] },
        { id: 9, section: 1, type: 'mcq', question: "What is the default port number for HTTP?", options: ["80", "443", "21", "22"] },
        { id: 10, section: 1, type: 'mcq', question: "Which of the following is a version control system?", options: ["Node.js", "Git", "NPM", "React"] },
    ];

    // Timer Logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
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
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const currentQuestion = allQuestions[currentQuestionIndex];

    // Navigation & Interaction Handlers
    const handleAnswerChange = (value) => {
        setAnswers({ ...answers, [currentQuestion.id]: value });
        if (questionStatus[currentQuestion.id] !== 'marked') {
            setQuestionStatus({ ...questionStatus, [currentQuestion.id]: 'answered' });
        }
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

    const handleMarkForReview = () => {
        const newStatus = questionStatus[currentQuestion.id] === 'marked' ? (answers[currentQuestion.id] ? 'answered' : 'unvisited') : 'marked';
        setQuestionStatus({ ...questionStatus, [currentQuestion.id]: newStatus });
    };

    const handleJumpToQuestion = (index) => {
        setCurrentQuestionIndex(index);
        setIsSidebarOpen(false);
    };

    const handleSubmit = () => {
        alert("Exam Submitted Successfully!");
        navigate('/');
    };

    const getStatusColor = (id) => {
        const status = questionStatus[id];
        const isCurrent = id === currentQuestion.id;

        if (isCurrent) return 'bg-blue-600 text-white border-blue-600';
        if (status === 'marked') return 'bg-amber-100 text-amber-700 border-amber-300';
        if (status === 'answered') return 'bg-emerald-100 text-emerald-700 border-emerald-300';
        return 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50';
    };

    return (
        <div className="flex flex-col h-screen bg-slate-100 font-sans text-slate-900 overflow-hidden">

            {/* Top Bar - Enterprise Style */}
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-30 shadow-sm flex-shrink-0">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-slate-900 text-white font-bold p-1 px-2 rounded text-lg">FE</div>
                        <h1 className="text-lg font-bold text-slate-800 tracking-tight">FairExam <span className="text-xs font-normal text-slate-500 ml-1">v2.4.0</span></h1>
                    </div>
                    <div className="h-6 w-px bg-slate-200"></div>
                    <div>
                        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Candidate Name</span>
                        <span className="text-sm font-medium text-slate-900">{userName}</span>
                    </div>
                </div>

                <div className={`flex items-center gap-3 px-4 py-1.5 rounded bg-slate-50 border ${timeLeft < 300 ? 'border-red-200 bg-red-50' : 'border-slate-200'}`}>
                    <Clock className={`w-4 h-4 ${timeLeft < 300 ? 'text-red-600 animate-pulse' : 'text-slate-500'}`} />
                    <span className={`font-mono text-xl font-bold ${timeLeft < 300 ? 'text-red-700' : 'text-slate-700'}`}>{formatTime(timeLeft)}</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:block text-right">
                        <div className="text-xs text-slate-500 uppercase">Assessment ID</div>
                        <div className="text-sm font-bold text-slate-900">#SWE-2026-X1</div>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 lg:hidden"
                    >
                        <Menu className="w-5 h-5 text-slate-600" />
                    </button>
                </div>
            </header>

            {/* Main Layout */}
            <div className="flex flex-1 overflow-hidden relative">

                {/* Question Area */}
                <main className={`flex-1 flex flex-col h-full transition-all duration-300 ${isSidebarOpen ? 'mr-0 lg:mr-80' : 'mr-0'}`}>

                    {/* Progress Strip */}
                    <div className="h-1 w-full bg-slate-200">
                        <div
                            className="h-full bg-blue-600 transition-all duration-300"
                            style={{ width: `${(Object.keys(answers).length / allQuestions.length) * 100}%` }}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-50/50 scroll-smooth custom-scrollbar">
                        <div className="max-w-4xl mx-auto w-full space-y-6">

                            {/* Question Header */}
                            <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wide">
                                            Q.{currentQuestion.id}
                                        </span>
                                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                            Multiple Choice
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {questionStatus[currentQuestion.id] === 'marked' && (
                                            <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100">
                                                <Flag className="w-3 h-3" /> REVIEW
                                            </span>
                                        )}
                                        <button className="text-slate-400 hover:text-slate-600 p-1" title="Report Issue">
                                            <AlertTriangle className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <h2 className="text-xl text-slate-900 font-medium leading-relaxed">
                                    {currentQuestion.question}
                                </h2>
                            </div>

                            {/* Answer Area */}
                            <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm">
                                {currentQuestion.type === 'mcq' && (
                                    <div className="space-y-3">
                                        {currentQuestion.options.map((option, idx) => (
                                            <label key={idx}
                                                className={`flex items-center p-4 rounded border cursor-pointer transition-all duration-150 group
                                                ${answers[currentQuestion.id] === option
                                                        ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500 z-10'
                                                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={`q-${currentQuestion.id}`}
                                                    className="sr-only"
                                                    checked={answers[currentQuestion.id] === option}
                                                    onChange={() => handleAnswerChange(option)}
                                                />
                                                <div className={`w-5 h-5 rounded-full border mr-4 flex items-center justify-center flex-shrink-0
                                                    ${answers[currentQuestion.id] === option ? 'border-blue-600' : 'border-slate-300 group-hover:border-slate-400'}`}>
                                                    {answers[currentQuestion.id] === option && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                                                </div>
                                                <span className={`text-base ${answers[currentQuestion.id] === option ? 'text-slate-900 font-medium' : 'text-slate-700'}`}>
                                                    {option}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                )}


                            </div>
                        </div>
                    </div>

                    {/* Bottom Controls */}
                    <div className="bg-white border-t border-slate-200 p-4 px-6 flex justify-between items-center z-20">
                        <div className="flex gap-3">
                            <button
                                onClick={handleMarkForReview}
                                className="px-4 py-2 rounded text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-2"
                            >
                                <Flag className="w-4 h-4" />
                                {questionStatus[currentQuestion.id] === 'marked' ? 'Unmark Review' : 'Mark for Review'}
                            </button>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handlePrev}
                                disabled={currentQuestionIndex === 0}
                                className="px-5 py-2 rounded text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Previous
                            </button>
                            {currentQuestionIndex === allQuestions.length - 1 ? (
                                <button
                                    onClick={() => setIsSubmitModalOpen(true)}
                                    className="px-6 py-2 rounded text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-colors flex items-center gap-2"
                                >
                                    <CheckCircle className="w-4 h-4" /> Submit Assessment
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    className="px-6 py-2 rounded text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-colors flex items-center gap-1"
                                >
                                    Next Question <ChevronRight className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </main>

                {/* Right Sidebar - Palette */}
                <aside className={`
                    absolute lg:static top-0 right-0 h-full w-80 bg-white border-l border-slate-200 z-40 transform transition-transform duration-300 flex flex-col
                    ${isSidebarOpen ? 'translate-x-0 shadow-2xl lg:shadow-none' : 'translate-x-full lg:translate-x-0'}
                `}>
                    <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Question Palette</h3>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-4 bg-white border-b border-slate-100">
                        <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-500">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300"></div> Answered</div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-amber-100 border border-amber-300"></div> For Review</div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-white border border-slate-200"></div> Unvisited</div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-blue-600 border border-blue-600"></div> Current</div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-slate-50/30">
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-200 pb-1">
                                    Questions
                                </h4>
                                <div className="grid grid-cols-5 gap-2">
                                    {allQuestions.map(q => (
                                        <button
                                            key={q.id}
                                            onClick={() => handleJumpToQuestion(allQuestions.indexOf(q))}
                                            className={`
                                                    h-9 w-9 rounded flex items-center justify-center text-sm font-medium border transition-all
                                                    ${getStatusColor(q.id)}
                                                `}
                                        >
                                            {q.id}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </aside>
            </div>

            {/* Submit Modal */}
            {isSubmitModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-sm w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 mb-4">
                                <AlertTriangle className="h-6 w-6 text-amber-600" />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900">End Assessment?</h3>
                            <p className="mt-2 text-sm text-slate-500">
                                You have {allQuestions.length - Object.keys(answers).length} unanswered questions. Once submitted, you cannot return to the exam.
                            </p>
                        </div>
                        <div className="bg-slate-50 px-6 py-4 flex gap-3">
                            <button
                                onClick={() => setIsSubmitModalOpen(false)}
                                className="flex-1 px-4 py-2 bg-white text-slate-700 text-sm font-medium border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex-1 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                            >
                                Submit All
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Exam;
