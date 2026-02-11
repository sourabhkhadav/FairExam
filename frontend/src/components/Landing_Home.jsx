import React from 'react';
import {
    Shield, Layout, Lock, ChevronRight, Star, Camera, Volume2, FileText,
    AlertTriangle, Monitor, Users2, CheckCircle2, Eye, FileCheck,
    CheckCircle, TrendingUp, Database, Key, ShieldCheck, Mail, MapPin, Phone
} from 'lucide-react';

function Landing_Home() {
    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-purple-500/30 relative font-sans overflow-x-hidden">
            {/* Background Glow Effects */}
            <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-radial from-purple-600/15 to-transparent -translate-y-1/2 -z-10 blur-[120px] opacity-50" />
            <div className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-radial from-cyan-500/10 to-transparent -z-10 blur-[120px] opacity-30" />
            <div className="absolute top-[50%] left-0 w-[600px] h-[600px] bg-radial from-indigo-500/10 to-transparent -z-10 blur-[120px] opacity-20" />
            <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-radial from-blue-600/10 to-transparent translate-y-1/4 -z-10 blur-[120px] opacity-40" />

            {/* 1. Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 backdrop-blur-md bg-[#030014]/50 border-b border-white/5">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2.5 group cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">FairExam</span>
                    </div>

                    <div className="hidden lg:flex items-center gap-10">
                        {['Features', 'How It Works', 'Security', 'Pricing'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-[15px] font-medium text-gray-400 hover:text-white transition-all duration-300">
                                {item}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="text-[15px] font-medium text-gray-400 hover:text-white transition-colors cursor-pointer">Sign In</button>
                        <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-[15px] font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-blue-500/25 cursor-pointer">
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* 2. Hero Section */}
            <main className="pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center space-y-10">
                    <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass border-white/10 mb-6 transition-transform hover:scale-105 cursor-default">
                        <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
                            <Star className="w-3 h-3 text-cyan-400 fill-current" />
                        </div>
                        <span className="text-[11px] font-bold text-cyan-400 tracking-[0.1em] uppercase">AI-Powered Exam Monitoring Platform</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-[92px] font-[940] tracking-tight leading-[0.95] text-white">
                        AI-Powered Fair & Secure<br />
                        <span className="text-gradient">Online Examinations</span>
                    </h1>

                    <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto font-medium">
                        Face Detection <span className="text-gray-700 mx-2">•</span> Noise Monitoring <span className="text-gray-700 mx-2">•</span> Real-Time Integrity
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8">
                        <button className="w-full sm:w-auto px-10 py-4.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 font-extrabold text-lg flex items-center justify-center gap-2.5 group hover:scale-[1.03] transition-all shadow-2xl shadow-indigo-600/30 cursor-pointer">
                            Get Started Free
                            <ChevronRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-300" />
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-5 pt-12">
                        <FeatureBadge icon={<Layout className="w-5 h-5" />} text="AI-Monitored" />
                        <FeatureBadge icon={<Shield className="w-5 h-5" />} text="Secure" />
                        <FeatureBadge icon={<Lock className="w-5 h-5" />} text="Tamper-Proof" />
                    </div>
                </div>
            </main>

            {/* 3. AI-Powered Features Section */}
            <section className="max-w-7xl mx-auto px-6 py-40 space-y-20">
                <div className="text-center space-y-6">
                    <h2 className="text-5xl md:text-[80px] font-black tracking-tight leading-tight">
                        <span className="text-gradient">AI-Powered</span> Features
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto">
                        Next-generation exam integrity powered by artificial intelligence
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AIFeatureCard
                        icon={<Eye className="w-6 h-6 text-cyan-400" />}
                        iconBg="bg-cyan-500/20"
                        title="AI Face Detection"
                        desc="Continuous face recognition to prevent proxy test-takers"
                    />
                    <AIFeatureCard
                        icon={<Volume2 className="w-6 h-6 text-purple-400" />}
                        iconBg="bg-purple-500/20"
                        title="Noise Monitoring"
                        desc="Real-time audio analysis to detect suspicious conversations"
                    />
                    <AIFeatureCard
                        icon={<Lock className="w-6 h-6 text-indigo-400" />}
                        iconBg="bg-indigo-500/20"
                        title="Full-Screen Lock"
                        desc="Prevents tab switching and screen capture during exams"
                    />
                    <AIFeatureCard
                        icon={<FileCheck className="w-6 h-6 text-pink-400" />}
                        iconBg="bg-pink-500/20"
                        title="Auto-Submit & Tracking"
                        desc="Automatic submission and comprehensive violation logs"
                    />
                </div>
            </section>

            {/* 4. Why FairExam Section (Problem-Solving Cards) */}
            <section className="max-w-7xl mx-auto px-6 py-40 space-y-20">
                <div className="text-center space-y-6">
                    <h2 className="text-5xl md:text-[80px] font-black tracking-tight leading-tight">
                        Why <span className="text-gradient">FairExam</span>?
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto">
                        Traditional online exams are broken. We fixed them.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ProblemCard
                        icon={<AlertTriangle className="w-8 h-8 text-red-500" />}
                        title="Academic Dishonesty"
                        solution="AI-Powered Detection"
                    />
                    <ProblemCard
                        icon={<Monitor className="w-8 h-8 text-red-500" />}
                        title="Tab Switching"
                        solution="Full-Screen Lock"
                    />
                    <ProblemCard
                        icon={<Users2 className="w-8 h-8 text-red-500" />}
                        title="Proxy Candidates"
                        solution="Face Verification"
                    />
                </div>
            </section>

            {/* 5. Powerful Analytics Section */}
            <section className="max-w-7xl mx-auto px-6 py-40 space-y-20">
                <div className="text-center space-y-6">
                    <h2 className="text-5xl md:text-[80px] font-black tracking-tight leading-tight">
                        Powerful <span className="text-gradient">Analytics</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto">
                        Comprehensive insights and auto-generated reports
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Performance Chart */}
                    <div className="rounded-[40px] glass border-white/10 p-10 space-y-10 group hover:border-white/20 transition-all duration-700">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold">Student Performance</h3>
                                <p className="text-gray-500 font-medium pt-1">Last 6 months overview</p>
                            </div>
                            <TrendingUp className="w-6 h-6 text-emerald-400" />
                        </div>

                        <div className="h-72 relative mt-10">
                            <div className="absolute inset-0 grid grid-cols-6 border-l border-b border-white/10">
                                {[...Array(7)].map((_, i) => (
                                    <div key={i} className="h-full border-r border-dashed border-white/5 last:border-0" />
                                ))}
                            </div>
                            <svg className="absolute inset-0 w-full h-full overflow-visible">
                                <path
                                    d="M0,220 L120,190 L240,160 L360,130 L480,110 L600,90"
                                    fill="none"
                                    stroke="url(#lineGradient)"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                                <defs>
                                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#22D3EE" />
                                        <stop offset="100%" stopColor="#6366F1" />
                                    </linearGradient>
                                </defs>
                                {[0, 120, 240, 360, 480, 600].map((x, i) => (
                                    <circle key={i} cx={x} cy={[220, 190, 160, 130, 110, 90][i]} r="6" fill="#22D3EE" className="shadow-[0_0_12px_rgba(34,211,238,0.5)]" />
                                ))}
                            </svg>
                            <div className="absolute bottom-[-40px] w-full flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest px-1">
                                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                            </div>
                        </div>
                    </div>

                    {/* Violation Chart */}
                    <div className="rounded-[40px] glass border-white/10 p-10 space-y-10 group hover:border-white/20 transition-all duration-700">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold">Violation Detection</h3>
                                <p className="text-gray-500 font-medium pt-1">AI monitoring effectiveness</p>
                            </div>
                            <ShieldCheck className="w-6 h-6 text-indigo-400" />
                        </div>

                        <div className="h-72 relative mt-10">
                            <div className="absolute inset-0 flex items-end justify-between px-6 border-l border-b border-white/10">
                                {[0.6, 0.4, 0.3, 0.5, 0.2, 0.3].map((h, i) => (
                                    <div
                                        key={i}
                                        className="w-16 rounded-t-2xl bg-gradient-to-t from-purple-600/80 to-purple-400 shadow-lg shadow-purple-500/20 group-hover:from-purple-500 transition-colors"
                                        style={{ height: `${h * 100}%` }}
                                    />
                                ))}
                            </div>
                            <div className="absolute bottom-[-40px] w-full flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest px-10">
                                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Enterprise-Grade Security Section */}
            <section className="max-w-7xl mx-auto px-6 py-40 space-y-32">
                <div className="text-center space-y-6">
                    <h2 className="text-5xl md:text-[80px] font-black tracking-tight leading-tight">
                        Enterprise-Grade <span className="text-gradient">Security</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
                        Your data and exam integrity are protected by military-grade encryption and AI-powered monitoring
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <SecurityCard icon={<Shield className="w-7 h-7" />} title="End-to-End Encryption" desc="AES-256 encryption for all data" />
                    <SecurityCard icon={<Key className="w-7 h-7" />} title="Secure Authentication" desc="Multi-factor authentication support" />
                    <SecurityCard icon={<Database className="w-7 h-7" />} title="Data Privacy" desc="GDPR & FERPA compliant" />
                    <SecurityCard icon={<Lock className="w-7 h-7" />} title="Tamper Detection" desc="AI-powered integrity checks" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
                    <MetricCard value="99.9%" label="Detection Accuracy" />
                    <MetricCard value="100%" label="Data Encrypted" />
                    <MetricCard value="24/7" label="Security Monitoring" />
                </div>
            </section>

            {/* 7. Conduct Exams Section (CTA Block) */}
            <section className="max-w-7xl mx-auto px-6 py-40 text-center space-y-16 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial from-blue-600/15 to-transparent -z-10 blur-[120px]" />

                <div className="space-y-8 max-w-5xl mx-auto">
                    <h2 className="text-5xl md:text-[92px] font-[1000] tracking-tighter leading-[0.95] text-white">
                        Conduct Exams You Can <span className="text-gradient">Trust</span>
                    </h2>
                    <p className="text-2xl text-gray-400 font-bold max-w-4xl mx-auto">
                        Join thousands of institutions worldwide using FairExam to maintain academic integrity
                    </p>
                </div>

                <div className="space-y-12">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button className="px-14 py-6 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 font-[900] text-2xl flex items-center gap-3 transition-all hover:scale-[1.05] active:scale-95 shadow-2xl shadow-blue-500/30 cursor-pointer">
                            Start Free Trial <ChevronRight className="w-8 h-8" />
                        </button>
                        <button className="px-14 py-6 rounded-3xl glass font-[900] text-2xl hover:bg-white/5 transition-all text-white border-white/20 cursor-pointer">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 pt-6">
                        {['No credit card required', '14-day free trial', 'Cancel anytime'].map((item) => (
                            <div key={item} className="flex items-center gap-3.5 text-gray-400 font-black text-lg">
                                <CheckCircle className="w-7 h-7 text-cyan-400" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. Footer */}
            <footer className="border-t border-white/5 pt-40 pb-16 px-6">
                <div className="max-w-7xl mx-auto space-y-40">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
                        <div className="space-y-10 max-w-md">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                    <Shield className="w-7 h-7 text-white" />
                                </div>
                                <span className="text-3xl font-bold tracking-tight">FairExam</span>
                            </div>
                            <p className="text-xl text-gray-500 font-bold leading-relaxed">
                                Al-powered exam proctoring for the future of education
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
                            <FooterColumn title="Product" links={['Features', 'Pricing', 'Security', 'Integrations']} />
                            <FooterColumn title="Company" links={['About Us', 'Careers', 'Blog', 'Contact']} />
                            <FooterColumn title="Legal" links={['Privacy Policy', 'Terms of Service', 'GDPR', 'Compliance']} />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-16 border-t border-white/5">
                        <p className="text-gray-500 font-black text-lg">© 2026 FairExam. All rights reserved.</p>
                        <div className="flex items-center gap-10 text-gray-400 font-black tracking-widest uppercase text-sm">
                            <span>Trusted by <span className="text-blue-500">University</span></span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

{/* Helper Components */ }
function FeatureBadge({ icon, text }) {
    return (
        <div className="flex items-center gap-3 px-8 py-3.5 rounded-2xl glass border-white/10 text-base font-black text-gray-300 hover:border-white/30 transition-all cursor-default group">
            <div className="text-cyan-400 group-hover:scale-110 transition-transform">{icon}</div>
            {text}
        </div>
    );
}

function AIFeatureCard({ icon, iconBg, title, desc }) {
    return (
        <div className="rounded-[32px] bg-[#0E0C26]/40 border border-white/5 p-10 flex flex-col gap-12 group hover:border-white/10 transition-all duration-500 cursor-default">
            <div className={`w-16 h-16 rounded-2xl ${iconBg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                {icon}
            </div>
            <div className="space-y-8">
                <h4 className="text-2xl font-black text-gray-300 group-hover:text-white transition-colors">{title}</h4>
                <p className="text-[17px] font-bold text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">{desc}</p>
                <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span className="text-sm font-black text-emerald-500/80 tracking-widest uppercase">Active</span>
                </div>
            </div>
        </div>
    );
}

function ProblemCard({ icon, title, solution }) {
    return (
        <div className="rounded-[40px] glass border-white/5 p-12 space-y-14 hover:border-white/20 transition-all duration-700 group cursor-default">
            <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center transition-transform group-hover:-rotate-6">
                {icon}
            </div>
            <div className="space-y-10">
                <h3 className="text-3xl font-[1000] text-gray-500 group-hover:text-white transition-colors">{title}</h3>
                <div className="space-y-6">
                    <div className="flex items-center gap-2 group/link opacity-60">
                        <ChevronRight className="w-6 h-6 text-cyan-400" />
                        <span className="text-xl font-black text-gray-600 uppercase tracking-tighter">Solved with</span>
                    </div>
                    <div className="inline-flex items-center gap-4 px-8 py-5 rounded-[24px] bg-emerald-500/10 border border-emerald-500/20 shadow-2xl shadow-emerald-500/5 group-hover:bg-emerald-500/20 transition-all">
                        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-black text-emerald-500 uppercase tracking-tight">{solution}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SecurityCard({ icon, title, desc }) {
    return (
        <div className="rounded-[32px] glass border-white/5 p-12 flex flex-col items-center text-center gap-10 hover:border-white/20 transition-all duration-500 group cursor-default">
            <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-all duration-500 group-hover:rotate-6">
                {icon}
            </div>
            <div className="space-y-3">
                <h4 className="text-xl font-[1000] text-gray-300 group-hover:text-white transition-colors tracking-tight">{title}</h4>
                <p className="text-[15px] font-bold text-gray-600 leading-relaxed group-hover:text-gray-500 transition-colors uppercase tracking-widest">{desc}</p>
            </div>
        </div>
    );
}

function MetricCard({ value, label }) {
    return (
        <div className="rounded-[48px] glass border-white/5 p-16 text-center space-y-5 group hover:border-white/20 transition-all duration-700 cursor-default">
            <div className="text-7xl font-[1000] tracking-tighter text-gradient leading-none">{value}</div>
            <div className="text-xl font-black text-gray-600 group-hover:text-gray-500 transition-colors uppercase tracking-[0.2em]">{label}</div>
        </div>
    );
}

function FooterColumn({ title, links }) {
    return (
        <div className="space-y-10">
            <h5 className="text-xl font-black text-white tracking-widest uppercase">{title}</h5>
            <ul className="space-y-6">
                {links.map((link) => (
                    <li key={link}>
                        <a href="#" className="text-lg text-gray-500 hover:text-white font-bold transition-all hover:translate-x-1 inline-block">{link}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Landing_Home;
