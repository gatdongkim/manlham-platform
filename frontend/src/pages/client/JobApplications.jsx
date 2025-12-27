import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/http';
import Card from "../../components/Card";
import VerifiedBadge from "../../components/VerifiedBadge";
import { ChevronLeft, User, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';

export default function JobApplications() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ✅ Guard: Prevents errors if jobId is missing in the URL
        if (!jobId || jobId === "undefined") {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch both the specific job details and all its applicants
                const [jobRes, appsRes] = await Promise.all([
                    api.get(`/jobs/${jobId}`),
                    api.get(`/jobs/${jobId}/applications`)
                ]);
                
                // Set data, handling both direct response or nested data objects
                setJob(jobRes.data.data || jobRes.data);
                const appsData = appsRes.data.data || appsRes.data;
                setApplications(Array.isArray(appsData) ? appsData : []);
            } catch (err) {
                console.error("Error fetching project data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [jobId]);

    const handleHire = async (appId) => {
        if (!window.confirm("Are you sure? This will fund the Escrow and notify the student.")) return;
        
        try {
            // ✅ POST to your backend hiring endpoint
            await api.post(`/jobs/hire`, { applicationId: appId, jobId });
            
            alert("Professional hired! Status updated to APPROVED.");
            
            // ✅ REDIRECT: Go directly to the active workspace for this specific job
            // This fixes the "Project workspace unavailable" issue
            navigate(`/client/manage-work/${jobId}`);
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Hiring failed. Ensure your wallet has sufficient funds.";
            alert(errorMsg);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
                <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest animate-pulse">
                    Scanning Applicants...
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 pb-20">
            {/* Navigation back to main list */}
            <button 
                onClick={() => navigate('/client/jobs')}
                className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-8 hover:text-indigo-600 transition group"
            >
                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                Back to My Projects
            </button>

            {/* Project Header Info */}
            <div className="mb-10">
                <h1 className="text-4xl font-black text-gray-900 italic tracking-tight">
                    {job?.title || "Project Details"}<span className="text-indigo-600">.</span>
                </h1>
                <div className="flex items-center gap-4 mt-3">
                    <p className="bg-indigo-50 text-indigo-600 font-black uppercase text-[10px] tracking-[0.2em] px-3 py-1 rounded-lg">
                        {applications.length} TOTAL APPLICATIONS
                    </p>
                    <span className="text-gray-300">|</span>
                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-tighter">Project ID: {jobId}</p>
                </div>
            </div>

            {/* Applications List */}
            <div className="grid grid-cols-1 gap-6">
                {applications.length > 0 ? applications.map(app => (
                    <Card key={app._id} variant={app.student?.isVetted ? "primary" : "default"}>
                        <div className="flex flex-col md:flex-row justify-between gap-8 p-2">
                            {/* Applicant Identity & Proposal */}
                            <div className="flex gap-6">
                                <div className="relative">
                                    <div className="w-20 h-20 rounded-[2rem] bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-2xl shadow-inner border border-indigo-100">
                                        {app.student?.name?.charAt(0)}
                                    </div>
                                    {app.student?.isVetted && (
                                        <div className="absolute -top-2 -right-2">
                                            <VerifiedBadge isVetted={true} size={24} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none mb-2">
                                        {app.student?.name}
                                    </h3>
                                    <div className="flex items-center gap-2 mb-4">
                                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded inline-block border border-emerald-100">
                                            Proposed Bid: SSP {app.bidAmount?.toLocaleString()}
                                        </p>
                                    </div>
                                    
                                    <div className="mt-4">
                                        <p className="font-black text-gray-400 text-[9px] uppercase tracking-widest mb-2 italic">Student's Proposal</p>
                                        <p className="text-gray-600 text-sm max-w-xl leading-relaxed font-medium">
                                            {app.proposal || "No proposal text provided."}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Hiring Actions */}
                            <div className="flex flex-col gap-3 md:min-w-[220px] justify-center">
                                <button 
                                    onClick={() => handleHire(app._id)}
                                    className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <CheckCircle size={16} /> Hire Professional
                                </button>
                                <button 
                                    onClick={() => navigate(`/client/chats/${app.student?._id || app.student}`)}
                                    className="w-full bg-white border border-gray-100 text-gray-900 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-50 transition flex items-center justify-center gap-2 shadow-sm"
                                >
                                    <MessageSquare size={16} /> Start Chat
                                </button>
                            </div>
                        </div>
                    </Card>
                )) : (
                    <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
                         <User size={60} className="mx-auto text-gray-100 mb-4" />
                         <p className="text-gray-400 font-black italic uppercase tracking-widest text-xs">Waiting for the right talent to apply...</p>
                         <p className="text-[10px] text-gray-300 uppercase mt-2 tracking-tighter">Your project is currently visible in the professional marketplace</p>
                    </div>
                )}
            </div>
        </div>
    );
}