import React, { useState, useEffect } from "react";
// ✅ FIXED: Using your custom API instance to ensure base URL /api/v1 is included
import api from "../../api/http"; 
import { 
  Briefcase, 
  Users, 
  Plus, 
  Loader2, 
  ChevronRight, 
  AlertCircle 
} from "lucide-react";
import { Link } from "react-router-dom";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        setLoading(true);
        // ✅ FIXED: Changed endpoint to /jobs/client to match your successful Sidebar sync
        const response = await api.get("/jobs/client");
        
        // ✅ FIXED: Data normalization to handle nested response
        const actualJobs = response.data?.data || response.data;
        setJobs(Array.isArray(actualJobs) ? actualJobs : []);
        setError(null);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        // Only show error if it's not a 404 (which just means 0 jobs)
        if (err.response?.status !== 404) {
           setError("Failed to load projects. Please try again.");
        }
        setJobs([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchMyJobs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto pb-20 p-4 animate-in fade-in duration-500">
      {/* Header Section */}
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-gray-900 italic tracking-tight uppercase">
            My Projects<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-gray-500 mt-2 font-black uppercase text-[10px] tracking-widest">Track applications and manage active workflows.</p>
        </div>
        <Link 
          to="/client/post-job" 
          className="flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-5 rounded-[2rem] font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
        >
          <Plus size={18} /> Post New Job
        </Link>
      </header>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
          <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
          <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Fetching your deployments...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-red-50 rounded-[3rem] border border-red-100">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <p className="text-red-900 font-black italic">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 text-[10px] font-black uppercase tracking-widest text-red-600 hover:underline"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {jobs.length > 0 ? jobs.map((job) => (
            <div 
              key={job._id} 
              className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-6">
                <div className={`p-6 rounded-3xl transition-all duration-300 ${
                  job.status === "OPEN" 
                  ? "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white" 
                  : "bg-emerald-50 text-emerald-600"
                }`}>
                  <Briefcase size={32} />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-2xl tracking-tight leading-none mb-3 italic uppercase">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
                    <p className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2">
                      <Users size={14} className="text-indigo-400" /> 
                      {job.applicationsCount || 0} Applicants
                    </p>
                    <p className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                      {job.region === 'KE' ? 'KES' : 'SSP'} {job.budget?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                  job.status === "OPEN" 
                  ? "bg-amber-50 text-amber-600 border-amber-100" 
                  : "bg-emerald-50 text-emerald-600 border-emerald-100"
                }`}>
                  {job.status}
                </span>
                <Link 
                  to={`/client/manage-work/${job._id}`} 
                  className="bg-gray-50 text-gray-900 hover:bg-indigo-600 hover:text-white p-5 rounded-2xl transition-all shadow-sm"
                >
                  <ChevronRight size={24} />
                </Link>
              </div>
            </div>
          )) : (
            <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
              <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-200">
                <Briefcase size={40} />
              </div>
              <p className="text-gray-900 font-black italic text-2xl uppercase tracking-tight">No active projects</p>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-2 mb-10">Your next major collaboration starts here.</p>
              <Link 
                to="/client/post-job" 
                className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-900 transition-all shadow-xl shadow-indigo-100"
              >
                Post Your First Job
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}