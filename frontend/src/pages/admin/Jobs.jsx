import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";
import { 
  Briefcase, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Clock, 
  ShieldCheck,
  AlertCircle
} from "lucide-react";

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get('/api/v1/admin/jobs');
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      // Mock data for UI development
      setJobs([
        { _id: "1", title: "React Developer for E-commerce", budget: 25000, status: "Pending", clientName: "Tech Solutions", description: "Need a student to build a frontend..." },
        { _id: "2", title: "UI Designer for Mobile App", budget: 15000, status: "Approved", clientName: "Sarah Lado", description: "Looking for Figma designs..." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (jobId, newStatus) => {
    try {
      await axios.patch(`/api/v1/admin/jobs/${jobId}`, { status: newStatus });
      alert(`Job ${newStatus.toLowerCase()} successfully.`);
      fetchJobs();
      setSelectedJob(null);
    } catch (err) {
      alert("Failed to update job status.");
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="max-w-7xl mx-auto pb-20">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-gray-900">Job Moderation</h1>
          <p className="text-gray-500">Review and approve project listings to ensure platform quality.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job List */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              [1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-100 rounded-3xl animate-pulse" />)
            ) : (
              jobs.map(job => (
                <div
                  key={job._id}
                  onClick={() => setSelectedJob(job)}
                  className={`bg-white p-6 rounded-3xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    selectedJob?._id === job._id ? "border-indigo-600 ring-4 ring-indigo-50" : "border-gray-100 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${job.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{job.title}</h3>
                      <p className="text-xs text-gray-500">Posted by {job.clientName} • KES {job.budget?.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      job.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                    }`}>
                      {job.status}
                    </span>
                    <Eye size={18} className="text-gray-300" />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Review Sidebar */}
          <div className="w-full">
            {selectedJob ? (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sticky top-6">
                <div className="flex items-center gap-2 text-indigo-600 mb-4">
                  <ShieldCheck size={28} />
                  <h2 className="text-xl font-black">Verify Listing</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Description</h4>
                    <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-2xl">
                      {selectedJob.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center py-4 border-t border-b border-gray-50">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase">Client Budget</p>
                      <p className="text-xl font-black text-indigo-600">KES {selectedJob.budget?.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase">Status</p>
                      <p className="text-sm font-bold text-amber-600 flex items-center gap-1 justify-end">
                        <Clock size={14} /> {selectedJob.status}
                      </p>
                    </div>
                  </div>

                  {selectedJob.status === "Pending" ? (
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => handleStatusUpdate(selectedJob._id, "REJECTED")}
                        className="flex items-center justify-center gap-2 bg-gray-50 text-red-600 py-3 rounded-2xl font-bold hover:bg-red-50 transition"
                      >
                        <XCircle size={18} /> Reject
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(selectedJob._id, "Approved")}
                        className="flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
                      >
                        <CheckCircle size={18} /> Approve
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 bg-emerald-50 rounded-2xl flex items-center gap-3 text-emerald-700">
                      <CheckCircle size={20} />
                      <span className="text-xs font-bold">This job is live on the marketplace.</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 h-96 flex flex-col items-center justify-center text-center p-10">
                <AlertCircle size={48} className="text-gray-200 mb-4" />
                <p className="text-gray-500 font-medium text-sm">Select a job listing to view details and moderate.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}