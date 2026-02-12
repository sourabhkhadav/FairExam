import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Clock, BookOpen, CheckSquare, ArrowRight, FileText, CheckCircle, Zap } from 'lucide-react';

const Instructions = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userName = location.state?.name || 'Candidate';
    const [agreed, setAgreed] = useState(false);

    const handleStart = () => {
        if (agreed) {
            navigate('/exam', { state: { name: userName } });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 relative font-sans selection:bg-blue-100 selection:text-blue-900 overflow-hidden flex flex-col items-center justify-center p-6">

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-100/60 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '15s' }} />
                <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-100/60 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '12s' }} />
            </div>

            <div className="relative z-10 max-w-6xl w-full bg-white/90 backdrop-blur-3xl border border-white/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto min-h-[80vh]">

                {/* Left Panel: Exam Details */}
                <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col border-b md:border-b-0 md:border-r border-slate-200">
                    <header className="mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4 uppercase tracking-wider">
                            <Zap className="w-3 h-3" /> Examination Portal
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 leading-tight">
                            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">{userName}</span>
                        </h1>
                        <p className="text-slate-600 text-lg max-w-xl leading-relaxed">Please review the examination structure and guidelines below carefully before proceeding.</p>
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="group bg-slate-50 hover:bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <h3 className="text-slate-900 font-semibold text-lg">Section 1: MCQ</h3>
                            <p className="text-slate-500 text-xs mt-1">10 Questions • 1 Mark Each</p>
                        </div>
                        <div className="group bg-slate-50 hover:bg-white p-5 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all duration-300">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mb-3 group-hover:scale-110 transition-transform">
                                <FileText className="w-5 h-5" />
                            </div>
                            <h3 className="text-slate-900 font-semibold text-lg">Section 2: Written</h3>
                            <p className="text-slate-500 text-xs mt-1">10 Questions • 2 Marks Each</p>
                        </div>
                        <div className="group bg-slate-50 hover:bg-white p-5 rounded-2xl border border-slate-200 hover:border-pink-300 hover:shadow-md transition-all duration-300">
                            <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600 mb-3 group-hover:scale-110 transition-transform">
                                <div className="font-mono font-bold text-sm">&lt;/&gt;</div>
                            </div>
                            <h3 className="text-slate-900 font-semibold text-lg">Section 3: Code</h3>
                            <p className="text-slate-500 text-xs mt-1">10 Questions • 3 Marks Each</p>
                        </div>
                    </div>

                    <div className="mt-auto bg-slate-50 rounded-2xl p-6 border border-slate-200 flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 animate-pulse">
                            <Clock className="w-7 h-7 text-blue-600" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-slate-900">90 Minutes Duration</h4>
                            <p className="text-sm text-slate-500 max-w-sm">The timer begins automatically once you click 'Start Examination'. There are no pauses allowed.</p>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Code of Conduct */}
                <div className="w-full md:w-1/3 bg-slate-100/80 p-8 md:p-12 flex flex-col border-l border-slate-200">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-amber-100 rounded-lg text-amber-600 border border-amber-200">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wide">Code of Conduct</h2>
                    </div>

                    <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar mb-8">
                        {[
                            "No external tabs or windows allowed.",
                            "Audio/Video recording is strictly prohibited.",
                            "Webcam monitoring is active throughout.",
                            "Independent completion required.",
                            "Unauthorized devices are banned.",
                            "Suspicious activity = Disqualification."
                        ].map((rule, idx) => (
                            <div key={idx} className="flex gap-3 text-sm text-slate-600 p-3 rounded-lg bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                                <span className="leading-snug">{rule}</span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-slate-200 mt-auto">
                        <label className="flex items-start gap-4 cursor-pointer group mb-6 select-none">
                            <div className="relative flex items-center mt-0.5">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                />
                                <div className="w-6 h-6 border-2 border-slate-400 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all group-hover:border-blue-500 bg-white"></div>
                                <CheckSquare className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-xs text-slate-500 group-hover:text-slate-700 transition-colors leading-relaxed">
                                I verify that I have read and understood all instructions and agree to follow the code of conduct during this examination.
                            </span>
                        </label>

                        <button
                            onClick={handleStart}
                            disabled={!agreed}
                            className={`w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 shadow-lg transition-all duration-300
                                ${agreed
                                    ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/25 text-white scale-[1.02]'
                                    : 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-70'}`}
                        >
                            Start Examination
                            <ArrowRight className={`w-5 h-5 ${agreed ? 'animate-pulse' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instructions;
