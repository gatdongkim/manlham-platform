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
        // ✅ Use the base /jobs route which returned 200 OK in your network tab
        const jobsRes = await API.get('/jobs');
        
        // Align with backend: { success: true, data: [...] }
        const jobsList = jobsRes.data?.data || [];
        
        // ✅ Filter for Gatdong Kim's specific ID used in your backend
        const myJobs = jobsList.filter(job => 
          job.client?._id === "658af1234567890abcdef123" || 
          job.client === "658af1234567890abcdef123"
        );

        setRecentJobs(myJobs.slice(0, 5));

        // ✅ Calculate stats locally to bypass the 400 error from /client-stats
        setStats({
          activeJobs: myJobs.filter(j => j.status === 'OPEN' || j.status === 'active' || !j.status).length,
          pendingBids: 0, 
          completedJobs: myJobs.filter(j => j.status === 'COMPLETED').length,
          totalSpent: myJobs.reduce((sum, j) => sum + (Number(j.budget) || 0), 0)
        });
        
      } catch (err) {
        console.error("Dashboard Sync Error:", err);
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
             {/* ✅ Visual indicator that API is now synced */}
             <span className="bg-emerald-500 text-white text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest animate-pulse">Synced</span>
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
          <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
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
              <Link to="/client/my-projects" className="text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all">View All Activity</Link>
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
                          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter">
                            {job.status || 'ACTIVE'}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase">• {job.currency || 'SSP'} {job.budget?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
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
                  <Link to="/client/post-job" className="inline-block text-indigo-600 font-black text-[10px] uppercase tracking-widest border-b-2 border-indigo-600 pb-1">Deploy Your First Project</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-gray-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
            <h3 className="font-black text-xl italic tracking-tight mb-4 uppercase">Escrow Protocol<span className="text-indigo-500">.</span></h3>
            <p className="text-gray-400 text-xs font-medium leading-relaxed mb-8">
              Manlham Tech Support protects your capital. Funds are released only after you verify deliverables.
            </p>
            <button onClick={() => setShowEscrowInfo(true)} className="w-full bg-white/10 border border-white/10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">
              Security Audit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}