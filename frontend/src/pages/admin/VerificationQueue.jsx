import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from "../../api/http";
// ❌ Removed DashboardLayout import to prevent double sidebars
import { ShieldCheck, XCircle, ExternalLink, User, FileText, Loader2, ArrowLeft } from 'lucide-react';

const VerificationQueue = () => {
    const navigate = useNavigate();
    const [queue, setQueue] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchQueue = async () => {
        try {
            setLoading(true);
            const { data } = await API.get('/admin/verification-queue');
            // Support different API response structures
            setQueue(data.data || data || []); 
            setError(null);
        } catch (error) {
            console.error("Queue Fetch Error:", error);
            setError("Could not load verification requests.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchQueue(); }, []);

    const handleVet = async (id, status) => {
        try {
            // ✅ Updates backend: PATCH /api/admin/vet-professional/:id
            await API.patch(`/admin/vet-professional/${id}`, { status });
            // Remove from local list immediately for a snappy UI
            setQueue(prev => prev.filter(pro => pro._id !== id));
        } catch (error) {
            alert("Vetting action failed. Please check admin permissions.");
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
            <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Syncing Security Queue...</p>
        </div>
    );

    // ✅ Return only the inner content as the Layout is provided by the parent Route
    return (
        <div className="p-4 max-w-6xl mx-auto space-y-8">
            <header className="flex items-center gap-6">
                <button 
                    onClick={() => navigate('/admin/dashboard')} 
                    className="p-3 bg-white hover:bg-gray-50 rounded-2xl border border-gray-100 transition-all shadow-sm"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <div>
                    <h1 className="text-4xl font-black text-gray-900 italic">Verification Queue<span className="text-indigo-600">.</span></h1>
                    <p className="text-gray-500 font-semibold mt-1">Review and approve professional identities for the marketplace.</p>
                </div>
            </header>

            {error && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-2xl text-center">
                    {error}
                </div>
            )}

            <div className="grid gap-6">
                {!queue || queue.length === 0 ? (
                    <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-gray-100">
                        <ShieldCheck className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">All candidates have been processed</p>
                    </div>
                ) : (
                    queue.map((pro) => (
                        <div key={pro._id} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 hover:shadow-md transition-all">
                            <div className="flex gap-6">
                                <div className="h-16 w-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0 border border-indigo-100 font-black text-xl">
                                    {pro.user?.name ? pro.user.name.charAt(0) : <User size={28} />}
                                </div>
                                <div>
                                    <h3 className="font-black text-gray-900 text-xl tracking-tight italic">{pro.user?.name || "Unnamed Professional"}</h3>
                                    <p className="text-sm font-bold text-gray-400">{pro.user?.email}</p>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {pro.skills && pro.skills.map(skill => (
                                            <span key={skill} className="text-[9px] bg-gray-50 text-gray-500 px-3 py-1 rounded-lg font-black uppercase tracking-wider border border-gray-100">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 w-full lg:w-auto pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-gray-50 lg:pl-8">
                                <a 
                                    href={pro.verificationDocs} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 px-6 py-4 rounded-2xl transition border border-transparent hover:border-indigo-100"
                                >
                                    <FileText size={16} /> ID Paper <ExternalLink size={12} />
                                </a>
                                
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => handleVet(pro._id, false)} 
                                        className="p-4 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                                        title="Reject"
                                    >
                                        <XCircle size={24} />
                                    </button>
                                    <button 
                                        onClick={() => handleVet(pro._id, true)} 
                                        className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-xl active:scale-95"
                                    >
                                        <ShieldCheck size={18} /> Approve
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default VerificationQueue;