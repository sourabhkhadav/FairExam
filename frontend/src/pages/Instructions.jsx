import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Clock, FileText, CheckSquare, ArrowRight, AlertTriangle, Monitor, MousePointer } from 'lucide-react';

const InstructionCard = ({ icon: Icon, title, desc, delay }) => (
    <div className={`flex gap-4 p-4 rounded-lg border border-slate-100 bg-slate-50/50`}>
        <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-md bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm">
                <Icon className="w-5 h-5" />
            </div>
        </div>
        <div>
            <h4 className="font-semibold text-slate-800 text-sm mb-1">{title}</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
        </div>
    </div>
);

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
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8 mb-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100 mb-4">
                                Assessment ID: #SWE-2026-X1
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Examination Guidelines</h1>
                            <p className="mt-2 text-slate-500">
                                Welcome, <span className="font-semibold text-slate-700">{userName}</span>. Please review the following protocols before commencing.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <Clock className="w-8 h-8 text-blue-600" />
                            <div>
                                <div className="text-sm font-semibold text-slate-900">Duration: 90 Minutes</div>
                                <div className="text-xs text-slate-500">Total Questions: 10</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Monitor className="w-5 h-5 text-slate-500" />
                                Section Breakdown
                            </h3>
                            <InstructionCard
                                icon={MousePointer}
                                title="Multiple Choice Questions"
                                desc="10 Questions. Single correct option. Analytical & Logical reasoning."
                            />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-slate-500" />
                                Code of Conduct
                            </h3>
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                                <ul className="space-y-3">
                                    {[
                                        "Strict Prohibition: No generic materials, external sites, or communication tools.",
                                        "Monitoring: Your webcam, microphone, and screen activity are recorded.",
                                        "Fullscreen Mode: Exiting fullscreen will trigger a warning log.",
                                        "Identity Verification: Ensure your face is clearly visible at all times."
                                    ].map((rule, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-slate-700">
                                            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                                            <span>{rule}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                            />
                            <div className={`w-5 h-5 border-2 rounded transition-colors ${agreed ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300'}`}>
                                {agreed && <CheckSquare className="w-4 h-4 text-white absolute top-0 left-0" />}
                            </div>
                        </div>
                        <span className="text-sm text-slate-600 font-medium">I have read and agree to follow the examination protocols.</span>
                    </label>

                    <button
                        onClick={handleStart}
                        disabled={!agreed}
                        className={`px-8 py-3 rounded-md font-semibold text-sm transition-all flex items-center gap-2
                            ${agreed
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                    >
                        Start Assessment
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="text-center text-xs text-slate-400">
                    Session ID: {Math.random().toString(36).substr(2, 9).toUpperCase()} • Server Time: {new Date().toUTCString()}
                </div>
            </div>
        </div>
    );
};

export default Instructions;
