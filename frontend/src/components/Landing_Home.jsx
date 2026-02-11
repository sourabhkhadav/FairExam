import React, { useState, useEffect } from 'react';
import {
    Shield, Layout, Lock, ChevronRight, Star, Camera, Volume2, FileText,
    AlertTriangle, Monitor, Users2, CheckCircle2, Eye, FileCheck,
    CheckCircle, TrendingUp, Database, Key, ShieldCheck, Mail, MapPin, Phone,
    ArrowRight, Globe, Zap, Cpu, BarChart2, Activity, HardDrive, Download, ClipboardList, Clock, ShieldAlert
} from 'lucide-react';

function Landing_Home() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white text-charcoal selection:bg-indigo-100 relative font-sans overflow-hidden">
            {/* Cinematic Light Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-radial from-indigo-50/60 via-transparent to-transparent blur-[120px] opacity-80" />
                <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-radial from-blue-50/40 via-transparent to-transparent blur-[120px] opacity-60 animate-pulse-slow" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-radial from-cyan-50/30 via-transparent to-transparent blur-[120px] opacity-50" />
            </div>

            {/* 1. Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 glass border-b border-black/5' : 'py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-11 h-11 rounded-xl glass-card flex items-center justify-center group-hover:scale-110 transition-all duration-500 bg-white shadow-sm border-black/5">
                            <Shield className="w-6 h-6 text-brand-purple" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-gradient leading-none">FairExam</span>
                    </div>

                    <div className="hidden md:flex items-center gap-10">
                        {['Solutions', 'Features', 'Security', 'Enterprise'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-[13px] font-bold text-slate-500 hover:text-charcoal transition-colors tracking-widest uppercase">
                                {item}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-5">
                        <button className="hidden sm:block text-sm font-bold text-slate-500 hover:text-charcoal transition-colors tracking-widest uppercase">Sign In</button>
                        <button className="px-6 py-3 rounded-full bg-charcoal text-white text-sm font-bold hover:bg-indigo-600 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-200 cursor-pointer tracking-wider uppercase">
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* 2. Elite Hero with Visual Impact */}
            <header className="relative pt-48 pb-24 px-6 z-10">
                <div className="max-w-7xl mx-auto space-y-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="text-left space-y-10">
                            <div className="space-y-6">
                                <h1 className="text-6xl md:text-7xl lg:text-[92px] font-black tracking-tighter leading-[0.85] text-charcoal">
                                    Fair & Secure <br />
                                    <span className="text-gradient">AI-Powered Exams</span>
                                </h1>
                                <p className="text-xl text-slate-500 font-bold leading-relaxed max-w-xl">
                                    AI Face Detection • Noise Monitoring • Full-Screen Enforcement. The gold standard for modern academic integrity.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                                <button className="w-full sm:w-auto px-12 py-6 rounded-3xl bg-charcoal text-white font-black text-xl flex items-center justify-center gap-3 group hover:bg-brand-purple hover:scale-[1.05] transition-all shadow-2xl shadow-indigo-100 cursor-pointer">
                                    Secure Login
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </button>
                                <button className="w-full sm:w-auto px-10 py-6 rounded-3xl border border-black/10 bg-white font-black text-xl hover:bg-slate-50 transition-all text-charcoal flex items-center justify-center gap-3 cursor-pointer">
                                    View Assigned Exams
                                </button>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-4 bg-indigo-500/10 rounded-[64px] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative rounded-[48px] overflow-hidden border border-black/5 shadow-2xl shadow-indigo-100/50 bg-white aspect-[4/3]">
                                <img
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2070"
                                    alt="Modern Online Examination"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* 3. Feature Bento Grid with Visuals */}
            <section className="max-w-7xl mx-auto px-6 py-32 space-y-20 relative z-10 overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                    <div className="space-y-6 max-w-2xl text-left">
                        <h2 className="text-5xl md:text-[80px] font-black tracking-tight leading-none text-charcoal">
                            Engineered for <br /><span className="text-gradient">Absolute Trust</span>
                        </h2>
                        <p className="text-xl text-slate-500 font-bold leading-relaxed">
                            Real-time monitoring and anti-cheat restrictions built for Students and Examiners.
                        </p>
                    </div>
                    <div className="hidden lg:block pb-5">
                        <div className="p-5 glass-card rounded-2xl flex items-center gap-4 bg-white/80 border-black/5">
                            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
                                <ShieldAlert className="w-6 h-6 text-brand-teal" />
                            </div>
                            <div>
                                <div className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">Violation Shield</div>
                                <div className="text-xl font-black text-charcoal">Real-Time Alerts</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[300px]">
                    {/* Main AI Card - Clean Minimalist */}
                    <div className="md:col-span-8 md:row-span-2 glass-card rounded-[48px] relative overflow-hidden group border-black/5 bg-white shadow-2xl shadow-slate-200/50">
                        <div className="relative z-10 h-full flex flex-col justify-between p-12 text-charcoal">
                            <div className="p-4 w-fit rounded-2xl bg-indigo-50 border border-indigo-100 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                <Cpu className="w-10 h-10 text-brand-purple" />
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-4xl font-black tracking-tight">AI Proctoring Engine</h3>
                                <p className="text-xl text-slate-500 font-bold max-w-md leading-relaxed">Continuous AI face detection and noise monitoring ensures a proxy-free environment with automated violation warnings.</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                    {['Face Detection', 'Noise Monitoring', 'Real-time Warnings', 'Auto-Submit'].map(feature => (
                                        <div key={feature} className="flex items-center gap-3 text-sm font-black text-slate-500">
                                            <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                            </div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Secure Mode - Clean Minimalist */}
                    <div className="md:col-span-4 glass-card rounded-[40px] p-10 flex flex-col justify-between group bg-slate-900 text-white overflow-hidden border-none text-left shadow-2xl shadow-indigo-200/20">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center relative z-10 group-hover:bg-brand-purple transition-all duration-500">
                            <Lock className="w-7 h-7" />
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-2xl font-black pb-2 uppercase tracking-tighter">Safe Examination Browser</h4>
                            <p className="text-slate-300 font-bold leading-relaxed">Hardened sanctuary for high-stakes assessments.</p>
                        </div>
                    </div>

                    {/* Dashboard Feature - Clean Minimalist */}
                    <div className="md:col-span-4 glass-card rounded-[40px] p-10 flex flex-col justify-between group bg-white border-black/5 overflow-hidden text-left">
                        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center border border-orange-100 shadow-sm group-hover:scale-110 transition-transform duration-500 relative z-10 text-orange-600">
                            <Monitor className="w-7 h-7" />
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-2xl font-black pb-2 text-charcoal uppercase tracking-tighter">Dashboard Suite</h4>
                            <p className="text-slate-500 font-bold leading-relaxed">Centralized command for schedules and live monitoring.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Insight Intelligence Section */}
            <section className="bg-slate-50 py-32 border-y border-black/5 relative z-10 overflow-hidden text-left">
                <div className="max-w-7xl mx-auto px-6 space-y-20">
                    <div className="text-center space-y-6">
                        <h2 className="text-5xl md:text-[80px] font-black tracking-tight leading-none text-charcoal">
                            Insight <span className="text-gradient">Intelligence</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-slate-500 font-bold max-w-3xl mx-auto">
                            Auto-evaluate MCQ answers, view violation reports, and publish performance analytics instantly.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="glass-card rounded-[48px] p-12 space-y-10 col-span-2 bg-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-3 h-3 rounded-full bg-brand-purple" />
                                    <span className="text-sm font-black tracking-[0.2em] uppercase text-slate-400">Live Result Processing</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
                                    <Activity className="w-4 h-4 text-emerald-600" />
                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active</span>
                                </div>
                            </div>

                            <div className="h-[400px] relative rounded-3xl overflow-hidden group/img border border-indigo-50 shadow-inner">
                                <img
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015"
                                    alt="AI Analytics Dashboard"
                                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-1000 opacity-90 backdrop-contrast-125"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-80" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <MetricItem
                                icon={<CheckCircle className="w-6 h-6" />}
                                label="Auto-Assessment"
                                value="MCQ Ready"
                                image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=2070"
                            />
                            <MetricItem
                                icon={<Download className="w-6 h-6" />}
                                label="Results"
                                value="PDF Export"
                                image="https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=2030"
                            />
                            <MetricItem
                                icon={<Database className="w-6 h-6" />}
                                label="Access"
                                value="Roll-Number Based"
                                image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Powerful Analytics Section */}
            <section className="py-32 px-6 relative z-10 text-left bg-white">
                <div className="max-w-7xl mx-auto space-y-24">
                    <div className="text-center space-y-6">
                        <h2 className="text-5xl md:text-[80px] font-black tracking-tighter leading-none text-charcoal">
                            Powerful <span className="text-gradient">Analytics</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-slate-500 font-bold max-w-2xl mx-auto">
                            Comprehensive insights and auto-generated reports.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Student Performance Chart */}
                        <div className="glass-card rounded-[48px] p-10 bg-slate-50/50 border-black/5 space-y-10 group">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black text-charcoal">Student Performance</h3>
                                    <p className="text-sm font-bold text-slate-400">Last 6 months overview</p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-emerald-500" />
                            </div>

                            <div className="relative h-[300px] w-full mt-10">
                                <svg className="w-full h-full" viewBox="0 0 800 300">
                                    <path
                                        d="M0 250 L150 200 L300 180 L450 140 L600 100 L800 60"
                                        fill="none"
                                        stroke="url(#gradient-line)"
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                        className="drop-shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                                    />
                                    <defs>
                                        <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#818cf8" />
                                            <stop offset="100%" stopColor="#4f46e5" />
                                        </linearGradient>
                                    </defs>
                                    {[0, 150, 300, 450, 600, 800].map((x, i) => (
                                        <circle key={i} cx={x} cy={[250, 200, 180, 140, 100, 60][i]} r="8" fill="white" stroke="#4f46e5" strokeWidth="4" />
                                    ))}
                                </svg>
                                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] font-black text-slate-300 uppercase tracking-widest pt-6 border-t border-slate-100">
                                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                                </div>
                            </div>
                        </div>

                        {/* Violation Detection Chart */}
                        <div className="glass-card rounded-[48px] p-10 bg-slate-50/50 border-black/5 space-y-10">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black text-charcoal">Violation Detection</h3>
                                    <p className="text-sm font-bold text-slate-400">AI monitoring effectiveness</p>
                                </div>
                                <ShieldCheck className="w-8 h-8 text-indigo-600" />
                            </div>

                            <div className="relative h-[250px] w-full mt-10 flex items-end justify-between gap-4 px-2">
                                {[40, 70, 50, 85, 30, 60].map((height, i) => (
                                    <div key={i} className="flex-1 h-full flex flex-col justify-end items-center group/bar">
                                        <div
                                            className="w-full max-w-[40px] rounded-2xl bg-gradient-to-t from-indigo-500 to-brand-purple transition-all duration-700 hover:scale-x-110 shadow-lg shadow-indigo-100"
                                            style={{ height: `${height}%` }}
                                        />
                                    </div>
                                ))}
                                <div className="absolute -bottom-10 left-0 right-0 flex justify-between text-[10px] font-black text-slate-300 uppercase tracking-widest pt-6 border-t border-slate-100">
                                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Security Core Section */}
            <section className="max-w-7xl mx-auto px-6 py-32 space-y-24 relative z-10 text-left">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-10 order-2 lg:order-1">
                        <h2 className="text-5xl md:text-[80px] font-black tracking-tighter leading-[0.9] text-charcoal">
                            The <span className="text-gradient">Fortress</span> <br /> Architecture
                        </h2>
                        <p className="text-xl md:text-2xl text-slate-500 font-bold leading-relaxed">
                            Hardened security features designed to prevent cheating at every layer.
                        </p>
                        <div className="space-y-8 pt-4">
                            <SecurityFeature title="Roll Number Secure Access" desc="Unique access control for students." />
                            <SecurityFeature title="Encrypted Result Publishing" desc="Secure PDF generation." />
                            <SecurityFeature title="Tamper-Proof Proctoring" desc="AI face and audio verification." />
                        </div>
                    </div>

                    <div className="relative order-1 lg:order-2 group">
                        <div className="absolute inset-0 bg-indigo-500/10 rounded-[64px] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="relative w-full h-full glass-card rounded-[64px] bg-white overflow-hidden shadow-2xl shadow-slate-200 border-black/5 aspect-square">
                            <div className="relative z-10 h-full flex flex-col items-center justify-center gap-8">
                                <Shield className="w-32 h-32 text-indigo-600 drop-shadow-2xl animate-glow" />
                                <div className="text-2xl font-black tracking-[0.4em] uppercase text-slate-300">Protected</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Premium About Us Section */}
            <section className="py-32 px-6 relative z-10 bg-white border-y border-black/5" id="about">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-teal-500/10 rounded-[64px] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative rounded-[56px] overflow-hidden border border-black/5 shadow-2xl shadow-teal-100/50 aspect-[4/5]">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071"
                                alt="Our Mission"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent" />
                            <div className="absolute bottom-12 left-12 right-12 p-8 glass-card bg-white/90 border-white/20">
                                <p className="text-sm font-black text-brand-teal uppercase tracking-widest mb-2">Our Vision</p>
                                <p className="text-xl font-bold text-charcoal italic leading-relaxed">
                                    "To democratize world-class proctoring technology for every academic institution."
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12 text-left">
                        <div className="space-y-6">
                            <h2 className="text-5xl md:text-[80px] font-black tracking-tighter leading-none text-charcoal">
                                We Are <br /><span className="text-gradient">Integrity Pioneers</span>
                            </h2>
                            <p className="text-xl text-slate-500 font-bold leading-relaxed max-w-xl">
                                FairExam was founded by educators and engineers with a single mission: to protect the value of modern degrees in an increasingly remote world.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <ValuePoint
                                icon={<Star className="w-6 h-6 text-brand-purple" />}
                                title="Academic Truth"
                                desc="We believe in fair opportunity for every honest student."
                            />
                            <ValuePoint
                                icon={<Zap className="w-6 h-6 text-brand-teal" />}
                                title="AI Excellence"
                                desc="Proprietary models built for 99.9% detection accuracy."
                            />
                            <ValuePoint
                                icon={<Users2 className="w-6 h-6 text-indigo-500" />}
                                title="Privacy First"
                                desc="EU-GDPR and SOC2 compliant data architecture."
                            />
                            <ValuePoint
                                icon={<Globe className="w-6 h-6 text-amber-500" />}
                                title="Global Impact"
                                desc="Empowering 500+ universities across 6 continents."
                            />
                        </div>

                        <div className="pt-6">
                            <button className="flex items-center gap-3 text-charcoal font-black text-lg group hover:text-brand-purple transition-colors cursor-pointer">
                                Learn more about our story
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Institutional Call to Action */}
            <section className="py-32 px-6 relative z-10 overflow-hidden bg-slate-50/30">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-50/50 blur-[120px] rounded-full -z-10" />
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-charcoal">
                        Join thousands of institutions worldwide using <span className="text-indigo-600">FairExam</span> to maintain academic integrity
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button className="px-12 py-6 rounded-3xl bg-gradient-to-r from-indigo-500 to-brand-purple text-white font-black text-xl flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-2xl shadow-indigo-200 cursor-pointer">
                            Start Free Trial
                            <ChevronRight className="w-6 h-6" />
                        </button>
                        <button className="px-12 py-6 rounded-3xl border border-black/10 bg-white font-black text-xl hover:bg-slate-50 transition-all text-charcoal flex items-center justify-center gap-3 cursor-pointer">
                            Contact Sales
                        </button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-10 pt-4">
                        <TrustMarker text="No credit card required" />
                        <TrustMarker text="14-day free trial" />
                        <TrustMarker text="Cancel anytime" />
                    </div>
                </div>
            </section >

            {/* 7. Enhanced Global Footer */}
            < footer className="pt-40 pb-20 px-6 relative z-10 bg-white border-t border-black/5" >
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 pb-24">
                        <div className="lg:col-span-2 space-y-10 text-left">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-charcoal flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-3xl font-black tracking-tighter text-charcoal">FairExam</span>
                            </div>
                            <p className="text-xl text-slate-400 font-bold max-w-sm leading-relaxed">
                                AI-powered exam proctoring for the future of education.
                            </p>
                            <div className="flex items-center gap-5">
                                <SocialLink icon={<Globe className="w-5 h-5" />} />
                                <SocialLink icon={<Mail className="w-5 h-5" />} />
                                <SocialLink icon={<Phone className="w-5 h-5" />} />
                            </div>
                        </div>

                        <FooterList title="Product" links={['Features', 'Pricing', 'Security', 'Integrations']} />
                        <FooterList title="Company" links={['About Us', 'Careers', 'Blog', 'Contact']} />
                        <FooterList title="Legal" links={['Privacy Policy', 'Terms of Service', 'GDPR', 'Compliance']} />
                    </div>

                    <div className="pt-16 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-10 font-bold text-slate-400">
                        <p>© 2026 FairExam. All rights reserved.</p>
                        <div className="flex items-center gap-4 text-sm">
                            <span>Trusted by</span>
                            <span className="text-charcoal font-black">Universities Worldwide</span>
                        </div>
                    </div>
                </div>
            </footer >
        </div >
    );
}

