import React, { useState, useEffect } from 'react';
import {
    Search, ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MetricCard = ({ label, value, colorClass }) => (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm flex-1 min-w-[200px]">
        <div className="text-[#0F172A] text-xs sm:text-sm font-medium mb-2">{label}</div>
        <div className={`text-3xl sm:text-[40px] font-medium ${colorClass || 'text-[#0F172A]'}`}>{value}</div>
    </div>
);

const Examiner_ViolationReports = () => {
    const [violations, setViolations] = useState([]);
    const [stats, setStats] = useState({ totalViolations: 0, highSeverity: 0, underReview: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchViolations();
    }, []);

    const fetchViolations = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/violations/all', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setViolations(data.data.violations);
                setStats(data.data.stats);
            }
        } catch (error) {
            console.error('Error fetching violations:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-[32px] font-medium text-[#0F172A] tracking-tight">Violation Reports</h1>
                    <p className="text-[#0F172A]/70 text-[16px] font-medium mt-1">Review AI-detected violations and suspicious activities.</p>
                </div>

                <div className="flex flex-wrap gap-4 sm:gap-6 mb-8 sm:mb-10">
                    <MetricCard label="Total Violations" value={stats.totalViolations} />
                    <MetricCard label="High Severity" value={stats.highSeverity} colorClass="text-[#EF4444]" />
                    <MetricCard label="Under Review" value={stats.underReview} colorClass="text-[#F59E0B]" />
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                    <h2 className="text-xl font-bold text-[#0F172A] mb-6 sm:mb-8">Violation Details</h2>
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F172A]"></div>
                        </div>
                    ) : violations.length === 0 ? (
                        <div className="text-center py-12 text-[#64748B]">No violations recorded yet.</div>
                    ) : (
                        <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
                            <table className="w-full min-w-[800px]">
                                <thead>
                                    <tr className="text-left text-[#0F172A] text-[13px] font-medium uppercase tracking-wider border-b border-[#F1F5F9]">
                                        <th className="pb-6">Student Name</th>
                                        <th className="pb-6">Exam</th>
                                        <th className="pb-6">Violation Type</th>
                                        <th className="pb-6">Timestamp</th>
                                        <th className="pb-6 text-right">Severity</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F1F5F9]">
                                    {violations.map((v) => (
                                        <tr key={v.id} className="group hover:bg-[#F8FAFC]/50 transition-colors">
                                            <td className="py-5 font-medium whitespace-nowrap">
                                                <Link to={`/student-violations/${v.name}`} className="text-[#0F172A] hover:text-[#1E293B] hover:underline transition-colors">
                                                    {v.name}
                                                </Link>
                                            </td>
                                            <td className="py-5 text-[#0F172A]/70 font-medium whitespace-nowrap">{v.exam}</td>
                                            <td className="py-5 text-[#0F172A] font-medium italic whitespace-nowrap">"{v.type}"</td>
                                            <td className="py-5 text-[#0F172A]/70 font-medium text-sm whitespace-nowrap">{v.time}</td>
                                            <td className="py-5 text-right whitespace-nowrap">
                                                <span className={`px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-bold ${
                                                    v.severity === 'High' ? 'bg-[#FEF2F2] text-[#EF4444]' :
                                                    v.severity === 'Medium' ? 'bg-[#FFFBEB] text-[#D97706]' :
                                                    'bg-[#EFF6FF] text-[#3B82F6]'
                                                }`}>
                                                    {v.severity}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Examiner_ViolationReports;
