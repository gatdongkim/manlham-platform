import React, { useState, useEffect } from 'react';
import api from '../../api/http'; 
import DashboardLayout from "../../components/DashboardLayout";
import JobCard from "../../components/JobCard"; 
import { Briefcase, Search, Filter, Loader2, Heart } from 'lucide-react';

// ✅ Essential Components only
import BackButton from "../../components/BackButton";
import SocialLinks from "../../components/SocialLinks";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await api.get('/jobs');
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="student">
      <div className="max-w-6xl mx-auto">
        
        {/* ✅ 1. Back Button: Now sits cleanly inside DashboardLayout's padding */}
        <div className="mb-8">
            <BackButton text="Back to Dashboard" />
        </div>

        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight italic">
              Marketplace<span className="text-indigo-600">.</span>
            </h1>
            <p className="text-gray-500 font-semibold mt-1">Direct access to secure projects.</p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 outline-none transition shadow-sm font-medium"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-4 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-indigo-600 transition shadow-sm">
                <Filter size={20} />
            </button>
          </div>
        </header>

        {/* Main Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
            <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
            <p className="text-gray-400 font-bold tracking-widest uppercase text-[10px]">Updating Marketplace...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredJobs.map(job => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}

        {/* Footer inside the Dashboard Layout area */}
        <footer className="mt-32 pt-12 border-t border-gray-100 pb-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-black text-gray-900 tracking-tighter italic">
                Manlham Tech Support<span className="text-indigo-600">.</span>
              </h2>
              <SocialLinks variant="default" />
            </div>
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-2">
              © 2025 Safe Escrow <Heart size={10} className="text-red-400 fill-current" /> Juba
            </p>
          </div>
        </footer>
      </div>
    </DashboardLayout>
  );
};

export default Jobs;