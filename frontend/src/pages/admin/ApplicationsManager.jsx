import React, { useState } from "react";
import { 
  CheckCircle, 
  XCircle, 
  ExternalLink, 
  Search, 
  Filter, 
  UserCheck, 
  FileText,
  Clock
} from "lucide-react";
import BackButton from "../../components/BackButton";

export default function ApplicationsManager() {
  const [filter, setFilter] = useState("ALL");
  
  // Mock data for the UI - Replace with API call to /api/v1/admin/applications
  const applications = [
    { 
      id: "APP-001", 
      name: "Deng Wal", 
      role: "Graphics Designer", 
      status: "PENDING", 
      date: "2025-12-22",
      institution: "University of Juba" 
    },
    { 
      id: "APP-002", 
      name: "Mary Nyok", 
      role: "Fullstack Dev", 
      status: "APPROVED", 
      date: "2025-12-21",
      institution: "Starford University" 
    },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-20 space-y-8">
      
      {/* Header Section */}
      <div className="space-y-4">
        <BackButton text="Back to Control Panel" to="/admin/dashboard" />
        <header className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 italic tracking-tighter">
              Applications<span className="text-indigo-600">.</span>
            </h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Review & Verify Student Professional Accounts</p>
          </div>
          
          <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
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
        </header>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or ID..."
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
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black italic border border-indigo-100">
                        {app.name.charAt(0)}
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
                      <span className="text-xs font-bold">{app.date}</span>
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
                      <button className="p-3 bg-white border border-gray-100 text-emerald-600 rounded-xl hover:bg-emerald-50 transition-colors shadow-sm">
                        <CheckCircle size={18} />
                      </button>
                      <button className="p-3 bg-white border border-gray-100 text-red-600 rounded-xl hover:bg-red-50 transition-colors shadow-sm">
                        <XCircle size={18} />
                      </button>
                      <button className="p-3 bg-gray-900 text-white rounded-xl hover:bg-indigo-600 transition-colors shadow-lg">
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
            <p className="text-3xl font-black text-indigo-600 mt-1">24</p>
          </div>
        </div>
      </div>
    </div>
  );
}