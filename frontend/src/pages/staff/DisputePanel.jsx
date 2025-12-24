import React, { useState } from "react";
// ❌ Removed DashboardLayout import
import BackButton from "../../components/BackButton";
import { 
  Gavel, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  FileText, 
  MessageSquare,
  Scale
} from "lucide-react";

export default function DisputePanel() {
  const [disputes] = useState([
    {
      id: "DIS-772",
      jobTitle: "E-Commerce Logo Design",
      client: "Juba Retail Group",
      student: "John Akot",
      amount: "12,000",
      reason: "Deliverable doesn't match description",
      status: "OPEN",
      date: "20 Dec 2025"
    },
    {
      id: "DIS-769",
      jobTitle: "Python Script Bugfix",
      client: "TechSolutions Nairobi",
      student: "Sarah Nyibol",
      amount: "4,500",
      reason: "Client stopped responding after delivery",
      status: "URGENT",
      date: "18 Dec 2025"
    }
  ]);

  const [activeDispute, setActiveDispute] = useState(null);

  // ✅ Returning content only. App.jsx handles the parent DashboardLayout.
  return (
    <div className="max-w-7xl mx-auto pb-20 space-y-8">
      
      {/* Header */}
      <div className="space-y-4">
        <BackButton text="Back to Staff Portal" to="/staff/dashboard" />
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 italic tracking-tighter">
              Dispute Resolution<span className="text-indigo-600">.</span>
            </h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">
              Arbitrating Regional Marketplace Contracts
            </p>
          </div>
          <div className="bg-red-50 text-red-600 px-6 py-3 rounded-2xl border border-red-100 flex items-center gap-3">
            <Scale size={20} />
            <span className="text-xs font-black uppercase tracking-widest">{disputes.length} Cases Pending</span>
          </div>
        </header>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* List of Disputes */}
        <div className="lg:col-span-4 space-y-4">
          {disputes.map((dispute) => (
            <button 
              key={dispute.id}
              onClick={() => setActiveDispute(dispute)}
              className={`w-full text-left p-6 rounded-[2.5rem] border transition-all ${
                activeDispute?.id === dispute.id 
                ? 'bg-gray-900 border-gray-900 text-white shadow-2xl shadow-gray-200' 
                : 'bg-white border-gray-100 hover:border-indigo-200'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${
                  dispute.status === 'URGENT' ? 'bg-red-500 text-white' : 'bg-indigo-500 text-white'
                }`}>
                  {dispute.status}
                </span>
                <span className="text-[10px] font-bold opacity-50 tracking-widest">{dispute.id}</span>
              </div>
              <h3 className="font-black italic text-sm mb-1">{dispute.jobTitle}</h3>
              <p className={`text-[10px] font-bold uppercase mb-4 ${activeDispute?.id === dispute.id ? 'text-indigo-400' : 'text-gray-400'}`}>
                Amount: SSP {dispute.amount}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black opacity-70">
                <ShieldAlert size={12} /> View Conflict Details
              </div>
            </button>
          ))}
        </div>

        {/* Arbitrator Workspace */}
        <div className="lg:col-span-8">
          {activeDispute ? (
            <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
              {/* Internal Case Header */}
              <div className="p-10 border-b border-gray-50 bg-gray-50/30">
                <h2 className="text-2xl font-black text-gray-900 italic mb-2">{activeDispute.jobTitle}</h2>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-100">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Client</span>
                    <span className="text-xs font-bold">{activeDispute.client}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-100">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Student</span>
                    <span className="text-xs font-bold">{activeDispute.student}</span>
                  </div>
                </div>
              </div>

              {/* Conflict Body */}
              <div className="p-10 flex-1 space-y-10">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-2">
                    <AlertTriangle size={14} /> Filed Complaint
                  </h4>
                  <div className="bg-red-50/50 p-8 rounded-[2rem] border border-red-100">
                    <p className="text-gray-700 font-medium italic">"{activeDispute.reason}"</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <button className="flex items-center justify-center gap-3 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:border-indigo-600 transition-all group">
                     <FileText className="text-gray-400 group-hover:text-indigo-600" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Review Contract</span>
                  </button>
                  <button className="flex items-center justify-center gap-3 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:border-indigo-600 transition-all group">
                     <MessageSquare className="text-gray-400 group-hover:text-indigo-600" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">View Chat History</span>
                  </button>
                </div>
              </div>

              {/* Arbitrator Actions */}
              <div className="p-10 bg-gray-900 grid grid-cols-2 gap-4">
                 <button className="bg-emerald-600 text-white py-6 rounded-3xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-500 transition-all active:scale-95 shadow-xl shadow-emerald-900/20">
                    <CheckCircle2 size={18} /> Release to Student
                 </button>
                 <button className="bg-white/10 text-white border border-white/10 py-6 rounded-3xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-red-600 hover:border-red-600 transition-all active:scale-95">
                    <XCircle size={18} /> Refund Client
                 </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-[3.5rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-20 text-center min-h-[600px]">
              <Gavel size={64} className="text-gray-200 mb-6" />
              <h2 className="text-xl font-black text-gray-400 italic">Select a case to begin arbitration</h2>
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-2">Staff permission required for fund release</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}