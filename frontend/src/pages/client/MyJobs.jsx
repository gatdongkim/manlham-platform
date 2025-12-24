import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Briefcase, 
  Users, 
  Plus, 
  Loader2, // ✅ FIXED: Added missing import
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
        // Ensure this matches your backend route exactly
        const response = await axios.get("/api/v1/jobs/my-jobs");
        const actualJobs = response.data.data || response.data;
        setJobs(Array.isArray(actualJobs) ? actualJobs : []);
        setError(null);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load projects. Please check if the server is running.");
        setJobs([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchMyJobs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 italic tracking-tight">
            My Projects<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Track applications and manage active workflows.</p>
        </div>
        <Link 
          to="/client/post-job" 
          className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-gray-200 active:scale-95"
        >
          <Plus size={18} /> Post New Job
        </Link>
      </header>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
          <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
          <p className="text-gray-400 font-black uppercase text-[10px] tracking-[0.2em]">Syncing Dashboard...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-red-50 rounded-[3rem] border border-red-100">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <p className="text-red-900 font-black italic">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 text-xs font-black uppercase tracking-widest text-red-600 hover:underline"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {jobs.length > 0 ? jobs.map((job) => (
            <div 
              key={job._id} 
              className="group bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-6">
                <div className={`p-5 rounded-[1.5rem] transition-colors ${
                  job.status === "OPEN" 
                  ? "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white" 
                  : "bg-gray-50 text-gray-400"
                }`}>
                  <Briefcase size={28} />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-xl tracking-tight leading-none mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-5">
                    <p className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-1.5">
                      <Users size={14} className="text-indigo-400" /> 
                      {job.applications?.length || 0} Applicants
                    </p>
                    <p className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                      {job.currency || 'KES'} {job.budget?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border ${
                  job.status === "OPEN" 
                  ? "bg-green-50 text-green-700 border-green-100" 
                  : "bg-gray-50 text-gray-500 border-gray-100"
                }`}>
                  {job.status}
                </span>
                <Link 
                  to={`/client/manage-work/${job._id}`} 
                  className="bg-gray-50 text-gray-900 group-hover:bg-gray-900 group-hover:text-white p-4 rounded-2xl transition-all"
                >
                  <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          )) : (
            <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase size={32} className="text-gray-200" />
              </div>
              <p className="text-gray-500 font-black italic text-lg">No projects found.</p>
              <p className="text-gray-400 text-sm mb-8">Ready to start your next big collaboration?</p>
              <Link 
                to="/client/post-job" 
                className="text-indigo-600 font-black uppercase text-xs tracking-widest hover:text-gray-900 transition-colors border-b-2 border-indigo-100 hover:border-gray-900 pb-1"
              >
                Post your first job →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}