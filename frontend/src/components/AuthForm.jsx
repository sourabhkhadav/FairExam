import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';

const AuthForm = ({ initialMode = 'login' }) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(initialMode === 'login');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setShowPassword(false);
        setShowConfirmPassword(false);
    };

    return (
        <div className="min-h-screen bg-white text-charcoal flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="fixed top-8 left-8 p-4 rounded-2xl bg-white border border-black/5 shadow-xl shadow-indigo-100/50 flex items-center justify-center group cursor-pointer z-50 transition-all hover:bg-slate-50 active:scale-95"
            >
                <ArrowLeft className="w-6 h-6 text-slate-400 group-hover:text-brand-purple transition-colors" />
            </button>

            {/* Cinematic Background (Consistent with Landing Page) */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[800px] h-[400px] bg-radial from-indigo-50/60 via-transparent to-transparent blur-[100px] opacity-80" />
                <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-[800px] h-[400px] bg-radial from-blue-50/40 via-transparent to-transparent blur-[100px] opacity-60" />
            </div>

            <div className="w-full max-w-[480px] z-10">
                {/* Logo & Header */}
                <div className="flex flex-col items-center mb-10 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-black/5 shadow-xl shadow-indigo-100/50 flex items-center justify-center">
                        <Shield className="w-8 h-8 text-brand-purple" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-charcoal">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-slate-500 font-bold mt-2">
                            {isLogin
                                ? 'Secure access to your examination portal'
                                : 'Join 2,000+ institutions worldwide'}
                        </p>
                    </div>
                </div>

                {/* Auth Card */}
                <div className="rounded-[40px] p-10 bg-white border border-black/5 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Full Name</label>
                                <div className="relative group overflow-hidden">
                                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-purple transition-colors duration-300">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-transparent hover:bg-slate-100 focus:bg-white focus:border-brand-purple/20 transition-all duration-300 outline-none font-bold text-charcoal placeholder:text-slate-400"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Work Email</label>
                            <div className="relative group overflow-hidden">
                                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-purple transition-colors duration-300">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="name@institution.edu"
                                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-transparent hover:bg-slate-100 focus:bg-white focus:border-brand-purple/20 transition-all duration-300 outline-none font-bold text-charcoal placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Password</label>
                                {isLogin && <button className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-purple">Forgot?</button>}
                            </div>
                            <div className="relative group overflow-hidden">
                                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-purple transition-colors duration-300">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full pl-14 pr-14 py-4 rounded-2xl bg-slate-50 border border-transparent hover:bg-slate-100 focus:bg-white focus:border-brand-purple/20 transition-all duration-300 outline-none font-bold text-charcoal placeholder:text-slate-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-5 flex items-center text-slate-300 hover:text-brand-purple transition-colors duration-300"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Confirm Password</label>
                                <div className="relative group overflow-hidden">
                                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-purple transition-colors duration-300">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full pl-14 pr-14 py-4 rounded-2xl bg-slate-50 border border-transparent hover:bg-slate-100 focus:bg-white focus:border-brand-purple/20 transition-all duration-300 outline-none font-bold text-charcoal placeholder:text-slate-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-5 flex items-center text-slate-300 hover:text-brand-purple transition-colors duration-300"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        )}

                        <button className="w-full py-4 rounded-2xl bg-charcoal text-white font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-indigo-100 cursor-pointer">
                            {isLogin ? 'Sign In' : 'Create Account'}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>

                {/* Footer Link */}
                <p className="text-center mt-10 font-bold text-slate-500">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button
                        onClick={toggleMode}
                        className="text-brand-purple uppercase tracking-wider text-sm font-bold ml-2"
                    >
                        {isLogin ? 'Get Started' : 'Sign In'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
