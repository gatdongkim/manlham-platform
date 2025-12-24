import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { 
  Terminal, 
  Search, 
  Trash2, 
  Filter, 
  Clock, 
  ShieldCheck, 
  AlertCircle,
  Database
} from "lucide-react";

export default function AdminLogs() {
  const [filter, setFilter] = useState("ALL");

  // Mock data representing a real audit trail
  const logs = [
    { id: 1, type: "INFO", user: "Admin", action: "Job #782 Approved", timestamp: "2025-12-17 10:22:04", ip: "192.168.1.1" },
    { id: 2, type: "PAYMENT", user: "System", action: "M-Pesa STK Push Success: KES 15,000", timestamp: "2025-12-17 10:45:12", ip: "Daraja-Gate" },
    { id: 3, type: "ERROR", user: "Client_88", action: "Failed Login Attempt", timestamp: "2025-12-17 11:02:33", ip: "41.212.44.10" },
    { id: 4, type: "DISPUTE", user: "Admin", action: "Dispute #12 Resolved: Refund Client", timestamp: "2025-12-17 11:15:00", ip: "192.168.1.1" },
  ];

  const getLogColor = (type) => {
    switch (type) {
      case "ERROR": return "text-red-400";
      case "PAYMENT": return "text-emerald-400";
      case "DISPUTE": return "text-amber-400";
      default: return "text-blue-400";
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="max-w-6xl mx-auto pb-20">
        <header className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              Audit Trails <Terminal className="text-indigo-600" />
            </h1>
            <p className="text-gray-500">Monitor system-wide events and administrative actions.</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition">
              <Filter size={16} /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-bold hover:bg-red-100 transition">
              <Trash2 size={16} /> Clear History
            </button>
          </div>
        </header>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Events</p>
            <p className="text-xl font-bold text-gray-900">4,281</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-red-400">Critical Errors</p>
            <p className="text-xl font-bold text-gray-900">12</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-emerald-500">M-Pesa Pushes</p>
            <p className="text-xl font-bold text-gray-900">142</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-indigo-500">Admin Actions</p>
            <p className="text-xl font-bold text-gray-900">88</p>
          </div>
        </div>

        {/* Terminal View */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
          <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>
            <div className="flex items-center gap-2 text-slate-400 font-mono text-xs">
              <Database size={14} /> skilllink_audit_main.log
            </div>
          </div>

          <div className="p-6 font-mono text-sm h-[500px] overflow-y-auto space-y-3 custom-scrollbar">
            {logs.map((log) => (
              <div key={log.id} className="group flex flex-col md:flex-row gap-2 md:gap-4 p-2 rounded hover:bg-slate-800/50 transition">
                <span className="text-slate-500 shrink-0 select-none">[{log.timestamp}]</span>
                <span className={`font-bold shrink-0 ${getLogColor(log.type)}`}>
                  {log.type.padEnd(8)}
                </span>
                <span className="text-indigo-300 shrink-0 font-bold">{log.user}:</span>
                <span className="text-slate-300 flex-1">{log.action}</span>
                <span className="text-slate-600 text-xs hidden md:block">IP: {log.ip}</span>
              </div>
            ))}
            <div className="pt-4 flex items-center gap-2 text-emerald-400 animate-pulse">
              <span className="text-xl font-bold">{'>'}</span>
              <span className="text-xs">Listening for new events...</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}