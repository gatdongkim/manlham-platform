import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { 
  Upload, CheckCircle2, Clock, ShieldCheck, 
  FileText, Download, Wallet, Activity, Loader2 
} from 'lucide-react';

// ✅ 1. FIXED API IMPORT (Needs to go up two levels to reach src/)
import api from '../../api/http'; 
import { useAuth } from '../../contexts/AuthContext';

// ✅ 2. FIXED COMPONENT IMPORTS (Needs to go up two levels)
import DashboardLayout from "../../components/DashboardLayout";
import Card from "../../components/Card";
import BackButton from "../../components/BackButton";
import SocialLinks from "../../components/SocialLinks";

const Workspace = () => {
  const { jobId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [job, setJob] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const { data } = await api.get(`/jobs/${jobId}`);
        setJob(data);
      } catch (err) {
        console.error("Error fetching job details:", err);
      } finally {
        setLoading(false);
      }
    };
    if (jobId) fetchJobDetails();
  }, [jobId]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");
    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post(`/jobs/${jobId}/submit`, formData);
      alert("Work submitted successfully!");
      window.location.reload();
    } catch (err) {
      alert("Submission failed.");
    }
  };

  const handleApprove = async () => {
    if (!window.confirm("Approve work and release funds from Escrow?")) return;
    try {
      await api.post(`/jobs/${jobId}/approve`);
      alert("Funds released! Project completed.");
      window.location.reload();
    } catch (err) {
      alert("Approval failed.");
    }
  };

  if (loading) return (
    <DashboardLayout role={user?.role}>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
        <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-xs">Syncing Nexus Workspace...</p>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout role={user?.role}>
      <div className="max-w-7xl mx-auto space-y-8 pb-20">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{user?.role} Workspace</span>
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-none">
              {job?.title} <span className="text-indigo-300 italic">#{jobId?.slice(-4)}</span>
            </h1>
            <div className="flex flex-wrap items-center gap-6 mt-4 text-sm font-bold text-gray-400">
              <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-indigo-400"/> Client: {job?.client?.name || 'Nexus MSME'}</span>
              <span className="flex items-center gap-2"><Clock size={16} className="text-indigo-400"/> Started: {job?.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'N/A'}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <SocialLinks variant="default" />
          </div>
        </div>

        <div className="mb-4">
          <BackButton text="Back to Projects" />
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Scope & Milestones */}
          <div className="lg:col-span-2 space-y-8">
            <Card title="Project Scope" subtitle="Instructions">
              <p className="text-gray-600 font-medium leading-relaxed">
                {job?.description || "Refer to the project brief for specific requirements and technical constraints."}
              </p>
              <div className="mt-6 flex gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl text-gray-500 border border-gray-100">
                  <FileText size={14} />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Requirements.pdf</span>
                </div>
              </div>
            </Card>

            <Card title="Milestones" subtitle="Phase Tracking">
              <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white ring-4 ring-white"><CheckCircle2 size={14}/></div>
                  <div><h4 className="text-sm font-black text-gray-900 leading-none">Phase 1: Setup</h4><p className="text-[10px] font-bold text-emerald-600 uppercase mt-1">Completed</p></div>
                </div>
                <div className="relative pl-10">
                  <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center text-white ring-4 ring-white ${job?.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-indigo-600 animate-pulse'}`}>
                    {job?.status === 'COMPLETED' ? <CheckCircle2 size={14}/> : <Activity size={14}/>}
                  </div>
                  <div><h4 className="text-sm font-black text-gray-900 leading-none">Phase 2: Execution</h4><p className="text-[10px] font-bold text-indigo-500 uppercase mt-1">{job?.status === 'COMPLETED' ? 'Finished' : 'In Progress'}</p></div>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN: Escrow & Actions */}
          <div className="space-y-8">
            <Card variant="primary">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-100"><ShieldCheck size={20}/></div>
                <div><h3 className="text-sm font-black text-gray-900 leading-none">Nexus Escrow</h3><p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1">Payment Protected</p></div>
              </div>

              <div className="bg-indigo-600 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl shadow-indigo-100/50">
                <div className="relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Locked Funds</p>
                  <h4 className="text-3xl font-black italic tracking-tighter">
                    <span className="text-sm font-bold opacity-50 mr-1 not-italic">SSP</span>
                    {job?.budget?.toLocaleString()}
                  </h4>
                </div>
                <Wallet className="absolute -right-2 -bottom-2 opacity-10" size={100} />
              </div>

              <p className="text-[11px] text-gray-400 font-medium mt-6 leading-relaxed">
                Funds are held securely by Manlham Tech Support and released only upon client approval of deliverables.
              </p>
            </Card>

            {/* ✅ UPDATED ROLE CHECKS BELOW: 'PRO' instead of 'student', 'MSME' instead of 'client' */}
            <Card title={user?.role === 'PRO' ? "Deliver Work" : "Review Deliverables"}>
              <div className="mt-2 space-y-4">
                
                {/* PRO (STUDENT) ACTIONS */}
                {user?.role === 'PRO' && job?.status === 'IN_PROGRESS' && (
                  <>
                    <input type="file" id="file-upload" onChange={(e) => setFile(e.target.files[0])} className="hidden" />
                    <label htmlFor="file-upload" className="flex flex-col items-center justify-center gap-3 w-full py-8 border-2 border-dashed border-gray-100 rounded-3xl cursor-pointer hover:bg-gray-50 transition-all group">
                        <Upload size={20} className="text-indigo-600 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-black uppercase text-gray-400">{file ? file.name : "Choose Deliverables"}</span>
                    </label>
                    <button onClick={handleUpload} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-indigo-600 transition-all">Submit to Client</button>
                  </>
                )}

                {/* MSME (CLIENT) ACTIONS */}
                {user?.role === 'MSME' && job?.status === 'UNDER_REVIEW' && (
                  <>
                    <p className="text-xs font-medium text-gray-500 mb-2">Review student's submission below:</p>
                    <a href={`${process.env.REACT_APP_API_URL}${job?.deliverableUrl}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:bg-white transition">
                      <Download size={14} /> Download Work
                    </a>
                    <button onClick={handleApprove} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition">Approve & Release SSP {job?.budget}</button>
                  </>
                )}

                {/* COMPLETED STATUS */}
                {job?.status === 'COMPLETED' && (
                  <div className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 flex flex-col items-center text-center">
                    <CheckCircle2 size={32} className="text-emerald-600 mb-3" />
                    <p className="text-xs font-black text-emerald-900 uppercase">Project Finished</p>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase mt-1">Funds released to student</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Workspace;