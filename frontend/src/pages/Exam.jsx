
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, Menu, X, ChevronLeft, ChevronRight, Flag, AlertTriangle, CheckCircle, ImageIcon, Save, Maximize } from 'lucide-react';
import LiveCameraMonitor from '../components/LiveCameraMonitor';
import { Toaster, toast } from 'react-hot-toast';
import Meyda from 'meyda';

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
    const [violations, setViolations] = useState(0);
    const [soundViolations, setSoundViolations] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const micStreamRef = useRef(null);
    const [showFullscreenWarning, setShowFullscreenWarning] = useState(false);
    const warningAudioRef = useRef(null);
    const violationLockRef = useRef(false);
    const [forceFullscreenModal, setForceFullscreenModal] = useState(false);
    const soundLockRef = useRef(false);
    const baselineRef = useRef(0);
    const calibrationDoneRef = useRef(false);

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

    // Voice Detection with Meyda - Works on ALL Laptops
    useEffect(() => {
        let meydaAnalyzer = null;
        
        const startAudioDetection = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    audio: true
                });
                micStreamRef.current = stream;
                
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
                const microphone = audioContextRef.current.createMediaStreamSource(stream);
                
                let calibrationSamples = [];
                let baselineRMS = 0;
                
                meydaAnalyzer = Meyda.createMeydaAnalyzer({
                    audioContext: audioContextRef.current,
                    source: microphone,
                    bufferSize: 512,
                    featureExtractors: ['rms', 'energy'],
                    callback: (features) => {
                        if (!features || !features.rms) return;
                        
                        const { rms, energy } = features;
                        
                        // Calibration - 40 samples
                        if (calibrationSamples.length < 40) {
                            calibrationSamples.push(rms);
                            if (calibrationSamples.length === 40) {
                                const sorted = [...calibrationSamples].sort((a, b) => a - b);
                                baselineRMS = sorted[Math.floor(sorted.length * 0.6)];
                                calibrationDoneRef.current = true;
                                console.log('Calibrated - Baseline RMS:', baselineRMS.toFixed(4));
                            }
                            return;
                        }
                        
                        // Dynamic threshold based on baseline
                        let threshold;
                        if (baselineRMS < 0.01) {
                            threshold = baselineRMS + 0.008;
                        } else if (baselineRMS < 0.03) {
                            threshold = baselineRMS + 0.015;
                        } else if (baselineRMS < 0.05) {
                            threshold = baselineRMS + 0.025;
                        } else {
                            threshold = baselineRMS * 1.5;
                        }
                        
                        // Detect voice
                        if (rms > threshold && energy > 0.0001 && !soundLockRef.current) {
                            soundLockRef.current = true;
                            
                            setSoundViolations(prev => {
                                const newCount = prev + 1;
                                
                                toast.error(`🔊 Sound detected! Violation #${newCount}`, { 
                                    id: 'sound-warning',
                                    duration: 500,
                                });
                                
                                console.log('VOICE! RMS:', rms.toFixed(4), 'Threshold:', threshold.toFixed(4), 'Energy:', energy.toFixed(6));
                                return newCount;
                            });
                            
                            setTimeout(() => {
                                soundLockRef.current = false;
                            }, 2000);
                        }
                    }
                });
                
                meydaAnalyzer.start();
                
            } catch (err) {
                console.error('Microphone error:', err);
                toast.error('Microphone access required!');
            }
        };
        
        startAudioDetection();
        
        return () => {
            if (meydaAnalyzer) {
                meydaAnalyzer.stop();
            }
            if (micStreamRef.current) {
                micStreamRef.current.getTracks().forEach(track => track.stop());
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    // Fullscreen & Tab Switch Prevention
    useEffect(() => {
        let violationTimeout = null;
        
        const playWarningSound = () => {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                oscillator.frequency.value = 800;
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.3);
            } catch (err) {
                console.error('Audio error:', err);
            }
        };
        
        const addViolation = (message) => {
            if (violationTimeout) return;
            
            setViolations(prev => {
                const newCount = prev + 1;
                playWarningSound();
                toast.error(`⚠️ ${message} Violation #${newCount}`, { 
                    id: 'violation',
                    duration: 500,
                });
                return newCount;
            });
            
            violationTimeout = setTimeout(() => {
                violationTimeout = null;
            }, 2000);
        };
        
        const enterFullscreen = async () => {
            try {
                await document.documentElement.requestFullscreen();
                setIsFullscreen(true);
                setForceFullscreenModal(false);
            } catch (err) {
                console.error('Fullscreen error:', err);
            }
        };
        
        // Auto enter fullscreen on mount
        setTimeout(enterFullscreen, 500);

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                addViolation('Fullscreen Exit!');
                setForceFullscreenModal(true);
            }
        };

        const preventEscape = (e) => {
            if (e.key === 'Escape' && document.fullscreenElement) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('keydown', preventEscape, true);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('keydown', preventEscape, true);
            if (violationTimeout) clearTimeout(violationTimeout);
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => {});
            }
        };
    }, []);

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
            
            <Toaster 
                position="top-center" 
                toastOptions={{ 
                    duration: 500,
                    style: {
                        background: '#fee2e2',
                        color: '#991b1b',
                        padding: '16px 20px',
                        borderRadius: '12px',
                        border: '2px solid #ef4444',
                        boxShadow: '0 10px 40px rgba(239, 68, 68, 0.3)',
                        fontWeight: '600',
                        fontSize: '15px',
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }} 
                containerStyle={{ top: 80 }} 
            />
            
            {/* Live Camera Monitor - Always Visible */}
            <LiveCameraMonitor />

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
                    {violations > 0 && (
                        <div className="px-3 py-1 rounded bg-red-100 border border-red-300">
                            <span className="text-xs font-bold text-red-700">Fullscreen: {violations}</span>
                        </div>
                    )}
                    {soundViolations > 0 && (
                        <div className="px-3 py-1 rounded bg-orange-100 border border-orange-300">
                            <span className="text-xs font-bold text-orange-700">Sound: {soundViolations}</span>
                        </div>
                    )}
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
                <main className={`flex-1 flex flex-col h-full transition-all duration-300 ml-52 ${isSidebarOpen ? 'mr-0 lg:mr-80' : 'mr-0'}`}>

                    {/* Progress Strip */}
                    <div className="h-1 w-full bg-slate-200">
                        <div
                            className="h-full bg-blue-600 transition-all duration-300"
                            style={{ width: `${(Object.keys(answers).length / allQuestions.length) * 100}%` }}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-50/50 scroll-smooth custom-scrollbar">
                        <div className="max-w-3xl mx-auto w-full space-y-6">

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

            {/* Force Fullscreen Modal - Blocks Everything */}
            {forceFullscreenModal && (
                <div className="fixed inset-0 bg-red-900/95 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="bg-red-600 p-4 text-center">
                            <AlertTriangle className="h-12 w-12 text-white mx-auto mb-2 animate-pulse" />
                            <h3 className="text-2xl font-bold text-white">EXAM PAUSED</h3>
                        </div>
                        <div className="p-6 text-center">
                            <p className="text-lg font-semibold text-slate-900 mb-2">
                                Fullscreen Mode Required
                            </p>
                            <p className="text-sm text-slate-600 mb-4">
                                You must return to fullscreen to continue the exam.
                            </p>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                                <p className="text-xs text-red-700 font-medium">
                                    Violation #{violations} recorded
                                </p>
                            </div>
                            <button
                                onClick={async () => {
                                    try {
                                        await document.documentElement.requestFullscreen();
                                        setForceFullscreenModal(false);
                                    } catch (err) {
                                        console.error('Fullscreen error:', err);
                                    }
                                }}
                                className="w-full px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg text-lg"
                            >
                                Return to Fullscreen
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Fullscreen Warning Modal */}
            {showFullscreenWarning && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top duration-300">
                    <div className={`rounded-lg shadow-2xl px-6 py-4 border-2 ${
                        violations >= 3 
                            ? 'bg-red-600 border-red-800 text-white' 
                            : 'bg-amber-500 border-amber-700 text-white'
                    }`}>
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="h-6 w-6 animate-pulse" />
                            <div>
                                <p className="font-bold text-lg">
                                    {violations >= 3 ? 'SERIOUS WARNING!' : 'WARNING!'}
                                </p>
                                <p className="text-sm">
                                    Fullscreen Exit - Violation {violations}
                                </p>
                                <p className="text-xs mt-1">
                                    Returning to fullscreen...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
