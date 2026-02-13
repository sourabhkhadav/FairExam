import React, { useState } from 'react';
import {
    User, Mail, Building2, Shield, KeyRound,
    Save, Camera, BadgeCheck, Briefcase,
    Eye, EyeOff, Lock
} from 'lucide-react';

const ProfileCard = ({ title, icon: Icon, children }) => (
    <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#4F46E5]" />
            </div>
            <h2 className="text-lg sm:text-xl font-medium text-[#0F172A] tracking-tight">{title}</h2>
        </div>
        <div className="relative z-10 space-y-6">
            {children}
        </div>
    </div>
);

const InputField = ({ label, icon: Icon, type = "text", placeholder, value, onChange, disabled = false }) => (
    <div className="space-y-2">
        <label className="text-[13px] font-semibold text-[#64748B] ml-1 uppercase tracking-wider">{label}</label>
        <div className="relative group/field">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] group-focus-within/field:text-[#4F46E5] transition-colors">
                <Icon className="w-4.5 h-4.5" />
            </div>
            <input
                type={type}
                className={`w-full pl-11 pr-5 py-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] focus:bg-white focus:border-[#4F46E5]/40 transition-all outline-none text-[#0F172A] font-medium ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    </div>
);

const Profile = () => {
    const [personalInfo, setPersonalInfo] = useState({
        name: 'John Doe',
        email: 'john.doe@university.edu',
        organization: 'Global Institute of Technology',
        role: 'Senior Examiner'
    });

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPasswords, setShowPasswords] = useState({
        old: false,
        new: false,
        confirm: false
    });

    const handleInfoChange = (field, value) => {
        setPersonalInfo(prev => ({ ...prev, [field]: value }));
    };

    const handlePasswordChange = (field, value) => {
        setPasswordData(prev => ({ ...prev, [field]: value }));
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-medium text-[#0F172A] tracking-tight">Profile Settings</h1>
                    <p className="text-[#64748B] text-[15px] font-medium mt-1">Manage your account details and security preferences.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-[#4F46E5] text-white rounded-xl font-medium hover:bg-[#4338CA] transition-all shadow-sm hover:shadow-md active:scale-95">
                    <Save className="w-5 h-5" />
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column - Personal & Org */}
                <div className="lg:col-span-7 space-y-8">
                    <ProfileCard title="Account Information" icon={User}>
                        <div className="flex flex-col sm:flex-row items-center gap-6 mb-4">
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-3xl bg-[#EEF2FF] border-2 border-[#E0E7FF] flex items-center justify-center text-[#4F46E5] overflow-hidden">
                                    <User className="w-12 h-12" />
                                </div>
                                <button className="absolute -bottom-2 -right-2 p-2 bg-white border border-[#E2E8F0] rounded-xl shadow-lg text-[#64748B] hover:text-[#4F46E5] transition-all active:scale-90">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="text-center sm:text-left">
                                <h3 className="text-lg font-bold text-[#0F172A]">{personalInfo.name}</h3>
                                <p className="text-[#64748B] text-sm font-medium">{personalInfo.role} at {personalInfo.organization}</p>
                                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] text-xs font-bold border border-[#D1FAE5]">
                                    <BadgeCheck className="w-3.5 h-3.5" />
                                    Verified Examiner
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <InputField
                                label="Full Name"
                                icon={User}
                                value={personalInfo.name}
                                onChange={(e) => handleInfoChange('name', e.target.value)}
                            />
                            <InputField
                                label="Email Address"
                                icon={Mail}
                                type="email"
                                value={personalInfo.email}
                                disabled={true}
                            />
                        </div>
                    </ProfileCard>

                    <ProfileCard title="Organization Details" icon={Building2}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <InputField
                                label="Organization Name"
                                icon={Building2}
                                value={personalInfo.organization}
                                onChange={(e) => handleInfoChange('organization', e.target.value)}
                            />
                            <InputField
                                label="Job Title / Role"
                                icon={Briefcase}
                                value={personalInfo.role}
                                onChange={(e) => handleInfoChange('role', e.target.value)}
                            />
                        </div>
                    </ProfileCard>
                </div>

                {/* Right Column - Security */}
                <div className="lg:col-span-5 space-y-8">
                    <ProfileCard title="Security & Password" icon={Shield}>
                        <div className="space-y-6">
                            <div className="p-4 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white border border-[#FFEDD5] flex items-center justify-center shrink-0">
                                    <KeyRound className="w-5 h-5 text-[#F97316]" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-[#9A3412]">Change Password</h4>
                                    <p className="text-xs text-[#C2410C]/80 mt-1 font-medium leading-relaxed">Ensure a strong password (min. 8 chars) including symbols and numbers.</p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="relative">
                                    <InputField
                                        label="Current Password"
                                        icon={Lock}
                                        type={showPasswords.old ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={passwordData.oldPassword}
                                        onChange={(e) => handlePasswordChange('oldPassword', e.target.value)}
                                    />
                                    <button
                                        onClick={() => togglePasswordVisibility('old')}
                                        className="absolute right-4 top-[42px] text-[#94A3B8] hover:text-[#64748B]"
                                    >
                                        {showPasswords.old ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                                    </button>
                                </div>

                                <div className="relative">
                                    <InputField
                                        label="New Password"
                                        icon={Lock}
                                        type={showPasswords.new ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={passwordData.newPassword}
                                        onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                                    />
                                    <button
                                        onClick={() => togglePasswordVisibility('new')}
                                        className="absolute right-4 top-[42px] text-[#94A3B8] hover:text-[#64748B]"
                                    >
                                        {showPasswords.new ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                                    </button>
                                </div>

                                <div className="relative">
                                    <InputField
                                        label="Confirm New Password"
                                        icon={Lock}
                                        type={showPasswords.confirm ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                                    />
                                    <button
                                        onClick={() => togglePasswordVisibility('confirm')}
                                        className="absolute right-4 top-[42px] text-[#94A3B8] hover:text-[#64748B]"
                                    >
                                        {showPasswords.confirm ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                                    </button>
                                </div>
                            </div>

                            <button className="w-full py-3.5 bg-[#F1F5F9] text-[#475569] font-bold rounded-xl hover:bg-[#E2E8F0] hover:text-[#0F172A] transition-all active:scale-95">
                                Update Password
                            </button>
                        </div>
                    </ProfileCard>
                </div>
            </div>
        </div>
    );
};

export default Profile;
