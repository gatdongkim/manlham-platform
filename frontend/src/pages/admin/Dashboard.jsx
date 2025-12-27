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

      // ✅ FETCHING: Stats and Jobs using the synchronized API instance
      const [statsRes, jobsRes] = await Promise.all([
        API.get("/admin/stats"),
        API.get("/jobs") 
      ]);

      const s = statsRes.data.data || {};
      setStats({ 
        totalUsers: (s.totalStudents || 0) + (s.totalClients || 0), 
        totalJobs: s.activeJobs || 0 
      });

      const allJobs = jobsRes.data.data || [];
      // ✅ FILTERING: Extracting jobs caught in the Approval Pipeline
      const pending = allJobs.filter(job => 
        job.status === "PENDING" || job.paymentStatus === "UNPAID"
      );
      setPendingJobs(pending);

    } catch (err) {
      console.error("Admin Data Error:", err);
      const msg = err.response?.status === 403 
        ? "Access Denied: Administrative privileges required."
        : "Sync Error: The administration gateway is currently unreachable.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchAdminData(); 
  }, []);

  // ✅ FIXED: Optimized handleApprove to target the administrative route
  const handleApprove = async (jobId) => {
    if(!jobId) return;
    if(!window.confirm("Approve this project for public listing?")) return;

    try {
      // ✅ CHANGE: Using the /admin prefix to ensure high-level authorization
      // This matches the "Super Admin" context
      await API.patch(`/admin/jobs/${jobId}/approve`, { 
        status: "APPROVED",
        isLive: true 
      });

      // Update Local State
      setPendingJobs(prev => prev.filter(job => job._id !== jobId));
      alert("Success: Project deployment authorized."); 
      fetchAdminData();
    } catch (err) {
      console.error("Approval Error:", err.response?.data);
      // ✅ DYNAMIC ERROR: Showing the actual backend message if available
      const errorMessage = err.response?.data?.message || "Could not approve job.";
      alert(`Error: ${errorMessage}`);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Authorizing Admin Session...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/client/dashboard')} className="p-3 bg-white hover:bg-gray-50 rounded-2xl border border-gray-100 transition-all shadow-sm">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-gray-900 italic tracking-tight uppercase">Control Panel<span className="text-indigo-600">.</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Management & Oversight Portal</p>
          </div>
        </div>
        
        {/* System Health Indicator */}
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

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex items-center gap-6 shadow-sm hover:shadow-xl transition-all group">
          <div className="w-16 h-16 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
            <Users size={32}/>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Platform Users</p>
            <p className="text-4xl font-black text-gray-900 italic tracking-tighter">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex items-center gap-6 shadow-sm hover:shadow-xl transition-all group">
          <div className="w-16 h-16 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
            <Briefcase size={32}/>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Global Listings</p>
            <p className="text-4xl font-black text-gray-900 italic tracking-tighter">{stats.totalJobs}</p>
          </div>
        </div>
      </div>

      {/* Approval Pipeline Table */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/20">
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-orange-500" />
            <h2 className="text-xl font-black text-gray-900 tracking-tight italic uppercase">Approval Pipeline</h2>
          </div>
          <div className="bg-orange-50 px-4 py-2 rounded-xl">
             <span className="text-orange-700 text-[10px] font-black uppercase tracking-widest">
               {pendingJobs.length} Items Pending
             </span>
          </div>
        </div>

        {pendingJobs.length > 0 ? (
           <div className="divide-y divide-gray-50">
             {pendingJobs.map(job => (
               <div key={job._id} className="p-8 flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-gray-50 transition-colors">
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
                    {/* APPROVE ACTION */}
                    <button 
                      onClick={() => handleApprove(job._id)} 
                      className="flex-1 md:flex-none bg-gray-900 text-white px-8 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95"
                    >
                      <CheckCircle size={16}/> Approve Listing
                    </button>
                  </div>
               </div>
             ))}
           </div>
        ) : (
          <div className="p-24 text-center">
            <Activity size={48} className="mx-auto text-gray-100 mb-6" />
            <p className="text-gray-900 font-black italic text-lg uppercase">Pipeline Clear</p>
            <p className="text-gray-400 font-black uppercase tracking-widest text-[9px] mt-1 italic">Platform integrity is at 100%.</p>
          </div>
        )}
      </div>
    </div>
  );
}