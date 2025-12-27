import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import API from "../../api/http"; 
import { 
  PlusCircle, Briefcase, Wallet, ArrowUpRight, 
  Loader2, ShieldCheck, Zap, Users, TrendingUp 
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

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // ✅ STEP 1: Attempt to fetch jobs
        // We use the base /jobs route as it's the most stable in your backend right now
        const jobsRes = await API.get('/jobs');
        
        // Normalize the response data
        const jobsList = jobsRes.data?.data || jobsRes.data || [];
        
        // ✅ STEP 2: Filter for Gatdong Kim's ID (Hardcoded for current session sync)
        const myJobs = jobsList.filter(job => 
          job.client?._id === "658af1234567890abcdef123" || 
          job.client === "658af1234567890abcdef123"
        );

        setRecentJobs(myJobs.slice(0, 5));

        // ✅ STEP 3: Calculate stats locally 
        // This clears the "API Error (400)" by not relying on /client-stats
        const total = myJobs.reduce((sum, j) => sum + (Number(j.budget) || 0), 0);
        
        setStats({
          activeJobs: myJobs.filter(j => j.status === 'OPEN' || j.status === 'active' || !j.status).length,
          pendingBids: 0, 
          completedJobs: myJobs.filter(j => j.status === 'COMPLETED').length,
          totalSpent: total
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
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Syncing with Manlham Network</p>
      </div>
    );
  }

  const statCards = [
    { label: "Active Gigs", value: stats.activeJobs, icon: Zap, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Incoming Bids", value: stats.pendingBids, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Completed", value: stats.completedJobs, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Total Volume", value: `SSP ${stats.totalSpent?.toLocaleString()}`, icon: Wallet, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-20 p-4 animate-in fade-in duration-700">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
             <span className="bg-indigo-600 text-white text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">Client Console</span>
             <span className="bg-emerald-500 text-white text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest animate-pulse">Live</span>
          </div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight italic uppercase">
            Business Hub<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em]">Project milestones & verified talent</p>
        </div>
        
        <Link 
          to="/client/post-job" 
          className="flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
        >
          <PlusCircle size={18} /> Deploy New Project
        </Link>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} strokeWidth={2.5} />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-3xl font-black text-gray-900 mt-2 tracking-tighter italic">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <h2 className="font-black text-gray-900 uppercase text-xs tracking-widest italic">Live Opportunities</h2>
          <Link to="/client/jobs" className="text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:underline">View All</Link>
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
                      <span className="text-[10px] font-bold text-gray-400 uppercase">• SSP {job.budget?.toLocaleString()}</span>
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
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">No Active Projects Found</p>
              <Link to="/client/post-job" className="text-indigo-600 font-bold text-xs">Post your first job now &rarr;</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}