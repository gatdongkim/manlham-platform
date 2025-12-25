import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import API from "../../api/http"; 
import { Users, FileText, CheckCircle, Loader2, Briefcase, ArrowLeft, RefreshCw, AlertTriangle } from "lucide-react";

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

      // ✅ FIXED: Use your specialized Admin routes
      // We hit '/admin/stats' for the counters and '/admin/users' + '/jobs' for details
      const [statsRes, jobsRes] = await Promise.all([
        API.get("/admin/stats"),
        API.get("/jobs") 
      ]);

      // ✅ Update Stats from admin.controller.js getStats()
      // Note: your controller returns totalStudents, totalClients, activeJobs
      const s = statsRes.data.data;
      setStats({ 
        totalUsers: (s.totalStudents || 0) + (s.totalClients || 0), 
        totalJobs: s.activeJobs || 0 
      });

      // ✅ Filter for pending jobs from the full list
      const allJobs = jobsRes.data.data || [];
      const pending = allJobs.filter(job => 
        job.status === "PENDING" || job.paymentStatus === "UNPAID"
      );
      setPendingJobs(pending);

    } catch (err) {
      console.error("Admin Data Error:", err);
      // If this triggers, your role in MongoDB is likely not "ADMIN"
      setError("Verification Failed: You do not have Administrative Privileges.");
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
      // ✅ Update status to APPROVED so it shows in the Marketplace
      await API.patch(`/jobs/${jobId}`, { status: "APPROVED" });
      setPendingJobs(prev => prev.filter(job => job._id !== jobId));
      // Refresh stats after approval
      fetchAdminData();
    } catch (err) {
      alert("Error: Could not approve job.");
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Syncing Platform Oversight...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
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
        <div className="p-6 bg-rose-50 border border-rose-100 rounded-[2rem] flex items-center gap-4">
          <AlertTriangle className="text-rose-600" size={24} />
          <div>
            <p className="text-rose-600 text-[10px] font-black uppercase tracking-widest">Access Denied</p>
            <p className="text-rose-900 font-bold text-sm">{error}</p>
          </div>
        </div>
      )}

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
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Live Listings</p>
            <p className="text-4xl font-black text-gray-900">{stats.totalJobs}</p>
          </div>
        </div>
      </div>

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
                      <p className="text-lg font-black text-gray-900 italic">
                        <span className="text-[10px] mr-1 opacity-50">SSP</span>
                        {job.budget?.toLocaleString()}
                      </p>
                      <p className="text-[9px] text-emerald-600 font-black uppercase tracking-widest">Verify Payment</p>
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