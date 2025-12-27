import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  CheckCircle, 
  XCircle, 
  ExternalLink, 
  Search, 
  Filter, 
  UserCheck, 
  FileText,
  Clock,
  Loader2,
  Zap,
  Download
} from "lucide-react";
import BackButton from "../../components/BackButton";

export default function ApplicationsManager() {
  const [filter, setFilter] = useState("ALL");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Fetch Live Data from your Render Backend
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get("https://manlham-tech.onrender.com/api/v1/admin/applications", {
          withCredentials: true
        });
        setApplications(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // 2. Individual Approval Logic
  const handleApprove = async (id) => {
    try {
      await axios.patch(`https://manlham-tech.onrender.com/api/v1/admin/applications/${id}`, 
        { status: "APPROVED" }, 
        { withCredentials: true }
      );
      setApplications(prev => prev.map(app => app._id === id ? { ...app, status: "APPROVED" } : app));
    } catch (err) {
      alert("Verification failed. Please check server logs.");
    }
  };

  // 3. Bulk Approval Logic (To clear the 24 pending backlog)
  const handleBulkApprove = async () => {
    if (!window.confirm("Are you sure you want to approve all pending applications?")) return;
    try {
      await axios.post("https://manlham-tech.onrender.com/api/v1/admin/applications/bulk-approve", {}, { withCredentials: true });
      setApplications(prev => prev.map(app => ({ ...app, status: "APPROVED" })));
    } catch (err) {
      alert("Bulk approval failed.");
    }
  };

  // 4. CSV Export Logic for Audits
  const exportToCSV = () => {
    const headers = "ID,Name,Role,Institution,Status,Date\n";
    const rows = applications.map(app => 
      `${app._id},${app.name},${app.role},${app.institution},${app.status},${new Date(app.createdAt).toLocaleDateString()}`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Manlham_Applications_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Filter and Search Logic
  const filteredApps = applications.filter(app => {
    const matchesFilter = filter === "ALL" || app.status === filter;
    const matchesSearch = app.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.role?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
      <p className="font-black italic text-gray-400 animate-pulse">Fetching Live Applications...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto pb-20 space-y-8">
      
      {/* Header Section */}
      <div className="space-y-4">
        <BackButton text="Back to Control Panel" to="/admin/dashboard" />
        <header className="flex flex-col xl:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 italic tracking-tighter">
              Applications<span className="text-indigo-600">.</span>
            </h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">
              Review & Verify Student Professional Accounts
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 text-gray-600 rounded-2xl text-[10px] font-black tracking-widest hover:bg-gray-50 transition-all shadow-sm"
            >
              <Download size={14} /> EXPORT CSV
            </button>

            <button 
              onClick={handleBulkApprove}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              <Zap size={14} /> BULK APPROVE
            </button>

            <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm ml-2">
              {["ALL", "PENDING", "APPROVED"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                    filter === tab ? "bg-gray-900 text-white" : "text-gray-400 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </header>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none font-bold text-sm"
            />
          </div>
          <button className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 font-black text-[10px] uppercase tracking-widest px-4">
            <Filter size={16} /> Advanced Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Applicant</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Institution</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Date Applied</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredApps.length > 0 ? filteredApps.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black italic border border-indigo-100">
                        {app.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="font-black text-gray-900 italic">{app.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{app.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-xs font-bold text-gray-600">{app.institution}</td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock size={14} />
                      <span className="text-xs font-bold">{new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest border ${
                      app.status === "APPROVED" 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                        : "bg-amber-50 text-amber-600 border-amber-100"
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {app.status === "PENDING" && (
                        <button 
                          onClick={() => handleApprove(app._id)}
                          className="p-3 bg-white border border-gray-100 text-emerald-600 rounded-xl hover:bg-emerald-50 transition-colors shadow-sm"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                      <button className="p-3 bg-gray-900 text-white rounded-xl hover:bg-indigo-600 transition-colors shadow-lg">
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="p-20 text-center font-black italic text-gray-300 tracking-widest uppercase">
                    No matching applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sidebar Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-indigo-900 p-8 rounded-[3rem] text-white flex items-center gap-6">
          <UserCheck size={40} className="text-indigo-400" />
          <div>
            <h4 className="text-lg font-black italic">Quality Control</h4>
            <p className="text-xs font-bold opacity-70 leading-relaxed uppercase tracking-wider mt-1">
              Verify student IDs and graduation certificates before approving.
            </p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[3rem] border border-gray-100 flex items-center gap-6">
          <FileText size={40} className="text-gray-200" />
          <div>
            <h4 className="text-lg font-black italic text-gray-900">Total Pending</h4>
            <p className="text-3xl font-black text-indigo-600 mt-1">
              {applications.filter(a => a.status === "PENDING").length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}