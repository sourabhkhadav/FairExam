import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Wifi, Globe, Lock, User, AlertCircle, CheckCircle, ShieldCheck, Zap } from 'lucide-react';

const SystemCheckItem = ({ icon: Icon, label, status }) => {
    const statusIcons = {
        pending: <div className="w-5 h-5 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />,
        success: <CheckCircle className="w-5 h-5 text-emerald-600 drop-shadow-sm" />,
        error: <AlertCircle className="w-5 h-5 text-red-600" />
    };

    return (
        <div className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${status === 'success'
            ? 'bg-emerald-50 border-emerald-200 shadow-sm'
            : 'bg-slate-50 border-slate-200'
            }`}>
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${status === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <span className={`text-sm font-medium ${status === 'success' ? 'text-slate-700' : 'text-slate-500'}`}>{label}</span>
            </div>
            {statusIcons[status]}
        </div>
    );
};

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        candidateId: '',
        password: ''
    });
    const [systemStatus, setSystemStatus] = useState({
        webcam: 'pending',
        internet: 'pending',
        browser: 'pending'
    });
    const [error, setError] = useState('');
    const [activeField, setActiveField] = useState(null);

    useEffect(() => {
        // Simulate system checks with realistic delays
        const performChecks = async () => {
            // Internet Check
            setTimeout(() => {
                setSystemStatus(prev => ({ ...prev, internet: navigator.onLine ? 'success' : 'error' }));
            }, 800);

            // Browser Check
            setTimeout(() => {
                const isCompatible = /chrome|firefox|safari/i.test(navigator.userAgent);
                setSystemStatus(prev => ({ ...prev, browser: isCompatible ? 'success' : 'error' }));
            }, 1500);

            // Webcam Check
            setTimeout(async () => {
                try {
                    await navigator.mediaDevices.getUserMedia({ video: true });
                    setSystemStatus(prev => ({ ...prev, webcam: 'success' }));
                } catch {
                    setSystemStatus(prev => ({ ...prev, webcam: 'error' }));
                }
            }, 2500);
        };

        performChecks();
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        // Validation logic
        if ((formData.candidateId === 'SWE2026001' && formData.password === 'exam@123') ||
            (formData.candidateId === 'bhavishya' && formData.password === 'bhavishya123')) {
            const name = formData.candidateId === 'bhavishya' ? 'Bhavishya' : 'Alex Kumar';
            navigate('/instructions', { state: { name } });
        } else {
            setError('Invalid credentials. Please verify your ID and password.');
        }
    };

    const allChecksPassed = Object.values(systemStatus).every(s => s === 'success');

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Dynamic Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-100/50 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
                <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] bg-sky-100/50 rounded-full blur-[80px]" />
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 items-center">

                {/* Left Side: Brand & Info */}
                <div className="hidden lg:flex flex-col space-y-8 pr-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6">
                            <Zap className="w-3 h-3" />
                            SECURE EXAMINATION ENVIRONMENT
                        </div>
                        <h1 className="text-6xl font-bold text-slate-900 leading-tight mb-4">
                            Fair<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Exam</span>
                        </h1>
                        <p className="text-slate-600 text-lg leading-relaxed max-w-md">
                            Advanced proctoring solution ensuring integrity and fairness in every assessment. System-locked environment with real-time monitoring.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-white/60 border border-slate-200 backdrop-blur-sm shadow-sm">
                            <ShieldCheck className="w-8 h-8 text-indigo-600 mb-3" />
                            <div className="font-semibold text-slate-900 mb-1">Anti-Cheat AI</div>
                            <div className="text-xs text-slate-500">Real-time eye tracking and motion detection algorithms.</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/60 border border-slate-200 backdrop-blur-sm shadow-sm">
                            <Globe className="w-8 h-8 text-blue-600 mb-3" />
                            <div className="font-semibold text-slate-900 mb-1">Browser Lock</div>
                            <div className="text-xs text-slate-500">Prevents tab switching and unauthorized applications.</div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Card */}
                <div className="bg-white/80 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl relative">
                    {/* Glow Effect behind card */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur opacity-50 -z-10" />

                    <div className="mb-8 text-center lg:text-left">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Candidate Login</h2>
                        <p className="text-slate-500 text-sm">Please authenticate to begin your scheduled assessment.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-5">
                            <div className="group">
                                <label className={`block text-xs font-medium mb-2 transition-colors ${activeField === 'id' ? 'text-blue-600' : 'text-slate-500'}`}>
                                    CANDIDATE ID
                                </label>
                                <div className={`relative flex items-center transition-all duration-300 rounded-xl bg-slate-50 border ${activeField === 'id' ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-slate-200 group-hover:border-slate-300'}`}>
                                    <User className={`w-5 h-5 ml-4 transition-colors ${activeField === 'id' ? 'text-blue-600' : 'text-slate-400'}`} />
                                    <input
                                        type="text"
                                        value={formData.candidateId}
                                        onChange={(e) => setFormData({ ...formData, candidateId: e.target.value })}
                                        onFocus={() => setActiveField('id')}
                                        onBlur={() => setActiveField(null)}
                                        className="w-full bg-transparent py-4 pl-3 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none text-sm font-medium tracking-wide"
                                        placeholder="Enter your ID"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className={`block text-xs font-medium mb-2 transition-colors ${activeField === 'pass' ? 'text-indigo-600' : 'text-slate-500'}`}>
                                    ACCESS PASSWORD
                                </label>
                                <div className={`relative flex items-center transition-all duration-300 rounded-xl bg-slate-50 border ${activeField === 'pass' ? 'border-indigo-500 ring-2 ring-indigo-500/10' : 'border-slate-200 group-hover:border-slate-300'}`}>
                                    <Lock className={`w-5 h-5 ml-4 transition-colors ${activeField === 'pass' ? 'text-indigo-600' : 'text-slate-400'}`} />
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        onFocus={() => setActiveField('pass')}
                                        onBlur={() => setActiveField(null)}
                                        className="w-full bg-transparent py-4 pl-3 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none text-sm font-medium tracking-wide"
                                        placeholder="Enter access password"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* System Checks Section */}
                        <div className="space-y-3 pt-4 border-t border-slate-100">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">System Compatibility</h3>
                                {!allChecksPassed && <span className="text-[10px] text-orange-600 bg-orange-100 px-2 py-0.5 rounded animate-pulse">Checking Requirements...</span>}
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <SystemCheckItem icon={Camera} label="Webcam Access" status={systemStatus.webcam} />
                                <SystemCheckItem icon={Wifi} label="Internet Connection" status={systemStatus.internet} />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-3 text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-200 animate-in fade-in slide-in-from-bottom-2">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={!allChecksPassed}
                            className={`w-full py-4 rounded-xl font-bold text-white text-sm tracking-wide uppercase shadow-lg transition-all duration-300 transform
                            ${allChecksPassed
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] hover:shadow-blue-500/25 ring-1 ring-white/20'
                                    : 'bg-slate-400 cursor-not-allowed opacity-70'}`}
                        >
                            {allChecksPassed ? 'Enter Examination Portal' : 'Verifying System...'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
