import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import API from "../../api/http"; 
import { 
  Users, 
  FileText, 
  CheckCircle, 
  Loader2, 
  Briefcase, 
  ArrowLeft, 
  RefreshCw, 
  AlertTriangle,
  Activity,
  Database,
  ShieldCheck
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [pendingJobs, setPendingJobs] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalJobs: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError(null);

      // ✅ Fetching from live Admin API
      const [statsRes, jobsRes] = await Promise.all([
        API.get("/admin/stats"),
        API.get("/jobs") 
      ]);

      const s = statsRes.data.data;
      setStats({ 
        totalUsers: (s.totalStudents || 0) + (s.totalClients || 0), 
        totalJobs: s.activeJobs || 0 
      });

      const allJobs = jobsRes.data.data || [];
      const pending = allJobs.filter(job => 
        job.status === "PENDING" || job.paymentStatus === "UNPAID"
      );
      setPendingJobs(pending);

    } catch (err) {
      console.error("Admin Data Error:", err);
      const msg = err.response?.status === 403 
        ? "Access Denied: Administrative privileges required for this section."
        : "Sync Error: The administration gateway is currently unreachable.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchAdminData(); 
  }, []);

  const handleApprove = async (jobId) => {
    if(!window.confirm("Approve this project for public listing?")) return;
    try {
      await API.patch(`/jobs/${jobId}`, { status: "APPROVED" });
      setPendingJobs(prev => prev.filter(job => job._id !== jobId));
      fetchAdminData();
    } catch (err) {
      alert("Error: Could not approve job.");
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Authorizing Admin Session...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-3 bg-white hover:bg-gray-50 rounded-2xl border border-gray-100 transition-all shadow-sm">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-gray-900 italic tracking-tight underline decoration-indigo-500/20">Control Panel<span className="text-indigo-600">.</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Management & Oversight Portal</p>
          </div>
        </div>
        
        {/* ✅ System Health Indicator */}
        <div className="flex items-center gap-6 px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2">
             <div className={`w-2 h-2 rounded-full ${!error ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
             <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">API: <span className={!error ? 'text-emerald-600' : 'text-rose-600'}>{!error ? 'Operational' : 'Blocked'}</span></p>
          </div>
          <div className="w-[1px] h-4 bg-gray-100" />
          <div className="flex items-center gap-2">
             <Database size={12} className="text-indigo-500" />
             <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 italic">DB: Connected</p>
          </div>
          <button onClick={fetchAdminData} className="ml-2 p-1.5 hover:bg-gray-50 rounded-lg transition-colors">
            <RefreshCw size={14} className="text-gray-400" />
          </button>
        </div>
      </header>

      {/* Error Alert Bar */}
      {error && (
        <div className="p-6 bg-rose-50 border border-rose-100 rounded-[2rem] flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <AlertTriangle className="text-rose-600 shrink-0" size={24} />
          <div>
            <p className="text-rose-600 text-[10px] font-black uppercase tracking-widest leading-none">Permission Conflict Identified</p>
            <p className="text-rose-900 font-bold text-sm mt-1">{error}</p>
            <p className="text-[9px] text-rose-500 font-black uppercase tracking-widest mt-2 bg-white/50 px-2 py-1 rounded-md w-fit italic">Action: Re-authentication Required</p>
          </div>
        </div>
      )}

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex items-center gap-6 shadow-sm hover:shadow-md transition-all group">
          <div className="w-16 h-16 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            <Users size={32}/>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Platform Users</p>
            <p className="text-4xl font-black text-gray-900 italic tracking-tighter">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex items-center gap-6 shadow-sm hover:shadow-md transition-all group">
          <div className="w-16 h-16 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
            <Briefcase size={32}/>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Global Listings</p>
            <p className="text-4xl font-black text-gray-900 italic tracking-tighter">{stats.totalJobs}</p>
          </div>
        </div>
      </div>

      {/* Queue Table */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-indigo-100/5 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/20">
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-orange-500" />
            <h2 className="text-xl font-black text-gray-900 tracking-tight italic">Approval Pipeline</h2>
          </div>
          <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-xl">
             <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
             <span className="text-orange-700 text-[10px] font-black uppercase tracking-widest">
               {pendingJobs.length} Items Pending
             </span>
          </div>
        </div>

        {pendingJobs.length > 0 ? (
           <div className="divide-y divide-gray-50">
             {pendingJobs.map(job => (
               <div key={job._id} className="p-8 flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-indigo-50/10 transition-colors">
                  <div className="flex gap-5">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 border border-gray-100">
                      <FileText size={24}/>
                    </div>
                    <div className="text-left">
                      <h3 className="font-black text-gray-900 text-lg tracking-tight uppercase italic">{job.title}</h3>
                      <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1">
                        Client: {job.client?.name || "Member User"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="text-right hidden sm:block">
                      <p className="text-lg font-black text-gray-900 italic">
                        {job.budget?.toLocaleString()} <span className="text-[9px] font-black text-gray-400 uppercase">{job.currency || 'SSP'}</span>
                      </p>
                      <p className="text-[9px] text-emerald-600 font-black uppercase tracking-widest italic">Verification Ready</p>
                    </div>
                    <button 
                      onClick={() => handleApprove(job._id)} 
                      className="flex-1 md:flex-none bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 shadow-indigo-200/50"
                    >
                      <CheckCircle size={16}/> Approve Listing
                    </button>
                  </div>
               </div>
             ))}
           </div>
        ) : (
          <div className="p-24 text-center space-y-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto border border-dashed border-gray-200">
              <Activity size={32} className="text-gray-200" />
            </div>
            <div>
               <p className="text-gray-900 font-black italic text-lg tracking-tighter uppercase">No Pending Actions</p>
               <p className="text-gray-400 font-black uppercase tracking-widest text-[9px] mt-1 italic">Platform integrity is at 100%.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}