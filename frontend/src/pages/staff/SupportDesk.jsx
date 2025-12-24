import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import BackButton from "../../components/BackButton"; // ✅ Added Import
import { MessageCircle, User, ShieldAlert, Send, CheckCircle } from "lucide-react";

export default function SupportDesk() {
  const [activeTicket, setActiveTicket] = useState(null);
  const [tickets] = useState([
    { id: "TK-101", user: "John Akot", issue: "Payment Failed (M-Gurush)", status: "URGENT" },
    { id: "TK-102", user: "Mary Nyok", issue: "ID Verification Help", status: "OPEN" }
  ]);

  return (
    <DashboardLayout role="STAFF">
      <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex flex-col gap-4">
        
        {/* ✅ BackButton added at the top */}
        <div className="flex items-center justify-between">
          <BackButton text="Back to Dashboard" to="/staff/dashboard" />
          <div className="bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-100">
             <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Support Live Feed</p>
          </div>
        </div>

        <div className="flex flex-1 gap-6 overflow-hidden">
          {/* Ticket List */}
          <div className="w-1/3 bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden flex flex-col shadow-sm">
            <div className="p-6 border-b border-gray-50 font-black italic text-gray-900 flex justify-between items-center">
               <span>Active Tickets</span>
               <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-1 rounded-lg font-black">{tickets.length}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {tickets.map(t => (
                <button 
                  key={t.id} 
                  onClick={() => setActiveTicket(t)}
                  className={`w-full p-5 rounded-3xl text-left transition-all ${activeTicket?.id === t.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-gray-50 hover:bg-gray-100 border border-transparent'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-70">{t.id}</span>
                    {t.status === 'URGENT' && <span className="bg-red-500 text-white text-[8px] px-2 py-0.5 rounded-full font-black">URGENT</span>}
                  </div>
                  <p className="font-black text-sm">{t.user}</p>
                  <p className={`text-xs mt-1 truncate ${activeTicket?.id === t.id ? 'text-indigo-100' : 'text-gray-400'}`}>{t.issue}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 flex flex-col overflow-hidden shadow-sm">
            {activeTicket ? (
              <>
                <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100">
                      {activeTicket.user[0]}
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 text-sm tracking-tight">{activeTicket.user}</h3>
                      <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Active Session</p>
                    </div>
                  </div>
                  <button className="bg-emerald-100 text-emerald-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-600 hover:text-white transition-all active:scale-95">
                    <CheckCircle size={14} /> Resolve Ticket
                  </button>
                </div>
                
                <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                  <div className="bg-gray-100 p-4 rounded-3xl rounded-tl-none max-w-[80%] text-sm font-bold text-gray-700 shadow-sm border border-gray-200">
                    Hello, I tried to withdraw via M-Gurush but it says 'Provider Timeout'. Help!
                  </div>
                  <div className="bg-indigo-600 text-white p-4 rounded-3xl rounded-tr-none max-w-[80%] ml-auto text-sm font-bold shadow-xl shadow-indigo-100">
                    I'm checking the logs now, {activeTicket.user.split(' ')[0]}. One moment while I verify the M-Gurush gateway status.
                  </div>
                </div>

                <div className="p-6 border-t border-gray-50">
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      placeholder="Type your response..." 
                      className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-indigo-500/10 font-bold transition-all placeholder:text-gray-300" 
                    />
                    <button className="bg-gray-900 text-white p-4 rounded-2xl hover:bg-indigo-600 transition-all active:scale-95 shadow-lg">
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
                <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-4">
                  <MessageCircle size={40} className="opacity-20" />
                </div>
                <p className="font-black italic uppercase text-xs tracking-widest">Select a ticket to start support</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}