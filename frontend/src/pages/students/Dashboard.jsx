import React, { useState, useEffect } from 'react';
import api from '../../api/http'; 
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { ShieldAlert, Clock, ArrowRight, Wallet, Briefcase, Activity } from 'lucide-react';

// ✅ Component Imports (Layout is now handled by App.jsx, so we don't wrap it here)
import Card from "../../components/Card";
import VerifiedBadge from '../../components/VerifiedBadge';

const StudentDashboard = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [stats, setStats] = useState({ active: 0, earned: 0 });
    const [isVetted, setIsVetted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const { data } = await api.get('/students/dashboard-summary');
                setApplications(data.applications || []);
                setStats(data.stats || { active: 0, earned: 0 });
                setIsVetted(data.isVetted || false);
            } catch (err) {
                console.error("Dashboard load error", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    // 1. Loading State (No Layout wrapper needed)
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center font-black uppercase tracking-[0.3em] text-gray-300 animate-pulse">
                    Syncing MTSupport...
                </div>
            </div>
        );
    }

    // 2. Main Content (App.jsx provides the Sidebar/Header via DashboardLayout)
    return (
        <div className="max-w-7xl mx-auto space-y-10 p-4">
            
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        Welcome, <span className="text-indigo-600">{user?.name?.split(' ')[0] || 'Scholar'}</span>
                        <VerifiedBadge isVetted={isVetted} size={28} />
                    </h1>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">
                        Your Career at a Glance
                    </p>
                </div>
                
                {!isVetted && (
                    <div className="bg-amber-50 border border-amber-100 p-5 rounded-[2rem] flex items-center gap-4 max-w-md shadow-sm">
                        <div className="bg-white p-3 rounded-2xl text-amber-600 shadow-sm">
                            <ShieldAlert size={20} />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-amber-900 uppercase tracking-wider">Account Restricted</p>
                            <p className="text-xs text-amber-700 font-semibold leading-tight">Verify ID to unlock higher SSP payments.</p>
                        </div>
                        <Link to="/student/profile-setup" className="bg-amber-600 text-white p-2.5 rounded-xl hover:bg-amber-700 transition shadow-lg shadow-amber-200">
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card subtitle="Earnings" variant="primary">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-3xl font-black text-gray-900 leading-none">
                                <span className="text-xs font-bold text-gray-400 mr-1 uppercase">SSP</span>
                                {stats.earned.toLocaleString()}
                            </h3>
                            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-3">Ready for payout</p>
                        </div>
                        <div className="bg-indigo-50 p-4 rounded-[1.5rem] text-indigo-600">
                            <Wallet size={28} />
                        </div>
                    </div>
                </Card>

                <Card subtitle="Engagement">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-3xl font-black text-gray-900 leading-none">{stats.active}</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-3">Active Projects</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-[1.5rem] text-gray-900">
                            <Briefcase size={28} />
                        </div>
                    </div>
                </Card>

                <Card subtitle="Trust Level">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className={`text-xl font-black leading-none ${isVetted ? 'text-emerald-600' : 'text-amber-500'}`}>
                                {isVetted ? 'Fully Verified' : 'Vetting Pending'}
                            </h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-3 flex items-center gap-1">
                                <Clock size={12} /> Auto-refresh active
                            </p>
                        </div>
                        <div className={`${isVetted ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'} p-4 rounded-[1.5rem]`}>
                            <Activity size={28} />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Recent Applications Table */}
            <Card title="Recent Activity" subtitle="Applications">
                <div className="mt-4 -mx-6 md:-mx-8 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Project</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Offer</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Workspace</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {applications.length > 0 ? applications.map(app => (
                                <tr key={app._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <p className="font-bold text-gray-900">{app.job?.title || 'Untitled Project'}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Nexus Verified MSME</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="font-black text-indigo-600 italic">
                                            <span className="text-[10px] font-bold opacity-50 mr-0.5">SSP</span>
                                            {app.bidAmount.toLocaleString()}
                                        </p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider border ${
                                            app.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                            app.status === 'REJECTED' ? 'bg-red-50 text-red-600 border-red-100' : 
                                            'bg-amber-50 text-amber-600 border-amber-100'
                                        }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        {app.status === 'ACCEPTED' ? (
                                            <Link to={`/workspace/${app.job?._id}`} className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-indigo-600 transition shadow-sm">
                                                Enter
                                            </Link>
                                        ) : (
                                            <span className="text-[10px] font-black text-gray-300 uppercase">Awaiting Client</span>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="px-8 py-20 text-center">
                                        <p className="text-sm font-bold text-gray-300 uppercase tracking-[0.2em]">No active history</p>
                                        <Link to="/marketplace" className="text-indigo-600 font-black text-[10px] uppercase mt-4 inline-block hover:underline">Find your first gig →</Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default StudentDashboard;