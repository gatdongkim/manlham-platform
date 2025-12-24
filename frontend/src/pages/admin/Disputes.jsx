import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from "../../api/http";
// ❌ REMOVED: DashboardLayout import
import { 
  ShieldAlert, Scale, ChevronRight, 
  CheckCircle, XCircle, MessageSquare, 
  FileText, Clock, Loader2, ArrowLeft 
} from "lucide-react";

export default function AdminDisputes() {
    const navigate = useNavigate();
    const [disputes, setDisputes] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDisputes = async () => {
        try {
            setLoading(true);
            const { data } = await API.get('/admin/disputes');
            const extractedData = data?.data || (Array.isArray(data) ? data : []);
            setDisputes(extractedData);
        } catch (err) {
            console.error("Fetch error:", err);
            // Mock data for UI development if API fails
            setDisputes([
                { 
                  _id: "1", 
                  title: "Mobile App UI", 
                  disputeReason: "Deliverables do not match the requirements.pdf", 
                  budget: 45000,
                  currency: "SSP",
                  region: "SS",
                  clientName: "Juba Retailers",
                  studentName: "Emmanuel Lado",
                  createdAt: "2025-12-18"
                },
                { 
                    _id: "2", 
                    title: "Backend API", 
                    disputeReason: "Student disappeared after receiving initial milestone.", 
                    budget: 15000,
                    currency: "KES",
                    region: "KE",
                    clientName: "Nairobi Tech Hub",
                    studentName: "Sarah Wanjiku",
                    createdAt: "2025-12-19"
                  }
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDisputes(); }, []);

    const resolveDispute = async (jobId, resolution) => {
        if (!window.confirm(`Finalize ${selectedJob?.currency} disbursement? This cannot be undone.`)) return;
        try {
            await API.post(`/admin/disputes/${jobId}/resolve`, { resolution });
            alert("Funds disbursed successfully.");
            fetchDisputes();
            setSelectedJob(null);
        } catch (err) {
            alert("Server error during disbursement.");
        }
    };

    return (
        // ✅ CHANGED: Wrapped in a standard <div> instead of <DashboardLayout>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[80vh] pb-20">
            <div className="flex-1">
                <header className="mb-8 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/admin/dashboard')} className="p-2 bg-white hover:bg-gray-100 border border-gray-100 rounded-xl transition-all shadow-sm">
                            <ArrowLeft size={20} className="text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic">Mediation <span className="text-indigo-600">Hub.</span></h1>
                            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-1">Mediating {(disputes || []).length} regional escrow conflicts.</p>
                        </div>
                    </div>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-[2.5rem] border border-gray-100">
                        <Loader2 className="animate-spin text-indigo-600 mb-2" size={32} />
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {Array.isArray(disputes) && disputes.length > 0 ? disputes.map(job => (
                            <div key={job._id} onClick={() => setSelectedJob(job)} className={`bg-white p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer ${selectedJob?._id === job._id ? "border-indigo-600 shadow-xl scale-[1.01]" : "border-gray-100 hover:border-gray-200"}`}>
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest text-white ${job.region === 'KE' ? 'bg-blue-600' : 'bg-emerald-600'}`}>{job.region === 'KE' ? '🇰🇪 KENYA' : '🇸🇸 S. SUDAN'}</span>
                                            <span className="text-[9px] text-gray-400 font-black uppercase tracking-tighter">#{job._id?.slice(-6)}</span>
                                        </div>
                                        <h3 className="text-xl font-black text-gray-900 leading-tight italic">{job.title}</h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-gray-900 tracking-tighter italic">{job.currency} {job.budget?.toLocaleString()}</p>
                                        <div className="flex items-center justify-end gap-1 text-orange-500"><Clock size={12} /><span className="text-[9px] font-black uppercase tracking-widest">Escrow Held</span></div>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-between bg-gray-50 p-5 rounded-[1.5rem]">
                                    <div className="flex items-center gap-6">
                                        <div className="text-center"><p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Client</p><p className="text-xs font-bold text-gray-700 mt-1">{job.clientName || 'N/A'}</p></div>
                                        <div className="h-8 w-[1px] bg-gray-200" /><div className="text-center"><p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Student</p><p className="text-xs font-bold text-gray-700 mt-1">{job.studentName || 'N/A'}</p></div>
                                    </div>
                                    <div className="flex items-center gap-2 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em]">Review Case <ChevronRight size={14} /></div>
                                </div>
                            </div>
                        )) : (
                            <div className="p-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
                                <CheckCircle size={48} className="mx-auto text-gray-200 mb-4" />
                                <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Clear Ledger: No active disputes</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Verdict Sidebar */}
            <div className="w-full lg:w-[400px]">
                {selectedJob ? (
                    <div className="bg-gray-900 rounded-[3rem] text-white p-8 sticky top-6 shadow-2xl overflow-hidden border border-white/5 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20"><Scale size={24} /></div>
                                <div><h2 className="text-lg font-black leading-none italic">Admin Verdict</h2><p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mt-2">Final Escrow Settlement</p></div>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10">
                                    <div className="flex items-start gap-3 mb-6">
                                        <MessageSquare size={16} className="text-indigo-400 mt-1" />
                                        <div><p className="text-[9px] font-black text-indigo-300 uppercase tracking-widest">Dispute Reason</p><p className="text-sm text-gray-300 leading-relaxed mt-2 font-medium italic">"{selectedJob.disputeReason}"</p></div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <FileText size={16} className="text-indigo-400 mt-1" />
                                        <div><p className="text-[9px] font-black text-indigo-300 uppercase tracking-widest">Evidence Pack</p><button className="text-[9px] bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/40 px-5 py-2 rounded-full font-black mt-3 transition border border-indigo-500/30 uppercase tracking-widest">View Credentials</button></div>
                                    </div>
                                </div>
                                <div className="pt-4 space-y-3">
                                    <button onClick={() => resolveDispute(selectedJob._id, 'PAY_STUDENT')} className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-600 transition active:scale-95 shadow-lg shadow-emerald-500/20"><CheckCircle size={18} /> Release to Student</button>
                                    <button onClick={() => resolveDispute(selectedJob._id, 'REFUND_CLIENT')} className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-600 transition active:scale-95 shadow-lg shadow-red-500/20"><XCircle size={18} /> Refund Client</button>
                                    <div className="mt-8 p-5 bg-white/5 rounded-2xl border border-white/5">
                                        <p className="text-[8px] text-center text-gray-500 font-black uppercase leading-relaxed tracking-widest">
                                            Funds will be instantly transferred from the Nexus platform to the recipient's {selectedJob.region === 'KE' ? 'M-Pesa' : 'm-Gurush'} wallet.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ShieldAlert className="absolute -right-10 -bottom-10 opacity-5 text-white" size={240} />
                    </div>
                ) : (
                    <div className="bg-white rounded-[3rem] border-4 border-dashed border-gray-100 h-[500px] flex flex-col items-center justify-center text-center p-12">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6"><Scale size={32} className="text-gray-200" /></div>
                        <h3 className="text-gray-900 font-black text-lg italic tracking-tight">Select a Case</h3>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-3 leading-relaxed">
                            Review evidence files and workspace logs before issuing currency disbursement.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}