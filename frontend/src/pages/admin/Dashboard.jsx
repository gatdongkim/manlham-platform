import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import API from "../../api/http"; 
// ❌ Removed DashboardLayout import to prevent layout nesting
import { Users, FileText, CheckCircle, Loader2, Briefcase, ArrowLeft, RefreshCw } from "lucide-react";

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

      // ✅ Fetch platform-wide data
      const [jobsRes, usersRes] = await Promise.all([
        API.get("/jobs"),
        API.get("/users") 
      ]);

      const allJobs = jobsRes.data.data || jobsRes.data || [];
      const allUsers = usersRes.data.data || usersRes.data || [];

      // Filter for jobs that need attention
      const pending = allJobs.filter(job => 
        job.status === "PENDING" || job.paymentStatus === "UNPAID"
      );

      setPendingJobs(pending);
      setStats({ 
        totalJobs: allJobs.length, 
        totalUsers: allUsers.length 
      });

    } catch (err) {
      console.error("Admin Data Error:", err);
      setError("Failed to load administration data. Verify you have Admin privileges.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchAdminData(); 
  }, []);

  const handleApprove = async (jobId) => {
    try {
      await API.patch(`/jobs/${jobId}`, { status: "APPROVED", paymentStatus: "PAID" });
      setPendingJobs(prev => prev.filter(job => job._id !== jobId));
      alert("Job approved and moved to live listings!");
    } catch (err) {
      alert("Error: Could not approve job.");
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60-screen]">
      <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Securing Admin Session...</p>
    </div>
  );

  // ✅ Return only the content. Layout is provided by the parent Route in App.jsx
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-3 bg-white hover:bg-gray-50 rounded-2xl border border-gray-100 transition-all shadow-sm">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-gray-900 italic tracking-tight">Admin Control Panel<span className="text-indigo-600">.</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Management & Oversight Portal</p>
          </div>
        </div>
        <button onClick={fetchAdminData} className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-100 transition-all">
          <RefreshCw size={20} />
        </button>
      </header>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-2xl text-center">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex items-center gap-6 shadow-sm hover:shadow-md transition-all">
          <div className="w-16 h-16 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600">
            <Users size={32}/>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Platform Users</p>
            <p className="text-4xl font-black text-gray-900">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex items-center gap-6 shadow-sm hover:shadow-md transition-all">
          <div className="w-16 h-16 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600">
            <Briefcase size={32}/>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Global Listings</p>
            <p className="text-4xl font-black text-gray-900">{stats.totalJobs}</p>
          </div>
        </div>
      </div>

      {/* Queue Table */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-indigo-100/10 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse" />
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Pending Approval Queue</h2>
          </div>
          <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
            {pendingJobs.length} Review Needed
          </span>
        </div>

        {pendingJobs.length > 0 ? (
           <div className="divide-y divide-gray-50">
             {pendingJobs.map(job => (
               <div key={job._id} className="p-8 flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-indigo-50/10 transition-colors">
                  <div className="flex gap-5">
                    <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 border border-gray-200">
                      <FileText size={24}/>
                    </div>
                    <div className="text-left">
                      <h3 className="font-black text-gray-900 text-lg tracking-tight">{job.title}</h3>
                      <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mt-1">
                        By {job.client?.name || "Member User"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="text-right hidden sm:block">
                      <p className="text-lg font-black text-gray-900">
                        {job.budget?.toLocaleString()} <span className="text-sm font-bold text-gray-400">{job.currency || 'USD'}</span>
                      </p>
                      <p className="text-[9px] text-emerald-600 font-black uppercase tracking-widest">Escrow Ready</p>
                    </div>
                    <button 
                      onClick={() => handleApprove(job._id)} 
                      className="flex-1 md:flex-none bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
                    >
                      <CheckCircle size={16}/> Approve & Go Live
                    </button>
                  </div>
               </div>
             ))}
           </div>
        ) : (
          <div className="p-24 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-gray-200" />
            </div>
            <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Everything is up to date.</p>
          </div>
        )}
      </div>
    </div>
  );
}