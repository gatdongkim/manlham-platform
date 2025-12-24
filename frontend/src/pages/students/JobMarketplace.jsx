import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/http';
import Card from "../../components/Card";
import BackButton from "../../components/BackButton"; // ✅ Added Import
import { Search, Filter, Loader2, AlertCircle, DollarSign, Clock, Briefcase } from 'lucide-react';

export default function JobMarketplace() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await api.get('/jobs'); 
        const jobList = data?.data || (Array.isArray(data) ? data : []);
        setJobs(jobList);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    (job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.category?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 min-h-[60vh]">
        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
        </div>
        <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px]">Syncing Market Data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 p-4">
      
      {/* ✅ Added BackButton at the top */}
      <div className="pt-2">
        <BackButton text="Return to Dashboard" to="/students/dashboard" />
      </div>

      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 italic tracking-tight">
            Marketplace<span className="text-indigo-600">.</span>
          </h2>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">
            Explore verified opportunities in Juba
          </p>
        </div>
        <div className="bg-white px-5 py-2.5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
            {filteredJobs.length} Opportunities Live
          </span>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search projects (e.g. 'Logo Design')..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-[2rem] focus:ring-8 focus:ring-indigo-600/5 focus:border-indigo-100 outline-none font-bold text-sm transition-all shadow-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-3 px-8 py-5 bg-white border border-gray-100 rounded-[2rem] font-black text-[10px] uppercase tracking-widest text-gray-600 hover:bg-gray-50 hover:border-gray-200 transition-all shadow-sm active:scale-95">
          <Filter size={18} /> Filters
        </button>
      </div>

      {/* 3. Job Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.map((job) => (
            <div key={job._id} className="bg-white border border-gray-100 p-8 rounded-[3rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/50 rounded-bl-[4rem] -mr-10 -mt-10 group-hover:bg-indigo-600/5 transition-colors" />

              <div className="relative">
                <div className="w-14 h-14 bg-gray-50 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                  <Briefcase size={28} />
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-black text-gray-900 leading-tight mb-2 italic">
                    {job.title}
                  </h3>
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                    {job.category || "General Gig"}
                  </p>
                </div>
                
                <p className="text-gray-500 text-xs line-clamp-3 font-medium leading-relaxed mb-8">
                  {job.description || "No description provided for this project."}
                </p>

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-2 bg-emerald-50 px-3 py-2 rounded-xl">
                    <DollarSign size={14} className="text-emerald-600" />
                    <span className="text-[11px] font-black text-emerald-700 italic">SSP {job.budget?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl">
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{job.duration || "Short Term"}</span>
                  </div>
                </div>

                <Link 
                  to={`/jobs/${job._id}`}
                  className="block text-center w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-[11px] hover:bg-indigo-600 transition-all uppercase tracking-[0.2em] shadow-lg shadow-gray-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-[3.5rem] border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
             <AlertCircle className="text-gray-300" size={32} />
          </div>
          <h3 className="text-xl font-black text-gray-900 italic mb-2">No matches found</h3>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}