{/* Refined Helper Components */ }
function ValuePoint({ icon, title, desc }) {
    return (
        <div className="flex flex-col gap-4 group/value">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-black/5 group-hover/value:bg-white group-hover/value:shadow-lg transition-all duration-500">
                {icon}
            </div>
            <div className="space-y-1">
                <h4 className="text-lg font-black text-charcoal">{title}</h4>
                <p className="text-sm font-bold text-slate-400 group-hover/value:text-slate-500 transition-colors">{desc}</p>
            </div>
        </div>
    );
}

function TrustMarker({ text }) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            </div>
            <span className="text-sm font-bold text-slate-500">{text}</span>
        </div>
    );
}

{/* Refined Helper Components */ }
function FeatureBox({ icon, title, desc, color }) {
    return (
        <div className="md:col-span-4 glass-card rounded-[40px] p-10 flex flex-col justify-between group bg-white border-black/5 overflow-hidden">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${color} shadow-sm group-hover:scale-110 transition-transform duration-500 relative z-10`}>
                {icon}
            </div>
            <div className="relative z-10">
                <h4 className="text-2xl font-black pb-2 text-charcoal uppercase tracking-tighter">{title}</h4>
                <p className="text-slate-500 font-bold leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function MetricItem({ icon, label, value, image }) {
    return (
        <div className="glass-card rounded-3xl p-8 flex items-center justify-between group bg-white border-black/5 relative overflow-hidden">
            <div className="flex items-center gap-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-all">
                    <div className="text-brand-purple">{icon}</div>
                </div>
                <div className="text-left">
                    <div className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400 leading-none pb-1">{label}</div>
                    <div className="text-2xl font-black text-charcoal">{value}</div>
                </div>
            </div>
            <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-brand-purple transition-colors relative z-10" />
        </div>
    );
}

function SecurityFeature({ title, desc }) {
    return (
        <div className="flex gap-6 group text-left">
            <div className="pt-1.5">
                <div className="w-6 h-6 rounded-full border-2 border-indigo-200 flex items-center justify-center group-hover:border-indigo-600 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>
            <div>
                <h4 className="text-xl font-black text-charcoal group-hover:text-indigo-600 transition-colors">{title}</h4>
                <p className="text-lg text-slate-400 font-bold pt-1">{desc}</p>
            </div>
        </div>
    );
}

function SocialLink({ icon }) {
    return (
        <div className="w-12 h-12 rounded-full border border-black/5 bg-white flex items-center justify-center text-slate-400 hover:text-white hover:bg-charcoal transition-all cursor-pointer shadow-sm">
            {icon}
        </div>
    );
}

function FooterList({ title, links }) {
    return (
        <div className="space-y-10 text-left">
            <h5 className="text-[11px] font-black tracking-[0.4em] uppercase text-charcoal/30">{title}</h5>
            <ul className="space-y-5">
                {links.map((link) => (
                    <li key={link}>
                        <a href="#" className="text-lg text-slate-400 hover:text-indigo-600 font-bold transition-all inline-block hover:translate-x-2">{link}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Landing_Home;
