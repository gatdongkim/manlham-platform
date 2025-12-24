import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from "../../api/http";
// ❌ Removed DashboardLayout import to prevent layout nesting
import { ClipboardList, Search, ShieldCheck, CreditCard, UserX, Clock, ExternalLink, Loader2, ArrowLeft } from "lucide-react";
import { format } from 'date-fns';

export default function AuditLogs() {
    const navigate = useNavigate();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                // ✅ Fetching the immutable audit trail
                const { data } = await API.get('/admin/audit-logs');
                setLogs(data.data || data || []);
            } catch (err) {
                console.error("Error fetching logs", err);
                setLogs([]);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    const getActionBadge = (action) => {
        const base = "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tight flex items-center w-fit border ";
        switch (action) {
            case 'RELEASE_FUNDS': return <span className={`${base} bg-emerald-50 text-emerald-700 border-emerald-100`}><CreditCard size={10} className="mr-1.5"/> Payout</span>;
            case 'REFUND_CLIENT': return <span className={`${base} bg-red-50 text-red-700 border-red-100`}><UserX size={10} className="mr-1.5"/> Refund</span>;
            case 'APPROVE_PRO': return <span className={`${base} bg-indigo-50 text-indigo-700 border-indigo-100`}><ShieldCheck size={10} className="mr-1.5"/> Verified</span>;
            default: return <span className={`${base} bg-gray-50 text-gray-500 border-gray-100`}>{action}</span>;
        }
    };

    const filteredLogs = (logs || []).filter(log => {
        const detailsMatch = log?.details?.toLowerCase().includes(searchTerm.toLowerCase());
        const adminMatch = log?.admin?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        return detailsMatch || adminMatch;
    });

    // ✅ Return only the content. Layout is provided by the parent Route in App.jsx
    return (
        <div className="max-w-7xl mx-auto p-4 space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/admin/dashboard')} className="p-3 bg-white hover:bg-gray-50 rounded-2xl border border-gray-100 transition-all shadow-sm">
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 italic tracking-tight">System Audit Trail<span className="text-indigo-600">.</span></h1>
                        <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Immutable record of Administrative Operations</p>
                    </div>
                </div>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search logs by admin or details..." 
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 outline-none transition shadow-inner bg-gray-50/50 focus:ring-4 focus:ring-indigo-50" 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                </div>
            </header>

            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-50">
                                <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Admin Identity</th>
                                <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Action</th>
                                <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Event Context</th>
                                <th className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Date/IP</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="p-24 text-center">
                                        <Loader2 className="animate-spin mx-auto text-indigo-600 mb-4" size={48} />
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Accessing Ledger Records...</p>
                                    </td>
                                </tr>
                            ) : filteredLogs.map((log) => (
                                <tr key={log._id} className="hover:bg-indigo-50/20 transition-all group">
                                    <td className="p-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center text-xs font-black italic">
                                                {log.admin?.name?.charAt(0) || 'A'}
                                            </div>
                                            <div>
                                                <span className="font-black text-gray-900 text-sm tracking-tight">{log.admin?.name || 'System Admin'}</span>
                                                <p className="text-[10px] text-indigo-600 font-bold uppercase">{log.admin?.role || 'ADMIN'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-8">{getActionBadge(log.action)}</td>
                                    <td className="p-8">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-700 font-bold italic tracking-tight">"{log.details}"</span>
                                            {log.targetId && (
                                                <span className="text-[9px] text-gray-400 mt-2 flex items-center gap-1 font-black bg-gray-50 w-fit px-2 py-0.5 rounded uppercase tracking-widest">
                                                    ID: {log.targetId} <ExternalLink size={10} />
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-8 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className="text-sm font-black text-gray-900 italic">
                                                {log.createdAt ? format(new Date(log.createdAt), 'MMM dd, HH:mm') : 'N/A'}
                                            </span>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1 mt-1 tracking-widest">
                                                <Clock size={12}/> {log.ipAddress || 'Internal'}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {!loading && filteredLogs.length === 0 && (
                    <div className="p-32 text-center flex flex-col items-center">
                        <ClipboardList size={56} className="text-gray-100 mb-6" />
                        <h3 className="text-xl font-black text-gray-900 italic tracking-tight">Ledger Empty</h3>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">No administrative events recorded for this criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}