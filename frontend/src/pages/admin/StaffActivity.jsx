import React, { useState } from "react";
// ❌ Removed DashboardLayout import
import BackButton from "../../components/BackButton";
import { 
  History, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight
} from "lucide-react";

export default function StaffActivity() {
  const [logs] = useState([
    {
      id: "LOG-9921",
      staffName: "Kelvin Kibet",
      action: "Resolved Ticket",
      target: "#TK-442 (Payment Issue)",
      time: "14 mins ago",
      type: "SUCCESS"
    },
    {
      id: "LOG-9920",
      staffName: "Sarah Nyibol",
      action: "Approved Verification",
      target: "Student: John Doe",
      time: "1 hour ago",
      type: "NEUTRAL"
    },
    {
      id: "LOG-9919",
      staffName: "Kelvin Kibet",
      action: "Flagged Account",
      target: "User: @spammer123",
      time: "3 hours ago",
      type: "WARNING"
    }
  ]);

  return (
    // ✅ Use a standard div container
    <div className="max-w-6xl mx-auto pb-20 space-y-8">
      
      {/* Header */}
      <div className="space-y-4">
        <BackButton text="Back to Control Panel" to="/admin/dashboard" />
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 italic tracking-tighter">
              Team Activity<span className="text-indigo-600">.</span>
            </h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">
              Monitoring Staff performance & actions
            </p>
          </div>
          <div className="hidden md:flex gap-2">
             <div className="bg-white border border-gray-100 p-4 rounded-3xl shadow-sm text-center min-w-[120px]">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Total Actions</p>
                <p className="text-xl font-black text-gray-900 italic">1,284</p>
             </div>
          </div>
        </header>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <h2 className="font-black text-gray-900 italic flex items-center gap-2">
            <History size={20} className="text-indigo-600" /> Recent Operations
          </h2>
          <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">
            Export Ledger
          </button>
        </div>

        <div className="divide-y divide-gray-50">
          {logs.map((log) => (
            <div key={log.id} className="p-8 hover:bg-gray-50 transition-colors group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border
                    ${log.type === 'SUCCESS' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      log.type === 'WARNING' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                      'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                    {log.type === 'SUCCESS' ? <CheckCircle2 size={24}/> : <Clock size={24}/>}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-gray-900 italic">{log.staffName}</span>
                      <span className="text-[9px] font-black text-gray-400 uppercase bg-gray-100 px-2 py-0.5 rounded tracking-tighter">
                        {log.action}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-bold mt-1 uppercase tracking-tight">{log.target}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between md:justify-end gap-6">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{log.time}</p>
                    <p className="text-[9px] font-bold text-indigo-400 italic">ID: {log.id}</p>
                  </div>
                  <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all shadow-sm">
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}