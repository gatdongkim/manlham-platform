import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import API from "../../api/http"; 
import { 
  PlusCircle, Briefcase, Wallet, ArrowUpRight, Clock, 
  Loader2, ShieldCheck, X, ArrowLeft, Zap, Users, TrendingUp 
} from "lucide-react"; 

export default function ClientDashboard() {
  const navigate = useNavigate(); 
  const [stats, setStats] = useState({
    activeJobs: 0,
    pendingBids: 0, 
    completedJobs: 0,
    totalSpent: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEscrowInfo, setShowEscrowInfo] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // ✅ Fix 1: Fetch Stats - Using the standard jobs/client-stats route
        const statsRes = await API.get('/jobs/client-stats');
        // Robust data mapping to handle various API response formats
        const statsData = statsRes.data?.data || statsRes.data;
        if (statsData) {
          setStats({
            activeJobs: statsData.activeJobs || 0,
            pendingBids: statsData.pendingBids || 0,
            completedJobs: statsData.completedJobs || 0,
            totalSpent: statsData.totalSpent || 0
          });
        }

        // ✅ Fix 2: Fetch Recent Jobs - Aligned with the verified /jobs/client route
        const jobsRes = await API.get('/jobs/client');
        const jobsList = jobsRes.data?.data || jobsRes.data || [];
        setRecentJobs(Array.isArray(jobsList) ? jobsList.slice(0, 5) : []);
        
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Synchronizing Business Data</p>
      </div>
    );
  }

  const statCards = [
    { label: "Active Gigs", value: stats.activeJobs, icon: Zap, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Incoming Bids", value: stats.pendingBids, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Completed", value: stats.completedJobs, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Total Volume", value: `SSP ${stats.totalSpent?.toLocaleString() || 0}`, icon: Wallet, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-20 p-4">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
             <span className="bg-indigo-600 text-white text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">Client Console</span>
          </div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight italic uppercase">
            Business Hub<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em]">Manage your project milestones & verified talent</p>
        </div>
        
        <Link 
          to="/client/post-job" 
          className="flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl shadow-gray-200 active:scale-95"
        >
          <PlusCircle size={18} /> Deploy New Project
        </Link>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} strokeWidth={2.5} />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">{stat.label}</p>
            <h3 className="text-3xl font-black text-gray-900 mt-2 tracking-tighter italic">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <h2 className="font-black text-gray-900 uppercase text-xs tracking-widest italic">Live Opportunities</h2>
              <Link to="/client/jobs" className="text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all">View All Activity</Link>
            </div>
            
            <div className="divide-y divide-gray-50">
              {recentJobs.length > 0 ? (
                recentJobs.map((job) => (
                  <div key={job._id} className="p-8 flex items-center justify-between hover:bg-indigo-50/30 transition group">
                    <div className="flex items-center gap-6">
                      <div className="bg-white p-4 rounded-2xl shadow-sm text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <Briefcase size={22} />
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 text-lg italic tracking-tight uppercase">{job.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter ${
                            job.status === 'OPEN' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {job.status}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase">• {job.paymentStatus || 'UNPAID'}</span>
                        </div>
                      </div>
                    </div>
                    {/* ✅ Ensures clicking the project leads to the correct applications view */}
                    <Link to={`/client/applications/${job._id}`} className="bg-white p-3 rounded-xl border border-gray-100 text-gray-400 hover:text-indigo-600 hover:shadow-md transition-all">
                      <ArrowUpRight size={20} />
                    </Link>
                  </div>
                ))
              ) : (
                <div className="p-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                     <TrendingUp size={32} />
                  </div>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">No Active Deployments Found</p>
                  <button onClick={() => navigate('/client/post-job')} className="text-indigo-600 font-black text-xs uppercase underline">Post your first gig</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-gray-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-600 rounded-full blur-[40px] opacity-30"></div>
            <h3 className="font-black text-xl italic tracking-tight mb-4 uppercase">Escrow Protocol<span className="text-indigo-500">.</span></h3>
            <p className="text-gray-400 text-xs font-medium leading-relaxed mb-8">
              SkillLink protects your capital. Funds are released only after you verify and approve project deliverables.
            </p>
            <button 
              onClick={() => setShowEscrowInfo(true)}
              className="w-full bg-white/10 border border-white/10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck size={14} className="text-indigo-400" /> Security Audit
            </button>
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
            <h3 className="font-black text-gray-900 uppercase text-[10px] tracking-widest mb-6">Operations</h3>
            <div className="space-y-3">
              <Link to="/marketplace" className="flex items-center justify-between p-5 bg-gray-50 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-indigo-600 hover:text-white transition-all group">
                Professional Marketplace <ArrowUpRight size={16} className="text-indigo-400 group-hover:text-white" />
              </Link>
              <Link to="/client/chats" className="flex items-center justify-between p-5 bg-gray-50 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-indigo-600 hover:text-white transition-all group">
                Active Discussions <ArrowUpRight size={16} className="text-indigo-400 group-hover:text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showEscrowInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md">
          <div className="bg-white rounded-[3.5rem] max-w-lg w-full p-12 shadow-2xl animate-in fade-in zoom-in duration-300 relative border border-indigo-100">
            <button onClick={() => setShowEscrowInfo(false)} className="absolute right-8 top-8 p-3 hover:bg-gray-100 rounded-full transition-all">
              <X size={20} className="text-gray-400" />
            </button>
            <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center text-indigo-600 mb-8">
              <ShieldCheck size={40} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4 italic uppercase tracking-tight">Escrow Security<span className="text-indigo-600">.</span></h2>
            <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8">
              Your payments are decentralized and secure. Funds never leave the Manlham Tech Support vault without your digital signature.
            </p>
            <button 
              onClick={() => setShowEscrowInfo(false)}
              className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-indigo-600 transition-all active:scale-95"
            >
              Verify Protocol
            </button>
          </div>
        </div>
      )}
    </div>
  );
}